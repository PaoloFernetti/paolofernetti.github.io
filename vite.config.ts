import { fileURLToPath, URL } from 'node:url'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

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
  plugins: [vue(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // User GitHub Pages site (paolofernetti.github.io) is served from root
  base: '/',
})
