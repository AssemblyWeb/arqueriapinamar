// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear()

// Initialize carousel with Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  // Check if the carousel element exists
  var heroCarouselElement = document.getElementById("heroCarousel")
  if (heroCarouselElement) {
    // Initialize the carousel
    var carousel = new bootstrap.Carousel(heroCarouselElement, {
      interval: 5000,
      wrap: true,
    })
  }

  // Handle modal links that should close the modal
  document.querySelectorAll('.modal a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const modalElement = document.getElementById("torneosModal")
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement)
        if (modalInstance) {
          modalInstance.hide()
        }
      }
    })
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for header height
        behavior: "smooth",
      })

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        document.querySelector(".navbar-toggler").click()
      }
    }
  })
})

// Add active class to nav items on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (pageYOffset >= sectionTop - 100) {
      currentSection = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
})
// API ARQUERIA
console.log("api")
const API_URL = "https://corsproxy.io/?https://script.google.com/macros/s/AKfycbwtaLj-UYpMxwRvqAGFQye-4LhpcxlfNeAUdahicwl1uYFfOdbkGQO5s4svY_jd2fmkvw/exec";
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data); // 🔍 esto imprime algo como:
      // {
      //   "Recurvo Raso": [{ Nombre: "Juan", Total: 255 }, ...],
      //   "Escuela": [{ Nombre: "Laura", Total: 240 }, ...],
      //   ...
      // }
    })
    