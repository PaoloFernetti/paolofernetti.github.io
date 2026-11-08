# paolofernetti.github.io

Personal portfolio website of Paolo Fernetti — neon-styled SPA built with **Vue 3 + TypeScript + Vite**, deployed to GitHub Pages.

🔗 **Live:** [https://paolofernetti.github.io](https://paolofernetti.github.io)

## Features

- ⚡ Vue 3 + TypeScript + Vite (zero UI-library dependencies)
- 🌌 Interactive particle engine on canvas (pointer-reactive, ~120 lines)
- ✨ Neon design system on CSS custom properties (glow, glassmorphism, gradients)
- 🧭 Sections: Hero, About, Experience timeline, Skills, Projects, Blog, Contact
- 📝 Blog with per-post pages via `vue-router` (history mode + 404.html SPA fallback)
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
    ├── data/                      # typed content: profile, experience, skills, projects, posts
    ├── components/
    │   ├── ParticlesCanvas.vue    # interactive particle background
    │   ├── NavBar.vue             # glassmorphism navigation
    │   ├── SectionTitle.vue
    │   ├── AppFooter.vue
    │   └── sections/              # Hero, About, Experience, Skills, Projects, Blog, Contact
    └── views/
        ├── HomeView.vue
        └── PostView.vue           # blog article page (/blog/:slug)
```

## Editing content

All content lives in typed modules under [`src/data/`](src/data):

| File | Purpose |
| --- | --- |
| `profile.ts` | Name, bio, email, social links |
| `experience.ts` | Career timeline |
| `skills.ts` | Skill groups and levels |
| `projects.ts` | Portfolio projects |
| `posts.ts` | Blog articles (sections rendered on `/blog/:slug`) |

## Development

```bash
npm install     # install dependencies
npm run dev     # start dev server
npm run build   # type-check + production build to dist/
npm run preview # preview production build locally
```

## Deployment

On every push to `main`, the [`deploy.yml`](.github/workflows/deploy.yml) workflow builds the project and publishes `dist/` to GitHub Pages. Ensure **Settings → Pages → Source** is set to **GitHub Actions**.
