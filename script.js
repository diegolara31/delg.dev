document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");
  
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 80);
  });
  
  // Cursor effects on hover
  const hoverElements = document.querySelectorAll("a, button, .project-card, .skill-item");
  
  hoverElements.forEach(element => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorFollower.style.backgroundColor = "rgba(100, 255, 218, 0.1)";
      cursorFollower.style.borderColor = "transparent";
    });
    
    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.backgroundColor = "transparent";
      cursorFollower.style.borderColor = "var(--primary)";
    });
  });
  
  // Terminal typing effect
  const typingText = document.getElementById("typing-text");
  const commands = [
    "whoami",
    "ls -la projects/",
    "cat about.txt",
    "npm start",
    "git push origin main"
  ];
  
  let commandIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 150;
  
  function typeEffect() {
    const currentCommand = commands[commandIndex];
    
    if (isDeleting) {
      typingText.textContent = currentCommand.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typingText.textContent = currentCommand.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 150;
    }
    
    if (!isDeleting && charIndex === currentCommand.length) {
      isDeleting = true;
      typingDelay = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      commandIndex = (commandIndex + 1) % commands.length;
      typingDelay = 500;
    }
    
    setTimeout(typeEffect, typingDelay);
  }
  
  // Start typing effect
  setTimeout(typeEffect, 1000);
  
  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or use the system preference
  const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light");

  // Apply the theme
  if (currentTheme === "light") {
    document.body.classList.add("light");
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    // Save the preference
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
  });

  // Language toggle functionality
  const langToggle = document.getElementById("lang-toggle");
  const langText = langToggle.querySelector(".lang-text");
  
  // Check for saved language preference
  const currentLang = localStorage.getItem("language") || "en";
  
  // Apply the language
  if (currentLang === "es") {
    document.body.classList.add("spanish");
    langText.textContent = "ES";
  }
  
  // Toggle language when button is clicked
  langToggle.addEventListener("click", () => {
    document.body.classList.toggle("spanish");
    
    // Update button text
    if (document.body.classList.contains("spanish")) {
      langText.textContent = "ES";
      localStorage.setItem("language", "es");
    } else {
      langText.textContent = "EN";
      localStorage.setItem("language", "en");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
      
      // Update active link
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  // Set active nav link on scroll
  const sections = document.querySelectorAll("section");
  
  function setActiveLink() {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });
    
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }
  
  window.addEventListener("scroll", setActiveLink);

  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".skill-item, .project-card, .terminal-body, .code-snippet");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animation
  document.querySelectorAll(".skill-item, .project-card, .terminal-body, .code-snippet").forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Run once on page load
  animateOnScroll();
});
