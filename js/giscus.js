const GISCUS_CONFIG = {
  repo: 'lucovisa/lucovisa.github.io',
  repoId: 'ВСТАВЬ_REPO_ID',
  category: 'Comments',
  categoryId: 'ВСТАВЬ_CATEGORY_ID',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  loading: 'lazy'
};

function loadGiscus() {
  const container = document.getElementById('giscus-container');
  if (!container || container.dataset.loaded) return;

  const theme = document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark_dimmed';

  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', GISCUS_CONFIG.repo);
  script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId);
  script.setAttribute('data-category', GISCUS_CONFIG.category);
  script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId);
  script.setAttribute('data-mapping', GISCUS_CONFIG.mapping);
  script.setAttribute('data-strict', GISCUS_CONFIG.strict);
  script.setAttribute('data-reactions-enabled', GISCUS_CONFIG.reactionsEnabled);
  script.setAttribute('data-emit-metadata', GISCUS_CONFIG.emitMetadata);
  script.setAttribute('data-input-position', GISCUS_CONFIG.inputPosition);
  script.setAttribute('data-theme', theme);
  script.setAttribute('data-lang', document.documentElement.lang === 'ru' ? 'ru' : 'en');
  script.setAttribute('data-loading', GISCUS_CONFIG.loading);
  script.crossOrigin = 'anonymous';
  script.async = true;

  container.innerHTML = '';
  container.appendChild(script);
  container.dataset.loaded = '1';

  const auth = document.getElementById('comments-auth');
  if (auth) auth.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('comments-login');
  if (btn) btn.addEventListener('click', loadGiscus);
});

window.addEventListener('message', (event) => {
  if (event.origin !== 'https://giscus.app') return;
  if (!event.data || typeof event.data !== 'object') return;
});

function updateGiscusTheme(theme) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (!iframe) return;
  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme: theme === 'light' ? 'light' : 'dark_dimmed' } } },
    'https://giscus.app'
  );
}

function updateGiscusLang(lang) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (!iframe) return;
  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { lang: lang === 'ru' ? 'ru' : 'en' } } },
    'https://giscus.app'
  );
}