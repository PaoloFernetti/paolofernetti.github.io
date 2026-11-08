<script setup lang="ts">
import { ref } from 'vue'

import { useReveal } from '@/composables/useReveal'
import SectionTitle from '@/components/SectionTitle.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import RepositoriesSection from '@/components/sections/RepositoriesSection.vue'
import GamingSection from '@/components/sections/GamingSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const mainRef = ref<HTMLElement | null>(null)
useReveal(mainRef)
</script>

<template>
  <div ref="mainRef">
    <HeroSection />

    <SectionTitle class="container" index="01" title="About me" />
    <AboutSection />

    <SectionTitle class="container" index="02" title="Experience" />
    <ExperienceSection />

    <SectionTitle class="container" index="03" title="Skills" />
    <SkillsSection />

    <SectionTitle class="container" index="04" title="My repositories" />
    <RepositoriesSection />

    <SectionTitle class="container" index="05" title="Gaming" />
    <GamingSection />

    <SectionTitle class="container" index="06" title="Contact" />
    <ContactSection />
  </div>
</template>
