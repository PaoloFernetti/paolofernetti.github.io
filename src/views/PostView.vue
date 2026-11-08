<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { getPostBySlug } from '@/data/posts'

const route = useRoute()
const post = computed(() => getPostBySlug(route.params.slug as string))

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <article class="post container">
    <template v-if="post">
      <div class="post__header">
        <router-link :to="{ name: 'home', hash: '#blog' }" class="post__back">
          ← Back to blog
        </router-link>
        <h1 class="post__title">{{ post.title }}</h1>
        <div class="post__meta">
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span class="post__dot">·</span>
          <span>{{ post.readTime }} read</span>
        </div>
        <div class="post__tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <div class="post__body">
        <section v-for="section in post.sections" :key="section.heading">
          <h2>{{ section.heading }}</h2>
          <p v-for="(paragraph, i) in section.paragraphs" :key="i">
            {{ paragraph }}
          </p>
        </section>
      </div>
    </template>

    <div v-else class="post__not-found">
      <h1>Post not found</h1>
      <router-link :to="{ name: 'home', hash: '#blog' }" class="post__back">
        ← Back to blog
      </router-link>
    </div>
  </article>
</template>

<style scoped>
.post {
  padding-top: 120px;
  padding-bottom: 80px;
  max-width: 780px;
}

.post__header {
  margin-bottom: 48px;
}

.post__back {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-dim);
  transition: color 0.3s;
}

.post__back:hover {
  color: var(--neon-cyan);
  text-shadow: var(--glow-cyan);
}

.post__title {
  margin-top: 24px;
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  font-weight: 700;
  line-height: 1.2;
}

.post__meta {
  margin-top: 16px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text-secondary);
  display: flex;
  gap: 8px;
}

.post__dot {
  color: var(--text-dim);
}

.post__tags {
  margin-top: 18px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.post__body section {
  margin-bottom: 36px;
}

.post__body h2 {
  font-size: 1.35rem;
  margin-bottom: 14px;
  position: relative;
  padding-left: 18px;
}

.post__body h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 3px;
  border-radius: 3px;
  background: var(--gradient-brand);
  box-shadow: var(--glow-violet);
}

.post__body p {
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.75;
}

.post__not-found {
  text-align: center;
  padding-top: 60px;
}
</style>
