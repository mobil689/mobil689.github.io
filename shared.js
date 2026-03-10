/* ===========================
   SHARED JS — Algorythms Society
   Used on ALL pages
   =========================== */

// --- SANITY CONFIG ---
const SANITY_PROJECT_ID = "tynbb576";
const SANITY_DATASET = "production";

async function fetchSanityData(query) {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 401)
        console.error(
          "Sanity Fetch Error: Unauthorized. Check CORS origins in Sanity settings.",
        );
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { result } = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch Sanity data:", error);
    return [];
  }
}

// --- LENIS SMOOTH SCROLLING ---
let lenis;
function initLenis() {
  lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// --- THEME TOGGLE ---
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const lightIcon = document.getElementById("theme-icon-light");
  const darkIcon = document.getElementById("theme-icon-dark");
  if (!themeToggle || !lightIcon || !darkIcon) return;

  if (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    darkIcon.classList.remove("hidden");
  } else {
    lightIcon.classList.remove("hidden");
  }

  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    lightIcon.classList.toggle("hidden");
    darkIcon.classList.toggle("hidden");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  });
}

// --- CUSTOM CURSOR ---
function initCursor() {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");
  if (!cursorDot || !cursorOutline) return;

  gsap.set([cursorDot, cursorOutline], { xPercent: -50, yPercent: -50 });

  let mouseX = 0,
    mouseY = 0,
    dotX = 0,
    dotY = 0,
    outlineX = 0,
    outlineY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateCursor = () => {
    dotX += (mouseX - dotX) * 0.7;
    dotY += (mouseY - dotY) * 0.7;
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    gsap.to(cursorDot, { duration: 0, x: dotX, y: dotY });
    gsap.to(cursorOutline, { duration: 0, x: outlineX, y: outlineY });
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.addEventListener("mouseenter", () =>
    gsap.to([cursorDot, cursorOutline], { duration: 0.3, opacity: 1 }),
  );
  document.addEventListener("mouseleave", () =>
    gsap.to([cursorDot, cursorOutline], { duration: 0.3, opacity: 0 }),
  );
}

// --- MAGNETIC LINKS ---
function initMagneticLinks() {
  document.querySelectorAll(".magnetic-link").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - left - width / 2) * 0.4,
        y: (e.clientY - top - height / 2) * 0.4,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    });
  });
}

// --- HOVER CURSOR EFFECT ---
function initCursorHover() {
  const cursorOutline = document.querySelector(".cursor-outline");
  if (!cursorOutline) return;
  document
    .querySelectorAll(
      "a, button, .flip-card, .gallery-item, .gallery-item-new, .highlight-card",
    )
    .forEach((el) => {
      el.addEventListener("mouseover", () =>
        cursorOutline.classList.add("hover"),
      );
      el.addEventListener("mouseleave", () =>
        cursorOutline.classList.remove("hover"),
      );
    });
}

// --- TSPARTICLES ---
function initParticles() {
  if (typeof tsParticles === "undefined") return;
  tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: ["#a78bfa", "#4f46e5"] },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: { enable: true, minimumValue: 1 } },
      move: { enable: true, speed: 1, direction: "none", out_mode: "out" },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
    },
    detectRetina: true,
  });
}

// --- PRELOADER ---
function initPreloader(onComplete) {
  const preloader = document.getElementById("preloader");
  if (!preloader) {
    if (onComplete) onComplete();
    return;
  }

  gsap.to("#preloader .loader-text span", {
    duration: 1,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.inOut",
    delay: 1,
  });
  gsap.to(preloader, {
    duration: 0.5,
    opacity: 0,
    delay: 2,
    onComplete: () => {
      preloader.style.display = "none";
      if (onComplete) onComplete();
    },
  });
}

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll(".section-title").forEach((t) =>
    gsap.from(t, {
      scrollTrigger: { trigger: t, start: "top 85%" },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }),
  );
}

// --- TEAM CARD HELPER ---
function createDynamicFlipCard(member) {
  const theme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
  return `<div class="flip-card team-flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front glass-card p-4 flex flex-col items-center justify-center">
                <img class="w-24 h-24 rounded-full mb-4 border-4 border-gray-300 dark:border-violet-500" src="${member.imageUrl || "https://placehold.co/200x200/e0e0e0/1d1d3b?text=A"}" alt="${member.name}">
                <h4 class="font-bold text-lg dark:text-white text-center">${member.name}</h4>
                <p class="text-violet-500 dark:text-violet-300 text-center">${member.role}</p>
            </div>
            <div class="flip-card-back team-flip-card-back ${theme}" style="background-image: linear-gradient(to top, rgba(36, 25, 60, 1) 15%, rgba(36, 25, 60, 0) 40%), url('${member.pokemonImg || ""}');">
                <div class="flex space-x-4">
                    <a href="${member.linkedin || "#"}" target="_blank" class="text-gray-300 hover:text-white transition-colors"><i class="fab fa-linkedin fa-lg"></i></a>
                    <a href="${member.instagram || "#"}" target="_blank" class="text-gray-300 hover:text-white transition-colors"><i class="fab fa-instagram fa-lg"></i></a>
                </div>
            </div>
        </div>
    </div>`;
}

// --- SHARED INIT (call on every page) ---
function initShared() {
  initLenis();
  initTheme();
  initCursor();
  initParticles();
  initScrollAnimations();

  // Delay magnetic and hover init slightly so components inject first
  setTimeout(() => {
    initMagneticLinks();
    initCursorHover();
  }, 100);
}
