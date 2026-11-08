/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'virtual:user-repos' {
  import type { Repo } from './data/repo'
  const repos: Repo[]
  export default repos
}

declare module 'virtual:lang-stats' {
  interface LangShare {
    language: string
    share: number
  }
  const shares: LangShare[]
  export default shares
}

declare module 'virtual:steam-data' {
  import type { SteamData } from './data/steam'
  const steam: SteamData
  export default steam
}
