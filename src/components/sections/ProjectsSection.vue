<script setup lang="ts">
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

function handleTilt(e: MouseEvent): void {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`
}

function resetTilt(e: MouseEvent): void {
  const card = e.currentTarget as HTMLElement
  card.style.transform = ''
}

const links = (project: Project) => [
  ...(project.demo ? [{ label: 'Live Demo', url: project.demo }] : []),
  ...(project.repo ? [{ label: 'Source', url: project.repo }] : []),
]
</script>

<template>
  <section id="projects" class="section container">
    <div class="projects-grid">
      <article
        v-for="(project, i) in projects"
        :key="project.title"
        class="project-card reveal"
        :class="{ 'project-card--featured': project.featured }"
        :style="{ '--reveal-delay': `${(i % 3) * 0.08}s` }"
        @mousemove="handleTilt"
        @mouseleave="resetTilt"
      >
        <div class="project-card__top">
          <span class="project-card__folder">▣</span>
          <div class="project-card__links">
            <a
              v-for="link in links(project)"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="project-card__link"
            >
              {{ link.label }} ↗
            </a>
          </div>
        </div>

        <h3 class="project-card__title">{{ project.title }}</h3>
        <p class="project-card__description">{{ project.description }}</p>

        <div class="project-card__tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 22px;
}

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 26px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  transition:
    transform 0.25s ease-out,
    border-color 0.3s,
    box-shadow 0.3s;
  will-change: transform;
}

.project-card:hover {
  border-color: rgba(0, 240, 255, 0.6);
  box-shadow:
    var(--glow-cyan),
    0 20px 40px rgba(0, 0, 0, 0.4);
}

.project-card--featured {
  background:
    linear-gradient(var(--bg-base), var(--bg-base)) padding-box,
    linear-gradient(
        140deg,
        rgba(0, 240, 255, 0.5),
        rgba(124, 58, 237, 0.5),
        rgba(255, 46, 151, 0.5)
      )
      border-box;
  border: 1px solid transparent;
}

.project-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-card__folder {
  font-size: 1.5rem;
  color: var(--neon-violet);
  text-shadow: var(--glow-violet);
}

.project-card__links {
  display: flex;
  gap: 14px;
}

.project-card__link {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-dim);
  transition: color 0.3s, text-shadow 0.3s;
}

.project-card__link:hover {
  color: var(--neon-cyan);
  text-shadow: var(--glow-cyan);
}

.project-card__title {
  font-size: 1.25rem;
  font-weight: 700;
}

.project-card:hover .project-card__title {
  color: var(--neon-cyan);
  text-shadow: 0 0 12px rgba(0, 240, 255, 0.45);
}

.project-card__description {
  color: var(--text-secondary);
  font-size: 0.92rem;
  flex: 1;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}
</style>
