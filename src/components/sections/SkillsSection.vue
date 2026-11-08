<script setup lang="ts">
import { skills } from '@/data/skills'
import { onMounted, ref } from 'vue'

const skillsRef = ref<HTMLElement | null>(null)
const visible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.2 },
  )
  if (skillsRef.value) observer.observe(skillsRef.value)
})
</script>

<template>
  <section id="skills" class="section container">
    <div ref="skillsRef" class="skills-grid">
      <div
        v-for="(group, gi) in skills"
        :key="group.title"
        class="skill-card reveal"
        :class="`skill-card--${group.accent}`"
        :style="{ '--reveal-delay': `${gi * 0.08}s` }"
      >
        <h3 class="skill-card__title">{{ group.title }}</h3>

        <div
          v-for="skill in group.skills"
          :key="skill.name"
          class="skill"
        >
          <div class="skill__head">
            <span class="skill__name">{{ skill.name }}</span>
            <span class="skill__value">{{ skill.level }}%</span>
          </div>
          <div class="skill__bar">
            <div
              class="skill__fill"
              :style="{
                width: visible ? `${skill.level}%` : '0%',
                transitionDelay: `${gi * 0.06}s`,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 22px;
}

.skill-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}

/* Top neon edge */
.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent-gradient, var(--gradient-brand));
  opacity: 0.8;
}

.skill-card--cyan {
  --accent: var(--neon-cyan);
  --accent-glow: var(--glow-cyan);
  --accent-gradient: linear-gradient(90deg, var(--neon-cyan), transparent);
}
.skill-card--violet {
  --accent: var(--neon-violet);
  --accent-glow: var(--glow-violet);
  --accent-gradient: linear-gradient(90deg, var(--neon-violet), transparent);
}
.skill-card--pink {
  --accent: var(--neon-pink);
  --accent-glow: var(--glow-pink);
  --accent-gradient: linear-gradient(90deg, var(--neon-pink), transparent);
}
.skill-card--lime {
  --accent: var(--neon-lime);
  --accent-glow: var(--glow-lime);
  --accent-gradient: linear-gradient(90deg, var(--neon-lime), transparent);
}

.skill-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent);
  box-shadow: var(--accent-glow);
}

.skill-card__title {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: var(--accent);
  margin-bottom: 20px;
  text-shadow: var(--accent-glow);
}

.skill {
  margin-bottom: 16px;
}

.skill:last-child {
  margin-bottom: 0;
}

.skill__head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.skill__name {
  font-size: 0.88rem;
  color: var(--text-primary);
}

.skill__value {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
}

.skill__bar {
  height: 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.07);
  overflow: hidden;
}

.skill__fill {
  height: 100%;
  border-radius: 4px;
  background: var(--accent);
  box-shadow: var(--accent-glow);
  transition: width 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
