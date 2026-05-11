const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const SKILL_ANIMATION_THRESHOLD = 0.35;

if (themeToggle && storedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const skillFills = document.querySelectorAll('.skill-fill');
if (skillFills.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = `${bar.dataset.level}%`;
        obs.unobserve(bar);
      }
    });
  }, { threshold: SKILL_ANIMATION_THRESHOLD });

  skillFills.forEach((bar) => observer.observe(bar));
}

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
