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
