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

  function syncHtmlLangAttribute() {
    const isSpanish = document.body.classList.contains("spanish");
    document.documentElement.lang = isSpanish ? "es" : "en";
  }

  function updateCVLinkForLanguage() {
    const cvLink = document.querySelector(".cv-link");
    if (!cvLink) return;
    const isSpanish = document.body.classList.contains("spanish");
    cvLink.href = isSpanish ? "Diego_Lara_CV.pdf" : "Diego_Lara_CV_ENG.pdf";
  }

  // Check for saved language preference
  const currentLang = localStorage.getItem("language") || "en";

  // Apply the language preference on load
  if (currentLang === "es") {
    document.body.classList.add("spanish");
    langText.textContent = "ES";
  } else {
    langText.textContent = "EN";
  }
  syncHtmlLangAttribute();
  updateCVLinkForLanguage();

  // Toggle language when button is clicked
  langToggle.addEventListener("click", () => {
    document.body.classList.toggle("spanish");

    // Update button text and persist preference
    if (document.body.classList.contains("spanish")) {
      langText.textContent = "ES";
      localStorage.setItem("language", "es");
    } else {
      langText.textContent = "EN";
      localStorage.setItem("language", "en");
    }

    // Keep <html lang> and CV link in sync
    syncHtmlLangAttribute();
    updateCVLinkForLanguage();
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

  // Preload custom Bluey "¡Bingo!" sound if available
  let bingoAudio = null;
  try {
    // Coloca tu archivo de audio en la raíz con el nombre: bingo.mp3
    bingoAudio = new Audio("bingo.mp3");
  } catch (e) {
    bingoAudio = null;
  }

  // Easter Egg: Keepy Uppy style balloons on logo taps
  const logo = document.querySelector(".logo");
  if (logo) {
    const REQUIRED_TAPS = 5;
    const TAP_WINDOW_MS = 1200;
    let tapCount = 0;
    let firstTapTime = 0;
    let balloonsActive = false;

    function playBingoSound() {
      // 1. Si existe el audio de Bluey, úsalo SIEMPRE
      if (bingoAudio) {
        try {
          // Reinicia al inicio para que se pueda repetir en varios globos
          bingoAudio.currentTime = 0;
          bingoAudio.play();
          return;
        } catch (e) {
          // Si por alguna razón falla (autoplay, etc), continuamos a los fallbacks
        }
      }

      // 2. Fallback: voz sintética "¡Bingo!"
      if ("speechSynthesis" in window) {
        const isSpanish = document.body.classList.contains("spanish");
        const utterance = new SpeechSynthesisUtterance("¡Bingo!");
        utterance.lang = isSpanish ? "es-MX" : "en-US";
        window.speechSynthesis.speak(utterance);
        return;
      }

      // 3. Último recurso: tono simple
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    }

    function launchBalloons() {
      if (balloonsActive) return;
      balloonsActive = true;

      const overlay = document.createElement("div");
      overlay.className = "balloon-overlay";
      document.body.appendChild(overlay);

      const balloonCount = 25;
      const balloons = [];
      let remaining = balloonCount;

      const colors = ["color-1", "color-2", "color-3", "color-4", "color-5"];
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement("div");
        const colorClass = colors[i % colors.length];
        balloon.className = `balloon ${colorClass}`;
        overlay.appendChild(balloon);

        const rect = balloon.getBoundingClientRect();
        const width = rect.width || 60;
        const height = rect.height || 80;

        let x = Math.random() * (vw - width);
        let y = Math.random() * (vh - height);
        let vx = (Math.random() * 0.4 + 0.1) * (Math.random() < 0.5 ? -1 : 1);
        let vy = (Math.random() * -0.4) - 0.1; // start slightly upwards

        const state = { el: balloon, x, y, vx, vy, width, height, popped: false };
        balloons.push(state);

        function popBalloon(ev) {
          ev.stopPropagation();
          if (state.popped) return;
          state.popped = true;
          remaining -= 1;
          balloon.classList.add("popped");
          playBingoSound();

          setTimeout(() => {
            balloon.remove();
          }, 250);

          if (remaining <= 0) {
            setTimeout(() => {
              overlay.remove();
              balloonsActive = false;
            }, 400);
          }
        }

        balloon.addEventListener("click", popBalloon);
        balloon.addEventListener(
          "touchstart",
          (ev) => {
            ev.preventDefault();
            popBalloon(ev);
          },
          { passive: false }
        );
      }

      const gravity = 0.0006;
      const bounce = 0.9;

      let lastTime = performance.now();
      function animate(now) {
        if (!balloonsActive) return;
        const dt = now - lastTime;
        lastTime = now;

        for (const b of balloons) {
          if (b.popped) continue;

          b.vy += gravity * dt;
          b.x += b.vx * dt;
          b.y += b.vy * dt;

          if (b.x <= 0) {
            b.x = 0;
            b.vx = Math.abs(b.vx);
          } else if (b.x + b.width >= vw) {
            b.x = vw - b.width;
            b.vx = -Math.abs(b.vx);
          }

          if (b.y <= 0) {
            b.y = 0;
            b.vy = Math.abs(b.vy) * bounce;
          } else if (b.y + b.height >= vh) {
            b.y = vh - b.height;
            b.vy = -Math.abs(b.vy) * bounce;
          }

          b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
        }

        requestAnimationFrame(animate);
      }

      requestAnimationFrame((now) => {
        lastTime = now;
        animate(now);
      });
    }

    function registerTap() {
      const now = Date.now();
      if (!firstTapTime || now - firstTapTime > TAP_WINDOW_MS) {
        firstTapTime = now;
        tapCount = 1;
      } else {
        tapCount += 1;
      }

      if (tapCount >= REQUIRED_TAPS) {
        tapCount = 0;
        firstTapTime = 0;
        launchBalloons();
      }
    }

    logo.addEventListener("click", registerTap);
    logo.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        registerTap();
      },
      { passive: false }
    );
  }
});
