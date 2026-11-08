<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

const COLORS = ['0, 240, 255', '124, 58, 237', '255, 46, 151']
const PARTICLE_COUNT = 70
const LINK_DISTANCE = 130
const MOUSE_RADIUS = 160

let rafId = 0
let particles: Particle[] = []
let mouse = { x: -9999, y: -9999 }
let resizeObserver: ResizeObserver | undefined
let pointerMoveHandler: ((e: PointerEvent) => void) | undefined
let pointerLeaveHandler: (() => void) | undefined

function initParticles(width: number, height: number): Particle[] {
  const count = Math.min(PARTICLE_COUNT, Math.floor((width * height) / 14000))
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    radius: 1 + Math.random() * 1.8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }))
}

function step(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
): void {
  ctx.clearRect(0, 0, width, height)

  // Update & draw particles
  for (const p of particles) {
    // Gentle attraction towards the pointer
    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const dist = Math.hypot(dx, dy)
    if (dist < MOUSE_RADIUS && dist > 1) {
      p.vx += (dx / dist) * 0.02
      p.vy += (dy / dist) * 0.02
    }

    p.x += p.vx
    p.y += p.vy
    p.vx *= 0.995
    p.vy *= 0.995

    // Keep velocity from dying out completely
    if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.05
    if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.05

    // Bounce off edges
    if (p.x < 0 || p.x > width) p.vx *= -1
    if (p.y < 0 || p.y > height) p.vy *= -1

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${p.color}, 0.85)`
    ctx.shadowColor = `rgba(${p.color}, 0.9)`
    ctx.shadowBlur = 6
    ctx.fill()
    ctx.shadowBlur = 0
  }

  // Link nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i]!
      const b = particles[j]!
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      if (dist < LINK_DISTANCE) {
        const alpha = (1 - dist / LINK_DISTANCE) * 0.35
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }

  rafId = requestAnimationFrame(() => step(ctx, width, height))
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    particles = initParticles(width, height)
  }

  resize()
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }
  const onPointerLeave = () => {
    mouse = { x: -9999, y: -9999 }
  }
  pointerMoveHandler = onPointerMove
  pointerLeaveHandler = onPointerLeave
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', onPointerLeave)

  step(ctx, canvas.clientWidth, canvas.clientHeight)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  resizeObserver?.disconnect()
  if (pointerMoveHandler) {
    window.removeEventListener('pointermove', pointerMoveHandler)
  }
  if (pointerLeaveHandler) {
    window.removeEventListener('pointerleave', pointerLeaveHandler)
  }
})
</script>

<template>
  <canvas ref="canvasRef" class="particles" aria-hidden="true"></canvas>
</template>

<style scoped>
.particles {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
