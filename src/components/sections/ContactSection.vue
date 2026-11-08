<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <section id="contact" class="section container">
    <div class="contact reveal">
      <h2 class="contact__title">Let's build something <span class="gradient-text">amazing</span></h2>
      <p class="contact__text">
        I'm always open to interesting projects, collaborations and just
        talking tech. Drop me a line — I'll get back to you.
      </p>

      <a :href="`mailto:${profile.email}`" class="contact__cta">
        Say hello ↗
      </a>

      <div class="contact__links">
        <a
          v-for="social in profile.socials"
          :key="social.label"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="contact__link"
        >
          {{ social.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  text-align: center;
  max-width: 640px;
  margin-inline: auto;
  padding: 56px 32px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  background: var(--bg-surface);
  position: relative;
  overflow: hidden;
}

.contact::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 50% at 50% 0%,
    rgba(124, 58, 237, 0.16),
    transparent
  );
  pointer-events: none;
}

.contact__title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 700;
}

.contact__text {
  margin-top: 16px;
  color: var(--text-secondary);
}

.contact__cta {
  display: inline-block;
  margin-top: 32px;
  padding: 14px 40px;
  border-radius: 999px;
  font-weight: 700;
  color: var(--bg-base);
  background: var(--gradient-brand);
  transition:
    box-shadow 0.3s,
    transform 0.3s;
}

.contact__cta:hover {
  transform: translateY(-3px);
  box-shadow:
    0 0 16px rgba(0, 240, 255, 0.5),
    0 0 40px rgba(124, 58, 237, 0.35),
    0 0 70px rgba(255, 46, 151, 0.2);
}

.contact__links {
  margin-top: 36px;
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.contact__link {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: color 0.3s, text-shadow 0.3s;
}

.contact__link:hover {
  color: var(--neon-cyan);
  text-shadow: var(--glow-cyan);
}
</style>
