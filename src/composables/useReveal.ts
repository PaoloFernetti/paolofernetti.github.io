import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/**
 * Adds the `is-visible` class to all elements with the `reveal` class
 * inside the given root element when they enter the viewport.
 */
export function useReveal(root: Ref<HTMLElement | null>): void {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!root.value) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    root.value
      .querySelectorAll('.reveal')
      .forEach((el) => observer?.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
