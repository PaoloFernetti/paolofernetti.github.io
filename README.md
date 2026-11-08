# paolofernetti.github.io

Personal portfolio website of Paolo Fernetti — neon-styled SPA built with **Vue 3 + TypeScript + Vite**, deployed to GitHub Pages.

🔗 **Live:** [https://paolofernetti.github.io](https://paolofernetti.github.io)

## Features

- ⚡ Vue 3 + TypeScript + Vite (zero UI-library dependencies)
- 🌌 Interactive particle engine on canvas (pointer-reactive, ~120 lines)
- ✨ Neon design system on CSS custom properties (glow, glassmorphism, gradients)
- 🧭 Sections: Hero, About, Experience timeline, Skills, My repositories, Gaming (Steam), Contact
- 📊 The "Languages" skill card is computed at **build time** from the actual code distribution across repositories (GitHub `languages` API, fallback: repo counts per language)
- 🎮 "Gaming" section is populated at **build time** from Steam: official Web API when the `STEAM_API_KEY` secret is set (full library, profile level), otherwise the public community XML feed — with a committed snapshot fallback in `src/data/steam.json`
- ⏱ Data refreshes on every push to `master` and via a **daily scheduled build** (06:00 UTC). Scheduled runs also push an empty keep-alive commit (marked `[skip ci]`) so GitHub never disables the schedule after 60 days of inactivity
- 🗂 "My repositories" section is populated at **build time** from the GitHub REST API (no client-side API calls — works on any network). Includes search filter, language colors, stars, forks; private repos are included when the `REPOS_TOKEN` secret (a read-only PAT) is configured, with weekly scheduled rebuilds to keep data fresh
- 🎬 Scroll-reveal animations via `IntersectionObserver`
- 📱 Fully responsive, mobile burger menu
- 🚀 Auto-deploy to GitHub Pages via GitHub Actions

## Project structure

```
├── .github/workflows/deploy.yml   # CI: build + deploy to Pages on push to main
├── public/favicon.svg
└── src/
    ├── main.ts                    # app bootstrap
    ├── router/index.ts            # vue-router (history mode)
    ├── assets/main.css            # neon design system (CSS variables)
    ├── composables/useReveal.ts   # scroll-reveal composable
    ├── data/                      # typed content: profile, experience, skills, repos
    ├── components/
    │   ├── ParticlesCanvas.vue    # interactive particle background
    │   ├── NavBar.vue             # glassmorphism navigation
    │   ├── SectionTitle.vue
    │   ├── AppFooter.vue
    │   └── sections/              # Hero, About, Experience, Skills, Repositories, Contact
    └── views/
        └── HomeView.vue
```

## Editing content

All content lives in typed modules under [`src/data/`](src/data):

| File | Purpose |
| --- | --- |
| `profile.ts` | Name, bio, email, social links |
| `experience.ts` | Career timeline |
| `skills.ts` | Skill groups and levels |
| `steam.json` | Snapshot fallback for the Gaming section (replaced by fresh Steam data at build time) |
| `repos.json` | Snapshot fallback for the repositories section (replaced by fresh API data at build time) |
| `skills.ts` | Static fallback for the Skills section (Languages card is dynamic, from repository language stats) |

The "My repositories" section is populated at build time by the [`githubRepos()` plugin](vite.config.ts). It fetches the user's repos from the GitHub REST API and embeds them into the bundle; if the API is unreachable, it falls back to the committed snapshot in [`src/data/repos.json`](src/data/repos.json).

- Change the account via the `GITHUB_USER` constant in [`vite.config.ts`](vite.config.ts).
- Forks are hidden and the list is sorted by stars (see [`RepositoriesSection.vue`](src/components/sections/RepositoriesSection.vue)).
- **Private repositories:** add a `REPOS_TOKEN` secret (a fine-grained PAT with read-only access to the repositories) in *Settings → Secrets and variables → Actions*. The build then fetches `visibility=all` via `/user/repos`. ⚠️ Since the site is public, private repo names/descriptions become publicly visible in the built bundle. Without the token only public repos are embedded.
- Data refreshes on every push to `master` and weekly (scheduled cron in the deploy workflow). To update the local snapshot manually: run the build on a machine with access to api.github.com, or commit `src/data/repos.json` from CI output.

## Development

```bash
npm install     # install dependencies
npm run dev     # start dev server
npm run build   # type-check + production build to dist/
npm run preview # preview production build locally
```

## Deployment

On every push to `main`, the [`deploy.yml`](.github/workflows/deploy.yml) workflow builds the project and publishes `dist/` to GitHub Pages. Ensure **Settings → Pages → Source** is set to **GitHub Actions**.
