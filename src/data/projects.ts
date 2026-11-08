export interface Project {
  title: string
  description: string
  tags: string[]
  repo?: string
  demo?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'NeonPort',
    description:
      'This very portfolio: a neon-styled SPA built with Vue 3, TypeScript and Vite, featuring an interactive particle engine on canvas with zero UI dependencies.',
    tags: ['Vue 3', 'TypeScript', 'Vite', 'Canvas API'],
    repo: 'https://github.com/paolofernetti/paolofernetti.github.io',
    demo: 'https://paolofernetti.github.io/',
    featured: true,
  },
  {
    title: 'StreamStats',
    description:
      'Real-time analytics dashboard processing 1M+ events per day. WebSocket-powered charts, anomaly alerts and exportable reports.',
    tags: ['Node.js', 'WebSocket', 'Vue 3', 'ClickHouse'],
    repo: 'https://github.com/paolofernetti/streamstats',
    featured: true,
  },
  {
    title: 'DevFlow CLI',
    description:
      'A developer productivity CLI that scaffolds projects, runs conventions checks and automates release notes generation from git history.',
    tags: ['Go', 'CLI', 'Developer Tools'],
    repo: 'https://github.com/paolofernetti/devflow-cli',
    featured: true,
  },
  {
    title: 'ParticleFX',
    description:
      'A lightweight WebGL particle effects library for the web — 4KB gzipped, framework-agnostic, with declarative presets and pointer interaction.',
    tags: ['WebGL', 'TypeScript', 'Library'],
    repo: 'https://github.com/paolofernetti/particlefx',
    demo: 'https://particlefx-demo.netlify.app',
  },
  {
    title: 'Questly',
    description:
      'A habit-tracking PWA with gamification: quests, streaks and achievements. Offline-first, installable, syncs across devices.',
    tags: ['Vue 3', 'PWA', 'IndexedDB'],
    repo: 'https://github.com/paolofernetti/questly',
  },
  {
    title: 'OpenAPI Kit',
    description:
      'Code generator that turns OpenAPI specs into fully typed clients and mock servers for TypeScript projects.',
    tags: ['TypeScript', 'OpenAPI', 'Codegen'],
    repo: 'https://github.com/paolofernetti/openapi-kit',
  },
]
