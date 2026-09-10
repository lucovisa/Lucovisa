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
    iconEl.src = app.icon;

    const titleEl = node.querySelector('.window__title');
    titleEl.textContent = app.title;

    const offset = Object.keys(openWindows).length * 24;
    node.style.top = (40 + offset) + 'px';
    node.style.left = (80 + offset) + 'px';
    node.style.width = app.width + 'px';
    node.style.height = app.height + 'px';

    const body = node.querySelector('.window__body');

    document.getElementById('windows-layer').appendChild(node);

    openWindows[appId] = { el: node, body, render: app.render };

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
      win.style.left = Math.max(0, origX + dx) + 'px';
      win.style.top = Math.max(0, origY + dy) + 'px';
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
      btn.innerHTML = '<img src="' + app.icon + '" alt="" /><span>' + app.title + '</span>';

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
      const titleEl = w.el.querySelector('.window__title');
      const app = APPS[id];
      if (titleEl && app) titleEl.textContent = app.title;
      if (app && app.render) app.render(w.body);
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