(function () {
  let savedTheme = 'dark';
  let savedLang = 'en';

  try {
    savedTheme = localStorage.getItem('theme') || 'dark';
    savedLang = localStorage.getItem('lang') || 'en';
  } catch (e) {}

  applyTheme(savedTheme);
  applyLang(savedLang);

  renderIcons(document);

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

  const clock = document.getElementById('clock');
  if (clock) clock.addEventListener('click', () => location.reload());

  const startBtn = document.getElementById('start-btn');
  const startMenu = document.getElementById('start-menu');
  if (startBtn && startMenu) {
    startBtn.addEventListener('click', e => {
      e.stopPropagation();
      startMenu.classList.toggle('is-open');
    });
    document.addEventListener('click', e => {
      if (!startMenu.contains(e.target) && e.target !== startBtn) {
        startMenu.classList.remove('is-open');
      }
    });
  }

  const DEFAULT_NAME_KEY = 'username';
  const usernameEl = document.getElementById('start-username');
  const editBtn = document.getElementById('edit-username');

  function detectDefaultName() {
    const ua = navigator.userAgent;
    let os = 'User';
    let browser = '';

    if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Mac OS X/i.test(ua)) os = 'Mac';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Linux/i.test(ua)) os = 'Linux';

    if (/Edg\//i.test(ua)) browser = 'Edge';
    else if (/OPR\//i.test(ua)) browser = 'Opera';
    else if (/Chrome\//i.test(ua)) browser = 'Chrome';
    else if (/Firefox\//i.test(ua)) browser = 'Firefox';
    else if (/Safari\//i.test(ua)) browser = 'Safari';

    return browser ? browser + ' User' : os + ' User';
  }

  function getUsername() {
    try {
      const saved = localStorage.getItem(DEFAULT_NAME_KEY);
      if (saved) return saved;
    } catch (e) {}
    return detectDefaultName();
  }

  function setUsername(name) {
    if (!name || !name.trim()) return;
    const clean = name.trim().slice(0, 32);
    try { localStorage.setItem(DEFAULT_NAME_KEY, clean); } catch (e) {}
    if (usernameEl) usernameEl.textContent = clean;
  }

  function updateUsernameUI() {
    if (usernameEl) usernameEl.textContent = getUsername();
  }

  updateUsernameUI();

  if (editBtn) {
    editBtn.addEventListener('click', e => {
      e.stopPropagation();
      const current = getUsername();
      const name = prompt(t('name.ask'), current);
      if (name !== null) setUsername(name);
    });
  }

  document.querySelectorAll('.btn, .pill, .toggle__btn, .app-icon, .taskbar__start, .taskbar__app, .start-menu__item').forEach(el => {
    el.addEventListener('pointerdown', e => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
      el.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  const openWindows = {};

  function openApp(appId) {
    if (openWindows[appId]) {
      const w = openWindows[appId];
      w.el.classList.remove('is-minimized');
      bringToFront(w.el);
      updateTaskbar();
      return;
    }

    const app = APPS[appId];
    if (!app) return;

    const tpl = document.getElementById('window-template');
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.dataset.app = appId;

    const iconEl = node.querySelector('.window__icon');
    if (iconEl && ICONS[app.icon]) iconEl.innerHTML = ICONS[app.icon];

    const titleEl = node.querySelector('.window__title');
    titleEl.textContent = app.title;

    const offset = Object.keys(openWindows).length * 24;
    const wWidth = Math.min(app.width, window.innerWidth - 40);
    const wHeight = Math.min(app.height, window.innerHeight - 100);
    node.style.top = (40 + offset) + 'px';
    node.style.left = (80 + offset) + 'px';
    node.style.width = wWidth + 'px';
    node.style.height = wHeight + 'px';

    const body = node.querySelector('.window__body');

    document.getElementById('windows-layer').appendChild(node);

    openWindows[appId] = { el: node, body };

    app.render(body);

    node.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'close') {
          node.remove();
          delete openWindows[appId];
          updateTaskbar();
        } else if (action === 'min') {
          node.classList.add('is-minimized');
          updateTaskbar();
        } else if (action === 'max') {
          node.classList.toggle('is-maximized');
        }
      });
    });

    makeDraggable(node);
    bringToFront(node);
    updateTaskbar();
  }

  function closeWindowByApp(appId) {
    const w = openWindows[appId];
    if (!w) return;
    w.el.remove();
    delete openWindows[appId];
    updateTaskbar();
  }

  function bringToFront(el) {
    document.querySelectorAll('.window').forEach(w => { w.style.zIndex = ''; });
    el.style.zIndex = 100 + Object.keys(openWindows).length;
    document.querySelectorAll('.taskbar__app').forEach(b => b.classList.remove('is-active'));
    const btn = document.querySelector('.taskbar__app[data-app="' + el.dataset.app + '"]');
    if (btn) btn.classList.add('is-active');
  }

  function makeDraggable(win) {
    const handle = win.querySelector('[data-drag]');
    if (!handle) return;

    let startX = 0, startY = 0, origX = 0, origY = 0, dragging = false;

    handle.addEventListener('pointerdown', e => {
      if (e.target.closest('button')) return;
      if (win.classList.contains('is-maximized')) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      origX = win.offsetLeft;
      origY = win.offsetTop;
      handle.setPointerCapture(e.pointerId);
      bringToFront(win);
    });

    handle.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      win.style.left = Math.max(0, Math.min(window.innerWidth - 100, origX + dx)) + 'px';
      win.style.top  = Math.max(0, Math.min(window.innerHeight - 80, origY + dy)) + 'px';
    });

    handle.addEventListener('pointerup', e => {
      dragging = false;
      try { handle.releasePointerCapture(e.pointerId); } catch (err) {}
    });
  }

  function updateTaskbar() {
    const bar = document.getElementById('taskbar-apps');
    if (!bar) return;
    bar.innerHTML = '';

    Object.keys(openWindows).forEach(id => {
      const w = openWindows[id];
      const app = APPS[id];
      if (!app) return;

      const btn = document.createElement('button');
      btn.className = 'taskbar__app';
      btn.dataset.app = id;
      btn.innerHTML = '<span class="window__icon window__icon--sm"></span><span>' + app.title + '</span>';
      if (ICONS[app.icon]) btn.querySelector('.window__icon').innerHTML = ICONS[app.icon];

      btn.addEventListener('click', () => {
        if (w.el.classList.contains('is-minimized')) {
          w.el.classList.remove('is-minimized');
          bringToFront(w.el);
        } else if (parseInt(w.el.style.zIndex || 0) >= 100) {
          w.el.classList.add('is-minimized');
          btn.classList.remove('is-active');
        } else {
          bringToFront(w.el);
        }
        updateTaskbar();
      });

      bar.appendChild(btn);
    });
  }

  window.openApp = openApp;
  window.closeWindowByApp = closeWindowByApp;
  window.rerenderOpenWindows = function () {
    Object.keys(openWindows).forEach(id => {
      const w = openWindows[id];
      const app = APPS[id];
      if (!app) return;
      const titleEl = w.el.querySelector('.window__title');
      if (titleEl) titleEl.textContent = app.title;
      app.render(w.body);
    });
    updateTaskbar();
  };

  document.querySelectorAll('[data-app]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.app;
      if (id) openApp(id);
      if (startMenu) startMenu.classList.remove('is-open');
    });
  });

  window.addEventListener('resize', () => {
    Object.keys(openWindows).forEach(id => {
      const w = openWindows[id].el;
      const rect = w.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        w.style.left = Math.max(0, window.innerWidth - rect.width - 8) + 'px';
      }
      if (rect.bottom > window.innerHeight - 52) {
        w.style.top = Math.max(0, window.innerHeight - rect.height - 60) + 'px';
      }
    });
  });
})();