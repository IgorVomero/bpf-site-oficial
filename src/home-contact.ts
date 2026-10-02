const trigger = document.querySelector<HTMLButtonElement>('#home-contact-location-trigger')
const options = document.querySelector<HTMLElement>('#home-contact-location-options')
const location = document.querySelector<HTMLElement>('.home-contact-location')

if (trigger && options && location) {
  const positionOptions = () => {
    if (options.hidden) return
    const card = location.getBoundingClientRect()
    const requiredSpace = options.offsetHeight + 16
    const spaceBelow = window.innerHeight - card.bottom
    location.dataset.placement = spaceBelow < requiredSpace && card.top > spaceBelow ? 'above' : 'below'
  }

  const closeOptions = (returnFocus = false) => {
    options.hidden = true
    trigger.setAttribute('aria-expanded', 'false')
    if (returnFocus) trigger.focus({ preventScroll: true })
  }

  trigger.addEventListener('click', () => {
    if (!options.hidden) {
      closeOptions()
      return
    }
    options.hidden = false
    trigger.setAttribute('aria-expanded', 'true')
    positionOptions()
  })

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !location.contains(event.target)) closeOptions()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !options.hidden) {
      event.preventDefault()
      closeOptions(true)
    }
  })

  location.addEventListener('focusout', (event) => {
    if (event.relatedTarget instanceof Node && !location.contains(event.relatedTarget)) closeOptions()
  })

  options.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) closeOptions(true)
  })

  window.addEventListener('resize', positionOptions)
  window.addEventListener('scroll', positionOptions, { passive: true })
}
