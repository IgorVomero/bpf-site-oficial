/** One-time compositions and direct-child card groups; HTML stays visible by default. */
export function initReveal(root: ParentNode = document): void {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return

  const groups = new WeakMap<HTMLElement, HTMLElement>()
  for (const group of root.querySelectorAll<HTMLElement>('[data-reveal-group]')) {
    for (const child of group.children) {
      if (!(child instanceof HTMLElement)) continue
      child.setAttribute('data-reveal', '')
      groups.set(child, group)
    }
  }

  const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
  const pending = new Set<HTMLElement>()
  const cleanups = new Map<HTMLElement, () => void>()

  const finish = (element: HTMLElement) => {
    cleanups.get(element)?.()
    cleanups.delete(element)
    pending.delete(element)
    element.classList.remove('reveal-pending', 'reveal-ready')
    element.style.removeProperty('--reveal-delay')
    observer.unobserve(element)
  }

  const showAll = () => {
    observer.disconnect()
    for (const element of elements) finish(element)
  }

  const observer = new IntersectionObserver((entries) => {
    try {
      // Stagger only cards entering together on the same row. A single mobile
      // column starts each card immediately, and wider grids never exceed 210ms.
      const rows = new Map<HTMLElement, { top: number; index: number }>()
      for (const entry of entries) {
        const element = entry.target as HTMLElement
        if (!entry.isIntersecting || !pending.has(element)) continue
        const group = groups.get(element)
        let delay = 0
        if (group) {
          const top = element.getBoundingClientRect().top
          const previous = rows.get(group)
          const index = previous && Math.abs(top - previous.top) < 2 ? previous.index + 1 : 0
          rows.set(group, { top, index })
          const intro = group.closest('section')?.querySelector<HTMLElement>('[data-reveal]')
          const lead = intro && !group.contains(intro) && intro.classList.contains('reveal-ready') ? 70 : 0
          delay = Math.min(lead + index * 70, 210)
        }

        element.style.setProperty('--reveal-delay', `${delay}ms`)
        element.classList.add('reveal-ready')
        element.classList.remove('reveal-pending')
        pending.delete(element)
        observer.unobserve(element)

        const onEnd = (event: TransitionEvent) => {
          if (event.target === element && event.propertyName === 'opacity') finish(element)
        }
        // A timeout also releases styles if a transition is cancelled or its
        // end event is missed (e.g. resizing or returning from a background tab).
        const timeout = window.setTimeout(() => finish(element), 700 + delay)
        element.addEventListener('transitionend', onEnd)
        cleanups.set(element, () => {
          window.clearTimeout(timeout)
          element.removeEventListener('transitionend', onEnd)
        })
      }
    } catch {
      showAll()
    }
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })

  try {
    for (const element of elements) {
      // Never arm heroes, initial viewport content, or content above a restored
      // scroll position. Observe successfully before opting into hiding.
      if (element.closest('.home-hero, .inner-page-banner, .site-header')) continue
      if (element.getBoundingClientRect().top < window.innerHeight) continue
      observer.observe(element)
      pending.add(element)
      element.classList.add('reveal-pending')
    }
  } catch {
    showAll()
    return
  }

  // Keyboard navigation and anchor jumps must expose their target immediately.
  const showAncestors = (target: Element) => {
    for (const element of elements) {
      if (pending.has(element) && (element === target || element.contains(target))) finish(element)
    }
  }
  // Pointer focus must keep its hit target stable between press and release.
  // Keyboard and programmatic focus still expose unobserved content at once.
  let pointerPressed = false
  document.addEventListener('pointerdown', () => { pointerPressed = true }, { capture: true, passive: true })
  const releasePointer = () => { pointerPressed = false }
  document.addEventListener('pointerup', releasePointer, { capture: true, passive: true })
  document.addEventListener('pointercancel', releasePointer, { capture: true, passive: true })
  document.addEventListener('keydown', releasePointer, { capture: true })
  document.addEventListener('focusin', (event) => {
    if (!pointerPressed && event.target instanceof Element) showAncestors(event.target)
  })
  const showAnchor = () => {
    try {
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      if (target) showAncestors(target)
    } catch {
      // A malformed hash must not affect page content or other interactions.
    }
  }
  window.addEventListener('hashchange', showAnchor)
  showAnchor()

  // Preference changes and the back/forward cache also leave everything readable.
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) showAll()
  })
  window.addEventListener('pagehide', showAll, { once: true })
}

initReveal()
