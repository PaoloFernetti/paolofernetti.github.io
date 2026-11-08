<script setup lang="ts">
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__socials">
      <a
        v-for="social in profile.socials"
        :key="social.label"
        :href="social.url"
        class="footer__social"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="social.label"
      >
        <span v-if="social.icon === 'github'">GH</span>
        <span v-else-if="social.icon === 'linkedin'">in</span>
        <span v-else-if="social.icon === 'telegram'">tg</span>
        <span v-else-if="social.icon === 'email'">✉</span>
        <span v-else>tw</span>
      </a>
    </div>
    <p class="footer__note">
      © {{ year }} {{ profile.name }} · Built with
      <span class="footer__accent">Vue 3</span> +
      <span class="footer__accent">TypeScript</span>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  padding: 48px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-top: 1px solid var(--border-subtle);
  margin-top: calc(var(--section-gap) / 2);
}

.footer__socials {
  display: flex;
  gap: 16px;
}

.footer__social {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-subtle);
  border-radius: 50%;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition:
    color 0.3s,
    border-color 0.3s,
    box-shadow 0.3s,
    transform 0.3s;
}

.footer__social:hover {
  color: var(--neon-cyan);
  border-color: rgba(0, 240, 255, 0.7);
  box-shadow: var(--glow-cyan);
  transform: translateY(-3px);
}

.footer__note {
  font-size: 0.8rem;
  color: var(--text-dim);
}

.footer__accent {
  color: var(--text-secondary);
  text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
}
</style>
