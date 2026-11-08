import { fileURLToPath, URL } from 'node:url'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

const GITHUB_USER = 'PaoloFernetti'
const STEAM_PROFILE = 'https://steamcommunity.com/id/sirfernetti'

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
 * Fetches public Steam community profile data (via the stable ?xml=1 feed
 * plus light HTML scraping for level / games count) at build time and
 * injects it as a virtual module. Falls back to the committed snapshot
 * in src/data/steam.json when steamcommunity.com is unreachable.
 */
function steamData(): Plugin {
  const virtualId = 'virtual:steam-data'
  const resolvedId = '\0' + virtualId
  let cached: string | null = null

  function cdata(xml: string, tag: string): string {
    const m = xml.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`))
    return m ? m[1] : ''
  }

  function plain(xml: string, tag: string): string {
    const m = xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))
    return m ? m[1].trim() : ''
  }

  async function fetchWithTimeout(url: string): Promise<Response> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)
    try {
      return await fetch(url, { signal: controller.signal })
    } finally {
      clearTimeout(timeout)
    }
  }

  /**
   * Full-fidelity path: official Steam Web API (requires STEAM_API_KEY).
   * Returns the complete owned-games library sorted by playtime.
   */
  async function fetchViaApi(key: string) {
    const steamId = '76561199025826519'
    const base = 'https://api.steampowered.com'

    const [playerRes, gamesRes, levelRes] = await Promise.all([
      fetchWithTimeout(
        `${base}/ISteamUser/GetPlayerSummaries/v2/?key=${key}&steamids=${steamId}`,
      ),
      fetchWithTimeout(
        `${base}/IPlayerService/GetOwnedGames/v1/?key=${key}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true`,
      ),
      fetchWithTimeout(`${base}/IPlayerService/GetSteamLevel/v1/?key=${key}&steamid=${steamId}`),
    ])
    if (!playerRes.ok || !gamesRes.ok) {
      throw new Error(`Steam Web API error: ${playerRes.status}/${gamesRes.status}`)
    }

    const player = (await playerRes.json()).response.players[0]
    const gamesJson = (await gamesRes.json()).response
    let level: number | null = null
    if (levelRes.ok) {
      level = (await levelRes.json()).response.player_level ?? null
    }

    const games = (gamesJson.games ?? [])
      .sort((a: { playtime_forever: number }, b: { playtime_forever: number }) => {
        return b.playtime_forever - a.playtime_forever
      })
      .slice(0, 8)
      .map((g: { appid: number; name: string; playtime_forever: number; playtime_2weeks?: number }) => ({
        name: g.name,
        url: `https://steamcommunity.com/app/${g.appid}`,
        logo: `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/capsule_184x69.jpg`,
        hoursOnRecord: String(Math.round(g.playtime_forever / 60)),
        hours2wk: g.playtime_2weeks ? String(Math.round((g.playtime_2weeks / 60) * 10) / 10) : '0',
      }))

    return {
      steamId,
      nickname: player.personaname,
      realName: player.realname ?? '',
      profileUrl: STEAM_PROFILE + '/',
      avatar: player.avatarfull,
      onlineState: player.personastate === 0 ? 'offline' : 'online',
      memberSince: player.timecreated
        ? new Date(player.timecreated * 1000).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : '',
      location: [player.loccountrycode, player.locstatecode].filter(Boolean).join(', '),
      level,
      gamesCount: gamesJson.game_count ?? null,
      hours2wk: String(
        Math.round(
          (gamesJson.games ?? []).reduce(
            (sum: number, g: { playtime_2weeks?: number }) => sum + (g.playtime_2weeks ?? 0),
            0,
          ) / 60,
        ),
      ),
      games,
    }
  }

  /** Fallback path without an API key: stable XML feed + light HTML scraping. */
  async function fetchViaCommunity() {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)

    try {
      const res = await fetch(`${STEAM_PROFILE}/?xml=1`, {
        signal: controller.signal,
      })
      if (!res.ok) throw new Error(`Steam XML responded with status ${res.status}`)
      const xml = await res.text()

      const games = [...xml.matchAll(/<mostPlayedGame>([\s\S]*?)<\/mostPlayedGame>/g)].map(
        (g) => {
          const body = g[1]
          return {
            name: cdata(body, 'gameName'),
            url: cdata(body, 'gameLink'),
            logo: cdata(body, 'gameLogo'),
            hoursOnRecord: cdata(body, 'hoursOnRecord'),
            hours2wk: cdata(body, 'hoursPlayed'),
          }
        },
      )

      // Light scraping of the HTML profile for level and games count.
      // Both fields degrade gracefully to null if the markup changes.
      let level: number | null = null
      let gamesCount: number | null = null
      try {
        const html = await fetch(`${STEAM_PROFILE}/`, {
          signal: controller.signal,
        }).then((r) => r.text())
        level =
          Number(html.match(/friendPlayerLevel[^>]*>\s*(\d+)/)?.[1]) || null
        gamesCount =
          Number(
            html.match(/games\/\?tab=all">\s*([\d,]+)\s*<\/a>/)?.[1]?.replace(/,/g, ''),
          ) || null
      } catch {
        /* keep nulls */
      }

      return {
        steamId: plain(xml, 'steamID64'),
        nickname: cdata(xml, 'steamID'),
        realName: cdata(xml, 'realname'),
        profileUrl: `${STEAM_PROFILE}/`,
        avatar: cdata(xml, 'avatarFull'),
        onlineState: cdata(xml, 'onlineState'),
        memberSince: cdata(xml, 'memberSince'),
        location: cdata(xml, 'location'),
        level,
        gamesCount,
        hours2wk: cdata(xml, 'hoursPlayed2Wk'),
        games,
      }
    } finally {
      clearTimeout(timeout)
    }
  }

  function snapshot() {
    try {
      const file = fileURLToPath(new URL('./src/data/steam.json', import.meta.url))
      return JSON.parse(readFileSync(file, 'utf-8'))
    } catch {
      return null
    }
  }

  return {
    name: 'steam-data',
    enforce: 'pre',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    async load(id) {
      if (id !== resolvedId) return
      if (cached) return cached

      const apiKey = process.env.STEAM_API_KEY
      let data
      try {
        data = apiKey
          ? await fetchViaApi(apiKey)
          : await fetchViaCommunity()
        if (!data.nickname || data.games.length === 0) throw new Error('empty steam data')
      } catch {
        data = snapshot()
      }

      cached = `export default ${JSON.stringify(data)}\n`
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
  plugins: [vue(), githubRepos(), steamData(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // User GitHub Pages site (paolofernetti.github.io) is served from root
  base: '/',
})
