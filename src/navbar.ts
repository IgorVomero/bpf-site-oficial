const SCROLL_ENTER_THRESHOLD = 32
const SCROLL_EXIT_THRESHOLD = 12

const header = document.querySelector<HTMLElement>('.site-header')

if (header) {
  // All pages start attached. Only scroll position drives the shared state.
  let isScrolled = false
  header.classList.remove('is-scrolled')

  const updateScrollState = () => {
    const nextState = window.scrollY > (isScrolled ? SCROLL_EXIT_THRESHOLD : SCROLL_ENTER_THRESHOLD)

    if (nextState !== isScrolled) {
      isScrolled = nextState
      header.classList.toggle('is-scrolled', isScrolled)
    }
  }

  const updateSurfaceMetrics = () => {
    const viewportWidth = document.documentElement.clientWidth
    if (!viewportWidth) return

    const horizontalGap = viewportWidth < 768 ? 8 : 16
    const rootFontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize)
    const floatingWidth = Math.min(77.5 * rootFontSize, viewportWidth - horizontalGap * 2)
    const horizontalInset = (viewportWidth - floatingWidth) / 2

    header.style.setProperty('--floating-navbar-scale', String(floatingWidth / viewportWidth))
    header.style.setProperty('--floating-navbar-inset', `${horizontalInset}px`)
  }

  // Scroll only writes on state changes; coalesce resize measurements per frame.
  let resizeFrame = 0
  const scheduleSurfaceMetrics = () => {
    if (resizeFrame) return
    resizeFrame = window.requestAnimationFrame(() => {
      resizeFrame = 0
      updateSurfaceMetrics()
    })
  }

  updateSurfaceMetrics()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('resize', scheduleSurfaceMetrics, { passive: true })
  window.addEventListener('pageshow', () => {
    updateSurfaceMetrics()
    updateScrollState()
  }, { passive: true })

  const mobileMenu = header.querySelector<HTMLDetailsElement>('.mobile-nav')
  const closeMobileMenu = () => {
    if (mobileMenu) mobileMenu.open = false
  }

  mobileMenu?.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) closeMobileMenu()
  })
  header.querySelector('.site-brand')?.addEventListener('click', closeMobileMenu)
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu?.open) {
      closeMobileMenu()
      mobileMenu.querySelector('summary')?.focus()
    }
  })
}
