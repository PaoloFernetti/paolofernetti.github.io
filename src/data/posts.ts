export interface PostSection {
  heading: string
  paragraphs: string[]
}

export interface Post {
  slug: string
  title: string
  date: string
  readTime: string
  excerpt: string
  tags: string[]
  sections: PostSection[]
}

export const posts: Post[] = [
  {
    slug: 'neon-portfolio-with-vue-3',
    title: 'Building a Neon Portfolio with Vue 3 and Zero UI Libraries',
    date: '2026-11-02',
    readTime: '6 min',
    excerpt:
      'How this portfolio is built: an interactive particle engine on canvas, glow design system on CSS variables, and scroll animations with IntersectionObserver — all without a single UI dependency.',
    tags: ['Vue 3', 'TypeScript', 'CSS'],
    sections: [
      {
        heading: 'Why no UI libraries?',
        paragraphs: [
          'Modern component libraries ship hundreds of kilobytes of styles and utilities you will never use. For a personal portfolio the goal is to be memorable and fast — so every pixel is hand-crafted with CSS variables, and the only runtime dependency besides Vue itself is vue-router.',
          'The whole design system is about 15 CSS custom properties: neon accents, glow shadows and dark surfaces. Components consume them through plain scoped styles, which keeps the CSS tree-shakeable and predictable.',
        ],
      },
      {
        heading: 'The particle engine',
        paragraphs: [
          'The hero background is a single canvas element driven by a requestAnimationFrame loop. Each particle has a position, velocity and color; on every frame they drift, bounce off edges and connect with lines when they get close enough.',
          'Interaction is the key detail: the pointer position is tracked, and particles within a radius get gently attracted to it. The whole engine is about 120 lines of TypeScript — compare that to importing a 40KB particles library.',
        ],
      },
      {
        heading: 'Scroll animations',
        paragraphs: [
          'Sections fade and slide in via a tiny composable built on IntersectionObserver. Elements start with opacity 0 and a translateY offset; when they enter the viewport a CSS class toggles a transition. No scroll listeners, no layout thrashing.',
        ],
      },
    ],
  },
  {
    slug: 'typescript-tips-2026',
    title: 'Five TypeScript Tips I Wish I Knew Earlier',
    date: '2026-10-14',
    readTime: '5 min',
    excerpt:
      'Satisfies operator, discriminated unions, const type parameters and other small features that make TypeScript code dramatically safer and cleaner.',
    tags: ['TypeScript', 'Best Practices'],
    sections: [
      {
        heading: '1. Use satisfies instead of as',
        paragraphs: [
          'The satisfies operator validates a value against a type without widening it. Unlike as, it keeps the inferred literal types, so you keep autocomplete for the actual object you wrote while still getting compile-time checks.',
        ],
      },
      {
        heading: '2. Discriminated unions over optional flags',
        paragraphs: [
          'Instead of a state object with optional loading, error and data fields, model it as a union with a literal kind field. Then switch on kind and TypeScript narrows everything automatically — impossible states become unrepresentable.',
        ],
      },
      {
        heading: '3. const type parameters',
        paragraphs: [
          'Generic functions can declare <const T> to infer tuple and literal types from call sites. It is perfect for functions that build routes, matrices or event name lists from string literals.',
        ],
      },
    ],
  },
  {
    slug: 'vite-deploy-github-pages',
    title: 'Deploying a Vite SPA to GitHub Pages with Actions',
    date: '2026-09-20',
    readTime: '4 min',
    excerpt:
      'A complete, minimal GitHub Actions workflow for building a Vite project and publishing it to GitHub Pages — including the gotchas around base paths and SPA routing.',
    tags: ['Vite', 'GitHub Pages', 'CI/CD'],
    sections: [
      {
        heading: 'The workflow',
        paragraphs: [
          'GitHub Pages supports building from Actions natively: a workflow with the pages:write permission can upload an artifact and deploy it. For a Vite app the pipeline is four steps — checkout, setup-node with npm cache, npm ci, npm run build — then upload-pages-artifact from ./dist.',
        ],
      },
      {
        heading: 'Base paths and routing',
        paragraphs: [
          'For a user site like paolofernetti.github.io the app is served from the root, so the Vite base option stays at "/". For project sites it must be "/<repo-name>/" — forgetting this is the most common reason a deployed SPA shows a blank page.',
          'Hash-based routing avoids 404s on refresh entirely; history routing requires a 404.html fallback that rewrites to index.html.',
        ],
      },
    ],
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
