const THEMES = ['dark', 'light'];

function updateThemeColorMeta(theme) {
  const metas = document.querySelectorAll('meta[name="theme-color"]');
  metas.forEach(m => {
    if (theme === 'light') {
      m.setAttribute('content', '#d4d0c8');
    } else {
      m.setAttribute('content', '#1b2838');
    }
  });
}

function applyTheme(theme) {
  if (THEMES.indexOf(theme) === -1) theme = 'dark';

  document.documentElement.setAttribute('data-theme', theme);

  document.querySelectorAll('.theme-toggle [data-theme]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.theme === theme);
  });

  updateThemeColorMeta(theme);

  try { localStorage.setItem('theme', theme); } catch (e) {}

  if (typeof updateGiscusTheme === 'function') updateGiscusTheme(theme);
}