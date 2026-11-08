import { fileURLToPath, URL } from 'node:url'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

const GITHUB_USER = 'PaoloFernetti'

/**
 * Fetches the user's repositories at build time and injects them as a
 * virtual module. This removes the client-side dependency on api.github.com
 * (which is unreachable from some networks).
 *
 * - If REPOS_TOKEN (a PAT) is provided, private repos are included too.
 *   NOTE: since the site is public, private repo names/descriptions
 *   become publicly visible once embedded in the bundle.
 * - If the API is unreachable at build time, falls back to the last
 *   committed snapshot in src/data/repos.json.
 */
function githubRepos(): Plugin {
  const virtualId = 'virtual:user-repos'
  const resolvedId = '\0' + virtualId
  let cached: string | null = null

  async function fetchRepos(): Promise<unknown[]> {
    const token = process.env.REPOS_TOKEN
    const url = token
      ? `https://api.github.com/user/repos?per_page=100&sort=updated&visibility=all&affiliation=owner`
      : `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)

    try {
      const res = await fetch(url, {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        signal: controller.signal,
      })
      if (!res.ok) {
        throw new Error(`GitHub API responded with status ${res.status}`)
      }
      return (await res.json()) as unknown[]
    } finally {
      clearTimeout(timeout)
    }
  }

  function snapshot(): unknown[] {
    try {
      const file = fileURLToPath(new URL('./src/data/repos.json', import.meta.url))
      return JSON.parse(readFileSync(file, 'utf-8')) as unknown[]
    } catch {
      return []
    }
  }

  function keepOnly(repos: unknown[]): unknown[] {
    // Normalize to the fields the UI consumes (keeps the bundle small)
    return repos
      .filter((r): r is Record<string, unknown> => r !== null && typeof r === 'object')
      .map((r) => ({
        id: r['id'],
        name: r['name'],
        html_url: r['html_url'],
        description: r['description'],
        language: r['language'],
        stargazers_count: r['stargazers_count'],
        forks_count: r['forks_count'],
        updated_at: r['updated_at'],
        fork: r['fork'],
        archived: r['archived'],
        private: r['private'],
      }))
  }

  return {
    name: 'github-repos',
    enforce: 'pre',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    async load(id) {
      if (id !== resolvedId) return
      if (cached) return cached

      let repos: unknown[]
      try {
        repos = await fetchRepos()
        if (repos.length === 0) throw new Error('empty response')
      } catch {
        repos = snapshot()
      }

      cached = `export default ${JSON.stringify(keepOnly(repos))}\n`
      return cached
    },
  }
}

/**
 * GitHub Pages does not support SPA rewrite rules, so we copy the built
 * index.html to 404.html. This lets vue-router (history mode) handle
 * deep links like /blog/<slug> on page refresh.
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    closeBundle() {
      const distDir = fileURLToPath(new URL('./dist', import.meta.url))
      const indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8')
      writeFileSync(resolve(distDir, '404.html'), indexHtml)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), githubRepos(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // User GitHub Pages site (paolofernetti.github.io) is served from root
  base: '/',
})
