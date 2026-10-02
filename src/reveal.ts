/** Opt-in, one-time reveals. Only /usuarios/ imports this module in the pilot. */
export function initReveal(root: ParentNode = document): void {
  const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const element = entry.target
      const finish = (event: Event) => {
        if (event.target !== element || (event as TransitionEvent).propertyName !== 'opacity') return
        element.classList.remove('reveal-ready')
        element.removeEventListener('transitionend', finish)
      }
      element.addEventListener('transitionend', finish)
      entry.target.classList.add('reveal-ready')
      entry.target.classList.remove('reveal-pending')
      observer.unobserve(entry.target)
    }
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })

  for (const element of elements) {
    const rect = element.getBoundingClientRect()
    // Keep initially visible content readable, including on deep-link loads.
    if (rect.top < window.innerHeight && rect.bottom > 0) continue
    observer.observe(element)
    element.classList.add('reveal-pending')
  }

  // Also honor a preference changed while this page remains open.
  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return
    observer.disconnect()
    for (const element of elements) element.classList.remove('reveal-pending', 'reveal-ready')
  })
}

initReveal()
