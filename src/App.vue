<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <NavBar />
  <main id="top">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>
  <AppFooter v-if="isHome" />
</template>
