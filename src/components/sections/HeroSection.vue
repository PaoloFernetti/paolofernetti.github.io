<script setup lang="ts">
import { profile } from '@/data/profile'
import ParticlesCanvas from '../ParticlesCanvas.vue'
</script>

<template>
  <section class="hero" aria-label="Introduction">
    <ParticlesCanvas />
    <div class="hero__overlay"></div>

    <div class="hero__content container">
      <p class="hero__greeting">Hi, my name is</p>
      <h1 class="hero__name">{{ profile.name }}</h1>
      <h2 class="hero__role">
        {{ profile.role }} <span class="hero__cursor">|</span>
      </h2>
      <p class="hero__tagline">{{ profile.tagline }}</p>

      <div class="hero__actions">
        <a href="#repos" class="btn btn--primary">View my work</a>
        <a href="#contact" class="btn btn--ghost">Get in touch</a>
      </div>
    </div>

    <a href="#about" class="hero__scroll-hint" aria-label="Scroll down">
      <span class="hero__mouse"><span class="hero__wheel"></span></span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 60% at 50% 45%,
    transparent 30%,
    rgba(10, 10, 22, 0.85) 100%
  );
  pointer-events: none;
}

.hero__content {
  position: relative;
  z-index: 2;
}

.hero__greeting {
  font-family: var(--font-mono);
  color: var(--neon-cyan);
  margin-bottom: 16px;
  text-shadow: var(--glow-cyan);
  animation: fade-up 0.8s 0.1s both;
}

.hero__name {
  font-size: clamp(2.6rem, 8vw, 4.8rem);
  font-weight: 700;
  line-height: 1.05;
  animation: fade-up 0.8s 0.25s both;
}

.hero__role {
  font-size: clamp(1.4rem, 4vw, 2.4rem);
  font-weight: 600;
  color: var(--text-secondary);
  margin-top: 8px;
  animation: fade-up 0.8s 0.4s both;
}

.hero__cursor {
  color: var(--neon-pink);
  text-shadow: var(--glow-pink);
  animation: blink 1.1s steps(1) infinite;
}

.hero__tagline {
  max-width: 560px;
  color: var(--text-secondary);
  margin-top: 24px;
  font-size: 1.05rem;
  animation: fade-up 0.8s 0.55s both;
}

.hero__actions {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
  animation: fade-up 0.8s 0.7s both;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 12px 28px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  transition:
    box-shadow 0.3s,
    transform 0.3s,
    border-color 0.3s,
    color 0.3s;
}

.btn--primary {
  background: transparent;
  border: 2px solid var(--neon-cyan);
  color: var(--neon-cyan);
}

.btn--primary:hover {
  box-shadow: var(--glow-cyan);
  transform: translateY(-2px);
}

.btn--ghost {
  border: 2px solid var(--border-subtle);
  color: var(--text-secondary);
}

.btn--ghost:hover {
  border-color: var(--neon-pink);
  color: var(--neon-pink);
  box-shadow: var(--glow-pink);
  transform: translateY(-2px);
}

/* Scroll hint */
.hero__scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.hero__scroll-hint:hover {
  opacity: 1;
}

.hero__mouse {
  display: block;
  width: 24px;
  height: 40px;
  border: 2px solid var(--text-dim);
  border-radius: 14px;
  position: relative;
}

.hero__wheel {
  position: absolute;
  top: 7px;
  left: 50%;
  width: 3px;
  height: 8px;
  margin-left: -1.5px;
  background: var(--neon-cyan);
  border-radius: 3px;
  animation: wheel 1.6s ease-in-out infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@keyframes wheel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(12px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
