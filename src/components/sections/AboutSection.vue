<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <section id="about" class="section container">
    <div class="about reveal">
      <div class="about__avatar-wrap">
        <img
          :src="profile.avatar"
          :alt="`Portrait of ${profile.name}`"
          class="about__avatar about__avatar--img"
          width="200"
          height="200"
          loading="lazy"
        />
        <div class="about__avatar-ring"></div>
      </div>

      <div class="about__text">
        <p
          v-for="(paragraph, i) in profile.about"
          :key="i"
          class="about__paragraph"
        >
          {{ paragraph }}
        </p>

        <ul class="about__facts">
          <li class="about__fact">
            <span class="about__fact-icon">◈</span>
            <span>{{ profile.location }}</span>
          </li>
          <li class="about__fact">
            <span class="about__fact-icon">✦</span>
            <a :href="`mailto:${profile.email}`" class="about__email">
              {{ profile.email }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 56px;
  align-items: start;
}

.about__avatar-wrap {
  position: relative;
  justify-self: center;
}

.about__avatar {
  width: 200px;
  height: 200px;
  border-radius: 24px;
  border: 2px solid transparent;
}

.about__avatar--img {
  display: block;
  object-fit: cover;
  background:
    linear-gradient(var(--bg-base), var(--bg-base)) padding-box,
    var(--gradient-brand) border-box;
}

.about__avatar-ring {
  position: absolute;
  inset: -10px;
  border-radius: 32px;
  background: conic-gradient(
    from var(--ring-angle, 0deg),
    var(--neon-cyan),
    var(--neon-violet),
    var(--neon-pink),
    var(--neon-cyan)
  );
  filter: blur(10px);
  opacity: 0.4;
  z-index: -1;
  animation: spin 6s linear infinite;
}

.about__paragraph {
  color: var(--text-secondary);
  margin-bottom: 18px;
}

.about__paragraph::before {
  content: '> ';
  font-family: var(--font-mono);
  color: var(--neon-violet);
}

.about__facts {
  list-style: none;
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.about__fact {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.about__fact-icon {
  color: var(--neon-lime);
  text-shadow: var(--glow-lime);
}

.about__email {
  transition: color 0.3s, text-shadow 0.3s;
}

.about__email:hover {
  color: var(--neon-cyan);
  text-shadow: var(--glow-cyan);
}

@keyframes spin {
  to {
    --ring-angle: 360deg;
  }
}

@property --ring-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@media (max-width: 768px) {
  .about {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
</style>
