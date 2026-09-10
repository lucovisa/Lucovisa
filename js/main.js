(function () {
  let savedTheme = 'dark';
  let savedLang = 'en';

  try {
    savedTheme = localStorage.getItem('theme') || 'dark';
    savedLang = localStorage.getItem('lang') || 'en';
  } catch (e) {}

  applyTheme(savedTheme);
  applyLang(savedLang);

  document.querySelectorAll('.lang-toggle [data-lang]').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  document.querySelectorAll('.theme-toggle [data-theme]').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });

  function tick() {
    const el = document.getElementById('clock');
    if (!el) return;
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    el.textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
  }
  tick();
  setInterval(tick, 1000);

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      card.style.transform = 'translate(1px, 1px)';
      setTimeout(() => { card.style.transform = ''; }, 120);
    });
  });

  const closeBtn = document.querySelector('.btn--close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const msg = document.documentElement.lang === 'ru'
        ? 'Закрыть Lucovisa.exe?'
        : 'Close Lucovisa.exe?';
      if (confirm(msg)) {
        document.body.style.transition = 'opacity .4s';
        document.body.style.opacity = '0';
        setTimeout(() => location.reload(), 500);
      }
    });
  }
})();