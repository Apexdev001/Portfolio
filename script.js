
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  const body = document.body

  const currentTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", currentTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  })
}

function initLoader() {
  const loader = document.getElementById("loader")
  const mainContent = document.getElementById("main-content")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("fade-out")
      setTimeout(() => {
        loader.style.display = "none"
        mainContent.classList.add("loaded")
        document.body.classList.add("loaded")
      }, 500)
    }, 2500)
  })
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle")
  const nav = document.getElementById("nav")

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
    menuToggle.classList.toggle("active")
  })
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        const nav = document.getElementById("nav")
        const menuToggle = document.getElementById("menuToggle")
        nav.classList.remove("active")
        menuToggle.classList.remove("active")

  
        document.querySelectorAll("nav a").forEach((link) => {
          link.classList.remove("active")
        })
        this.classList.add("active")
      }
    })
  })
}

function initScrollEffects() {
  const header = document.getElementById("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
    updateActiveNavigation()
  })
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll("nav a")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section)
  })
}

function initSkillTagAnimations() {
  const skillTags = document.querySelectorAll(".skill-tag")
  skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`
  })
}

function setCurrentYear() {
  const currentYearElement = document.getElementById("currentYear")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }
}

function initializeWebsite() {
  setCurrentYear()

  initThemeToggle()

  initLoader()

  initMobileMenu()
  initSmoothScrolling()
  initScrollEffects()

  initScrollAnimations()
  initSkillTagAnimations()

  console.log("🚀 ApexDevv Portfolio Website initialized successfully!")
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeWebsite)
} else {
  initializeWebsite()
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const optimizedScrollHandler = debounce(() => {
  updateActiveNavigation()
}, 10)
