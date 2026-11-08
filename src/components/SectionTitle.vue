<script setup lang="ts">
defineProps<{
  index: string
  title: string
}>()
</script>

<template>
  <div class="section-title reveal">
    <span class="section-title__index">{{ index }}.</span>
    <h2 class="section-title__text">{{ title }}</h2>
    <span class="section-title__line"></span>
  </div>
</template>

<style scoped>
.section-title {
  display: flex;
  align-items: center;
  gap: 14px;
}

.section-title__index {
  font-family: var(--font-mono);
  color: var(--neon-cyan);
  font-size: 1.3rem;
  text-shadow: var(--glow-cyan);
}

.section-title__text {
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  font-weight: 700;
  white-space: nowrap;
}

.section-title__line {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(124, 58, 237, 0.7),
    rgba(255, 46, 151, 0.4),
    transparent
  );
}
</style>
