const header = document.querySelector('.site-header--home')

if (header) {
  const updateScrollState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40)
  }

  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('pageshow', updateScrollState)
}
