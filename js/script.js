(() => {
  'use strict';

  const boot = document.getElementById('boot');
  if (boot) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduceMotion ? 200 : 1300;
    window.addEventListener('load', () => {
      setTimeout(() => {
        boot.classList.add('is-hidden');
        setTimeout(() => boot.remove(), 500);
      }, delay);
    });
  }

  const clockEl = document.getElementById('clock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hh}:${mm}`;
  }
  updateClock();
  setInterval(updateClock, 1000 * 15);

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const startBtn = document.getElementById('startBtn');
  const startMenu = document.getElementById('startmenu');

  function closeMenu() {
    if (!startMenu) return;
    startMenu.classList.remove('is-open');
    startBtn?.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu(e) {
    e.stopPropagation();
    if (!startMenu) return;
    const isOpen = startMenu.classList.toggle('is-open');
    startBtn?.setAttribute('aria-expanded', String(isOpen));
  }

  startBtn?.addEventListener('click', toggleMenu);

  document.addEventListener('click', (e) => {
    if (!startMenu || !startMenu.classList.contains('is-open')) return;
    if (!startMenu.contains(e.target) && e.target !== startBtn) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  startMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  const titlebarText = document.querySelector('.titlebar__text');
  const sections = document.querySelectorAll('main .groupbox[id]');

  if (titlebarText && sections.length) {
    const titles = {
      about: 'О себе',
      skills: 'Навыки',
      projects: 'Проекты',
      contacts: 'Контакты',
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const label = titles[entry.target.id] || 'Свойства';
            titlebarText.textContent = `LUCOVISA.EXE — ${label}`;
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();
