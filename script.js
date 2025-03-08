document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle")
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  // Check for saved theme preference or use the system preference
  const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light")

  // Apply the theme
  if (currentTheme === "dark") {
    document.body.classList.add("dark")
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark")

    // Save the preference
    const theme = document.body.classList.contains("dark") ? "dark" : "light"
    localStorage.setItem("theme", theme)
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      })
    })
  })

  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".skill-card, .project-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.style.opacity = 1
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animation
  document.querySelectorAll(".skill-card, .project-card").forEach((element) => {
    element.style.opacity = 0
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Run once on page load
  animateOnScroll()
})

