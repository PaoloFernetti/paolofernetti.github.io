<script setup lang="ts">
import steam from 'virtual:steam-data'

const STAT_ICONS: Record<string, string> = {
  Level: '✦',
  Games: '▣',
  'Hours / 2 weeks': '◷',
  'Member since': '◈',
}

const stats = [
  { label: 'Level', value: steam.level ?? '—' },
  { label: 'Games', value: steam.gamesCount ?? '—' },
  { label: 'Hours / 2 weeks', value: steam.hours2wk },
  { label: 'Member since', value: steam.memberSince.replace(/,? \d{4}$/, '') },
]
</script>

<template>
  <section id="gaming" class="section container">
    <div class="gaming">
      <a
        :href="steam.profileUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="steam-card reveal"
      >
        <img
          :src="steam.avatar"
          :alt="`${steam.nickname} Steam avatar`"
          class="steam-card__avatar"
          width="100"
          height="100"
          loading="lazy"
        />
        <div class="steam-card__info">
          <span
            class="steam-card__status"
            :class="{ 'steam-card__status--online': steam.onlineState === 'online' }"
          >
            {{ steam.onlineState }}
          </span>
          <span class="steam-card__name">{{ steam.nickname }}</span>
          <span v-if="steam.realName" class="steam-card__realname">
            {{ steam.realName }}
          </span>
          <span class="steam-card__cta">View Steam profile →</span>
        </div>
      </a>

      <ul class="steam-stats reveal">
        <li v-for="stat in stats" :key="stat.label" class="steam-stat">
          <span class="steam-stat__icon">{{ STAT_ICONS[stat.label] }}</span>
          <span class="steam-stat__value">{{ stat.value }}</span>
          <span class="steam-stat__label">{{ stat.label }}</span>
        </li>
      </ul>
    </div>

    <div class="games-grid">
      <a
        v-for="game in steam.games"
        :key="game.name"
        :href="game.url"
        target="_blank"
        rel="noopener noreferrer"
        class="game-card reveal"
      >
        <img
          :src="game.logo"
          :alt="`${game.name} cover`"
          class="game-card__logo"
          width="184"
          height="69"
          loading="lazy"
        />
        <h3 class="game-card__name">{{ game.name }}</h3>
        <div class="game-card__hours">
          <span class="game-card__hours-total">{{ game.hoursOnRecord }} hrs</span>
          <span
            v-if="Number(game.hours2wk) > 0"
            class="game-card__hours-recent"
          >
            {{ game.hours2wk }} hrs in 2 weeks
          </span>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.gaming {
  display: grid;
  grid-template-columns: minmax(260px, 340px) 1fr;
  gap: 28px;
  align-items: stretch;
  margin-bottom: 36px;
}

.steam-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  transition:
    transform 0.3s,
    border-color 0.3s,
    box-shadow 0.3s;
}

.steam-card:hover {
  transform: translateY(-4px);
  border-color: rgba(102, 192, 244, 0.6);
  box-shadow: 0 0 24px rgba(102, 192, 244, 0.25);
}

.steam-card__avatar {
  width: 84px;
  height: 84px;
  border-radius: 14px;
  object-fit: cover;
  flex-shrink: 0;
}

.steam-card__info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.steam-card__status {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.steam-card__status--online {
  color: var(--neon-lime);
  text-shadow: var(--glow-lime);
}

.steam-card__name {
  font-family: var(--font-mono);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  overflow-wrap: anywhere;
}

.steam-card:hover .steam-card__name {
  color: var(--neon-cyan);
}

.steam-card__realname {
  font-size: 0.82rem;
  color: var(--text-dim);
}

.steam-card__cta {
  margin-top: 8px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--neon-violet);
}

.steam-stats {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.steam-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px 10px;
  text-align: center;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
}

.steam-stat__icon {
  color: var(--neon-cyan);
  text-shadow: var(--glow-cyan);
  font-size: 0.9rem;
}

.steam-stat__value {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  overflow-wrap: anywhere;
}

.steam-stat__label {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.game-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  transition:
    transform 0.3s,
    border-color 0.3s,
    box-shadow 0.3s;
}

.game-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 240, 255, 0.6);
  box-shadow: var(--glow-cyan);
}

.game-card__logo {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.game-card__name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.game-card:hover .game-card__name {
  color: var(--neon-cyan);
}

.game-card__hours {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.game-card__hours-total {
  color: var(--text-secondary);
}

.game-card__hours-recent {
  color: var(--neon-lime);
  text-shadow: var(--glow-lime);
}

@media (max-width: 860px) {
  .gaming {
    grid-template-columns: 1fr;
  }

  .steam-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
