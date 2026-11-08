<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#repos', label: 'Repositories' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll(): void {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

function closeMenu(): void {
  menuOpen.value = false
}
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <nav class="nav__inner container">
      <a href="#top" class="nav__logo" @click="closeMenu">
        <span class="gradient-text">PF</span>
        <span class="nav__logo-dot">/</span>
        <span class="nav__logo-name">portfolio</span>
      </a>

      <ul class="nav__links" :class="{ 'nav__links--open': menuOpen }">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href" class="nav__link" @click="closeMenu">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <button
        class="nav__burger"
        :class="{ 'nav__burger--open': menuOpen }"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition:
    background-color 0.4s,
    box-shadow 0.4s,
    border-color 0.4s;
  border-bottom: 1px solid transparent;
}

.nav--scrolled {
  background: rgba(10, 10, 22, 0.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--border-subtle);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.nav__logo {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav__logo-dot {
  color: var(--text-dim);
}

.nav__logo-name {
  color: var(--text-secondary);
  font-weight: 500;
}

.nav__links {
  display: flex;
  gap: 28px;
  list-style: none;
}

.nav__link {
  position: relative;
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: color 0.3s;
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 2px;
  background: var(--gradient-brand);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}

.nav__link:hover {
  color: var(--text-primary);
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
}

.nav__link:hover::after {
  transform: scaleX(1);
}

.nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.nav__burger span {
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition:
    transform 0.3s,
    opacity 0.3s;
}

.nav__burger--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.nav__burger--open span:nth-child(2) {
  opacity: 0;
}
.nav__burger--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .nav__burger {
    display: flex;
  }

  .nav__links {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    padding: 24px 0;
    background: rgba(10, 10, 22, 0.95);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border-subtle);
    transform: translateY(-120%);
    transition: transform 0.35s ease;
    opacity: 0;
  }

  .nav__links--open {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
