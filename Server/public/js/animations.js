document.addEventListener("DOMContentLoaded", () => {
  // Fade in body content
  document.body.style.opacity = 0
  document.body.style.transition = "opacity 0.8s ease-in-out"
  requestAnimationFrame(() => {
    document.body.style.opacity = 1
  })

  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const target = document.getElementById(targetId)
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        })
      }
    })
  })

  // Navbar background effect on scroll
  const navbar = document.querySelector("header")
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.background = "rgba(26, 26, 29, 0.95)"
        navbar.style.backdropFilter = "blur(6px)"
        navbar.style.transition = "all 0.3s ease"
      } else {
        navbar.style.background = "#1a1a1d"
        navbar.style.backdropFilter = "none"
      }
    })
  }
})
