<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Repo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
  archived: boolean
}

const GITHUB_USER = 'PaoloFernetti'

const repos = ref<Repo[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const query = ref('')

const filteredRepos = computed(() => {
  const q = query.value.trim().toLowerCase()
  const sorted = [...repos.value]
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
  if (!q) return sorted
  return sorted.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      (r.description ?? '').toLowerCase().includes(q) ||
      (r.language ?? '').toLowerCase().includes(q),
  )
})

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Vue: '#41b883',
  Python: '#3572A5',
  Go: '#00ADD8',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Rust: '#dea584',
  Java: '#b07219',
  Shell: '#89e051',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
  PowerShell: '#012456',
}

function langColor(language: string | null): string {
  if (!language) return 'var(--text-dim)'
  return LANGUAGE_COLORS[language] ?? 'var(--neon-violet)'
}

function formatNumber(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers: { Accept: 'application/vnd.github+json' } },
    )
    if (!res.ok) {
      throw new Error(`GitHub API responded with status ${res.status}`)
    }
    repos.value = (await res.json()) as Repo[]
  } catch (e) {
    error.value =
      e instanceof Error ? e.message : 'Failed to load repositories'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section id="repos" class="section container">
    <div v-if="loading" class="repos-state">
      <span class="repos-state__spinner"></span>
      <p class="repos-state__text">Loading repositories from GitHub…</p>
    </div>

    <div v-else-if="error" class="repos-state">
      <p class="repos-state__text repos-state__text--error">
        ⚠ Could not load repositories: {{ error }}
      </p>
      <a
        :href="`https://github.com/${GITHUB_USER}?tab=repositories`"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn--primary"
      >
        Open GitHub profile ↗
      </a>
    </div>

    <template v-else>
      <input
        v-model="query"
        type="search"
        class="repos-search"
        placeholder="Filter by name, description or language…"
        aria-label="Filter repositories"
      />

      <p class="repos-count">
        {{ filteredRepos.length }} public
        {{ filteredRepos.length === 1 ? 'repository' : 'repositories' }}
      </p>

      <div class="repos-grid">
        <a
          v-for="repo in filteredRepos"
          :key="repo.id"
          :href="repo.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="repo-card reveal"
        >
          <div class="repo-card__head">
            <h3 class="repo-card__name">{{ repo.name }}</h3>
            <span v-if="repo.archived" class="repo-card__archived">archived</span>
          </div>

          <p class="repo-card__description">
            {{ repo.description || 'No description provided.' }}
          </p>

          <div class="repo-card__meta">
            <span
              v-if="repo.language"
              class="repo-card__lang"
            >
              <span
                class="repo-card__lang-dot"
                :style="{ background: langColor(repo.language) }"
              ></span>
              {{ repo.language }}
            </span>

            <span v-if="repo.stargazers_count" class="repo-card__stat" title="Stars">
              ★ {{ formatNumber(repo.stargazers_count) }}
            </span>

            <span v-if="repo.forks_count" class="repo-card__stat" title="Forks">
              ⑂ {{ formatNumber(repo.forks_count) }}
            </span>

            <span class="repo-card__updated" :title="`Updated ${formatDate(repo.updated_at)}`">
              Updated {{ formatDate(repo.updated_at) }}
            </span>
          </div>
        </a>
      </div>

      <p v-if="filteredRepos.length === 0" class="repos-state">
        <span class="repos-state__text">No repositories match your filter.</span>
      </p>
    </template>
  </section>
</template>

<style scoped>
.repos-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 48px 0;
}

.repos-state__text {
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

.repos-state__text--error {
  color: var(--neon-pink);
}

.repos-state__spinner {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid var(--border-subtle);
  border-top-color: var(--neon-cyan);
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.repos-search {
  width: 100%;
  max-width: 480px;
  display: block;
  margin-bottom: 12px;
  padding: 12px 20px;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  color: var(--text-primary);
  font-size: 0.9rem;
  outline: none;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.repos-search::placeholder {
  color: var(--text-dim);
}

.repos-search:focus {
  border-color: rgba(0, 240, 255, 0.6);
  box-shadow: var(--glow-cyan);
}

.repos-count {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-dim);
  margin-bottom: 28px;
}

.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.repo-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  transition:
    transform 0.3s,
    border-color 0.3s,
    box-shadow 0.3s;
}

.repo-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 240, 255, 0.6);
  box-shadow: var(--glow-cyan);
}

.repo-card__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.repo-card__name {
  font-family: var(--font-mono);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--neon-cyan);
  overflow-wrap: anywhere;
}

.repo-card:hover .repo-card__name {
  text-shadow: var(--glow-cyan);
}

.repo-card__archived {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  padding: 2px 10px;
  border-radius: 999px;
  color: var(--neon-amber);
  border: 1px solid rgba(255, 179, 71, 0.5);
  flex-shrink: 0;
}

.repo-card__description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  flex: 1;
}

.repo-card__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 4px;
}

.repo-card__lang {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.repo-card__lang-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 6px currentColor;
}

.repo-card__stat {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.repo-card__stat:first-letter {
  color: var(--neon-amber);
}

.repo-card__updated {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-dim);
}

@media (max-width: 640px) {
  .repo-card__updated {
    margin-left: 0;
    width: 100%;
  }
}
</style>
