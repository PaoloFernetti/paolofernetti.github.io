<script setup lang="ts">
import { experience } from '@/data/experience'
</script>

<template>
  <section id="experience" class="section container">
    <div class="timeline">
      <div
        v-for="(item, i) in experience"
        :key="item.company"
        class="timeline__item reveal"
        :style="{ '--reveal-delay': `${i * 0.08}s` }"
      >
        <div class="timeline__marker">
          <span class="timeline__dot"></span>
        </div>

        <div class="timeline__card">
          <div class="timeline__head">
            <h3 class="timeline__position">{{ item.position }}</h3>
            <span class="timeline__period">{{ item.period }}</span>
          </div>
          <p class="timeline__company">@ {{ item.company }}</p>
          <p class="timeline__description">{{ item.description }}</p>
          <ul class="timeline__highlights">
            <li
              v-for="highlight in item.highlights"
              :key="highlight"
              class="timeline__highlight"
            >
              <span class="timeline__highlight-marker">▸</span>
              {{ highlight }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  position: relative;
  max-width: 760px;
  margin-inline: auto;
  padding-left: 36px;
}

/* Vertical glowing line */
.timeline::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: linear-gradient(
    180deg,
    var(--neon-cyan),
    var(--neon-violet) 50%,
    var(--neon-pink)
  );
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.6);
}

.timeline__item {
  position: relative;
  padding-bottom: 44px;
}

.timeline__item:last-child {
  padding-bottom: 0;
}

.timeline__marker {
  position: absolute;
  left: -36px;
  top: 6px;
}

.timeline__dot {
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--bg-base);
  border: 2px solid var(--neon-cyan);
  box-shadow: var(--glow-cyan);
  transition: background-color 0.3s, border-color 0.3s;
}

.timeline__item:hover .timeline__dot {
  background: var(--neon-cyan);
}

.timeline__card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  padding: 22px 26px;
  transition:
    transform 0.3s,
    border-color 0.3s,
    box-shadow 0.3s,
    background-color 0.3s;
}

.timeline__card:hover {
  transform: translateX(6px);
  border-color: rgba(124, 58, 237, 0.65);
  background: var(--bg-surface-strong);
  box-shadow: var(--glow-violet);
}

.timeline__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.timeline__position {
  font-size: 1.15rem;
  font-weight: 600;
}

.timeline__period {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--neon-pink);
  text-shadow: 0 0 8px rgba(255, 46, 151, 0.4);
}

.timeline__company {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-dim);
  margin-top: 2px;
}

.timeline__description {
  color: var(--text-secondary);
  margin-top: 10px;
  font-size: 0.95rem;
}

.timeline__highlights {
  list-style: none;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline__highlight {
  color: var(--text-secondary);
  font-size: 0.88rem;
  display: flex;
  gap: 8px;
}

.timeline__highlight-marker {
  color: var(--neon-lime);
  flex-shrink: 0;
}
</style>
