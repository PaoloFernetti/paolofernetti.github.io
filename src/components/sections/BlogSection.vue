<script setup lang="ts">
import { posts } from '@/data/posts'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <section id="blog" class="section container">
    <div class="blog-list">
      <router-link
        v-for="(post, i) in posts"
        :key="post.slug"
        :to="{ name: 'post', params: { slug: post.slug } }"
        class="blog-card reveal"
        :style="{ '--reveal-delay': `${i * 0.08}s` }"
      >
        <div class="blog-card__meta">
          <time :datetime="post.date" class="blog-card__date">
            {{ formatDate(post.date) }}
          </time>
          <span class="blog-card__dot">·</span>
          <span class="blog-card__read">{{ post.readTime }} read</span>
        </div>

        <h3 class="blog-card__title">{{ post.title }}</h3>
        <p class="blog-card__excerpt">{{ post.excerpt }}</p>

        <div class="blog-card__footer">
          <div class="blog-card__tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <span class="blog-card__more">Read article →</span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.blog-list {
  max-width: 820px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.blog-card {
  display: block;
  padding: 26px 30px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  transition:
    transform 0.3s,
    border-color 0.3s,
    box-shadow 0.3s;
}

.blog-card:hover {
  transform: translateY(-4px);
  border-color: rgba(124, 58, 237, 0.65);
  box-shadow: var(--glow-violet);
}

.blog-card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--text-dim);
}

.blog-card__date {
  color: var(--neon-cyan);
}

.blog-card__title {
  margin-top: 10px;
  font-size: 1.3rem;
  font-weight: 700;
  transition: color 0.3s;
}

.blog-card:hover .blog-card__title {
  color: var(--neon-cyan);
  text-shadow: 0 0 12px rgba(0, 240, 255, 0.4);
}

.blog-card__excerpt {
  margin-top: 8px;
  color: var(--text-secondary);
  font-size: 0.92rem;
}

.blog-card__footer {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.blog-card__tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.blog-card__more {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--neon-pink);
  text-shadow: 0 0 8px rgba(255, 46, 151, 0.4);
  transition: transform 0.3s;
}

.blog-card:hover .blog-card__more {
  transform: translateX(4px);
}
</style>
