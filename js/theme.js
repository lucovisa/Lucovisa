const THEMES = ['dark', 'light'];

function applyTheme(theme) {
  if (THEMES.indexOf(theme) === -1) theme = 'dark';

  document.documentElement.setAttribute('data-theme', theme);

  document.querySelectorAll('.theme-toggle [data-theme]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.theme === theme);
  });

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'light' ? '#EAF1F8' : '#171A21');
  }

  try { localStorage.setItem('theme', theme); } catch (e) {}

  if (typeof updateGiscusTheme === 'function') updateGiscusTheme(theme);
}