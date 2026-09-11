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

  function runBoot() {
    const boot = document.getElementById('boot-screen');
    if (!boot) return;
    let shown = false;
    try { shown = localStorage.getItem('boot_shown') === '1'; } catch (e) {}
    if (shown) {
      boot.remove();
      return;
    }
    document.body.style.overflow = 'hidden';
    let progress = 0;
    const fill = document.getElementById('boot-fill');
    const welcome = document.getElementById('boot-welcome');
    const tick = setInterval(() => {
      progress += Math.random() * 18 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(tick);
        const name = (function () {
          try { return localStorage.getItem('username') || 'User'; } catch (e) { return 'User'; }
        })();
        if (welcome) welcome.textContent = t('boot.welcome') + name + '!';
        setTimeout(() => {
          boot.classList.add('boot-screen--out');
          document.body.style.overflow = '';
          try { localStorage.setItem('boot_shown', '1'); } catch (e) {}
          setTimeout(() => boot.remove(), 600);
        }, 900);
      }
      if (fill) fill.style.width = progress + '%';
    }, 180);
  }

  runBoot();

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
    const lang = document.documentElement.lang || 'en';
    let dateStr;
    if (lang === 'ru') {
      const ruDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      const ruMonths = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
      dateStr = ruDays[d.getDay()] + ', ' + d.getDate() + ' ' + ruMonths[d.getMonth()];
    } else {
      const enDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      dateStr = enDays[d.getDay()] + ', ' + enMonths[d.getMonth()] + ' ' + d.getDate();
    }
    el.textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()) + ' · ' + dateStr;
  }
  tick();
  setInterval(tick, 1000);

  const clock = document.getElementById('clock');
  if (clock) clock.addEventListener('click', () => {
    if (typeof openApp === 'function') openApp('calendar');
  });

  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalOk = document.getElementById('modal-ok');
  const modalCancel = document.getElementById('modal-cancel');
  const modalClose = document.getElementById('modal-close');
  const modalEl = document.getElementById('modal');

  let modalResolve = null;
  let modalMode = 'info';

  function openModal(opts) {
    return new Promise(resolve => {
      modalResolve = resolve;
      modalMode = opts.mode || 'info';
      modalTitle.textContent = opts.title || t('modal.info');

      modalBody.innerHTML = '';

      if (opts.html) {
        modalBody.innerHTML = opts.html;
      } else if (opts.message) {
        const p = document.createElement('p');
        p.className = 'modal__text';
        p.textContent = opts.message;
        modalBody.appendChild(p);
      }

      if (opts.mode === 'prompt') {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'modal__input';
        input.placeholder = opts.placeholder || '';
        input.value = opts.value || '';
        modalBody.appendChild(input);
        setTimeout(() => { input.focus(); input.select(); }, 50);
        modalBody._input = input;
      }

      modalCancel.style.display = (opts.mode === 'prompt' || opts.mode === 'confirm') ? '' : 'none';
      modalOk.textContent = opts.okText || t('modal.ok');

      modalOverlay.classList.add('is-open');
      makeModalDraggable();
      renderIcons(modalBody);
    });
  }

  function closeModal(result) {
    modalOverlay.classList.remove('is-open');
    if (modalResolve) {
      const r = modalResolve;
      modalResolve = null;
      r(result);
    }
  }

  modalOk.addEventListener('click', () => {
    if (modalMode === 'prompt') {
      const input = modalBody._input;
      closeModal(input ? input.value : '');
    } else {
      closeModal(true);
    }
  });

  modalCancel.addEventListener('click', () => closeModal(modalMode === 'prompt' ? null : false));
  modalClose.addEventListener('click', () => closeModal(modalMode === 'prompt' ? null : false));

  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal(modalMode === 'prompt' ? null : false);
  });

  document.addEventListener('keydown', e => {
    if (!modalOverlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal(modalMode === 'prompt' ? null : false);
    if (e.key === 'Enter') {
      if (modalMode === 'prompt') {
        const input = modalBody._input;
        closeModal(input ? input.value : '');
      } else {
        closeModal(true);
      }
    }
  });

  function makeModalDraggable() {
    const handle = modalEl.querySelector('[data-drag-modal]');
    if (!handle || handle._bound) return;
    handle._bound = true;

    let startX = 0, startY = 0, origX = 0, origY = 0, dragging = false;

    handle.addEventListener('pointerdown', e => {
      if (e.target.closest('button')) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = modalEl.getBoundingClientRect();
      origX = rect.left;
      origY = rect.top;
      handle.setPointerCapture(e.pointerId);
    });

    handle.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      modalEl.style.position = 'fixed';
      modalEl.style.left = Math.max(0, Math.min(window.innerWidth - 100, origX + dx)) + 'px';
      modalEl.style.top  = Math.max(0, Math.min(window.innerHeight - 80, origY + dy)) + 'px';
      modalEl.style.transform = 'none';
      modalEl.style.margin = '0';
    });

    handle.addEventListener('pointerup', e => {
      dragging = false;
      try { handle.releasePointerCapture(e.pointerId); } catch (err) {}
    });
  }

  window.showModal = openModal;
  window.showAlert = (msg, title) => openModal({ mode: 'info', message: msg, title: title || t('modal.info') });
  window.showError = (msg) => openModal({ mode: 'info', message: msg, title: t('modal.error') });
  window.showConfirm = (msg, title) => openModal({ mode: 'confirm', message: msg, title: title || t('modal.confirm') });
  window.showPrompt = (title, placeholder, value) => openModal({ mode: 'prompt', title, placeholder, value });
  window.showHtml = (html, title, okText) => openModal({ mode: 'info', html: html, title: title || t('modal.info'), okText: okText });
  window.t = t;

  window.toast = function (msg) {
    const layer = document.getElementById('toast-layer');
    if (!layer || !msg) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    layer.appendChild(el);
    setTimeout(() => {
      el.classList.add('toast--out');
      setTimeout(() => el.remove(), 300);
    }, 2200);
  };

  window.copyText = function (text, btn, okText) {
    if (!navigator.clipboard) {
      toast(t('toast.copyFailed'));
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      toast(t('toast.copied'));
      if (btn) {
        const old = btn.textContent;
        btn.textContent = okText || t('contact.copied');
        setTimeout(() => { btn.textContent = old; }, 1200);
      }
    }).catch(() => toast(t('toast.copyFailed')));
  };

  const startBtn = document.getElementById('start-btn');
  const startMenu = document.getElementById('start-menu');
  if (startBtn && startMenu) {
    startBtn.addEventListener('click', e => {
      e.stopPropagation();
      startMenu.classList.toggle('is-open');
    });
    document.addEventListener('click', e => {
      if (!startMenu.contains(e.target) && e.target !== startBtn && !startBtn.contains(e.target)) {
        startMenu.classList.remove('is-open');
      }
    });
  }

  const USERNAME_KEY = 'username';
  const AVATAR_KEY = 'avatar';
  const WALLPAPER_KEY = 'wallpaper';
  const DESKTOP_POS_KEY = 'desktop_positions';
  const ICON_SIZE_KEY = 'icon_size';

  const usernameEl = document.getElementById('start-username');
  const editBtn = document.getElementById('edit-username');
  const avatarBtn = document.getElementById('start-menu-avatar');
  const avatarImg = document.getElementById('start-menu-avatar-img');
  const avatarFile = document.getElementById('avatar-file');
  const taskbarAvatar = document.getElementById('start-avatar');
  const wallpaperBtn = document.getElementById('wallpaper-btn');
  const wallpaperFile = document.getElementById('wallpaper-file');
  const desktopEl = document.getElementById('desktop');
  const desktopIcons = document.getElementById('desktop-icons');

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
      const saved = localStorage.getItem(USERNAME_KEY);
      if (saved) return saved;
    } catch (e) {}
    return detectDefaultName();
  }

  function setUsername(name) {
    if (!name || !name.trim()) return;
    const clean = name.trim().slice(0, 32);
    try { localStorage.setItem(USERNAME_KEY, clean); } catch (e) {}
    if (usernameEl) usernameEl.textContent = clean;
    toast(t('toast.nameSaved'));
    if (typeof checkStyleAchievement === 'function') checkStyleAchievement();
  }

  function updateUsernameUI() {
    if (usernameEl) usernameEl.textContent = getUsername();
  }

  function getAvatar() {
    try { return localStorage.getItem(AVATAR_KEY); } catch (e) { return null; }
  }

  function setAvatar(dataUrl) {
    try { localStorage.setItem(AVATAR_KEY, dataUrl); } catch (e) {}
    if (avatarImg) avatarImg.src = dataUrl;
    if (taskbarAvatar) taskbarAvatar.src = dataUrl;
    if (typeof checkStyleAchievement === 'function') checkStyleAchievement();
  }

  function updateAvatarUI() {
    const saved = getAvatar();
    if (saved) {
      if (avatarImg) avatarImg.src = saved;
      if (taskbarAvatar) taskbarAvatar.src = saved;
    }
  }

  function resetProfile() {
    try {
      localStorage.removeItem(USERNAME_KEY);
      localStorage.removeItem(AVATAR_KEY);
    } catch (e) {}
    if (usernameEl) usernameEl.textContent = detectDefaultName();
    if (avatarImg) avatarImg.src = 'icon.png';
    if (taskbarAvatar) taskbarAvatar.src = 'icon.png';
  }

  function getWallpaper() {
    try { return localStorage.getItem(WALLPAPER_KEY); } catch (e) { return null; }
  }

  function setWallpaper(dataUrl) {
    try { localStorage.setItem(WALLPAPER_KEY, dataUrl); } catch (e) {}
    if (desktopEl) {
      desktopEl.style.backgroundImage = 'url(' + dataUrl + ')';
      desktopEl.style.backgroundSize = 'cover';
      desktopEl.style.backgroundPosition = 'center';
    }
    if (typeof checkStyleAchievement === 'function') checkStyleAchievement();
  }

  function updateWallpaperUI() {
    const saved = getWallpaper();
    if (saved && desktopEl) {
      desktopEl.style.backgroundImage = 'url(' + saved + ')';
      desktopEl.style.backgroundSize = 'cover';
      desktopEl.style.backgroundPosition = 'center';
    }
  }

  function resetWallpaper() {
    try { localStorage.removeItem(WALLPAPER_KEY); } catch (e) {}
    if (desktopEl) {
      desktopEl.style.backgroundImage = '';
      desktopEl.style.backgroundSize = '';
      desktopEl.style.backgroundPosition = '';
    }
    toast(t('toast.wallpaperReset'));
  }

  function getIconSize() {
    try { return localStorage.getItem(ICON_SIZE_KEY) || 'medium'; } catch (e) { return 'medium'; }
  }

  function setIconSize(size) {
    if (['small', 'medium', 'large'].indexOf(size) === -1) size = 'medium';
    try { localStorage.setItem(ICON_SIZE_KEY, size); } catch (e) {}
    if (desktopIcons) desktopIcons.setAttribute('data-size', size);
    relayoutIcons();
  }

  window.resetProfile = resetProfile;
  window.resetWallpaper = resetWallpaper;
  window.setWallpaper = setWallpaper;
  window.setAvatar = setAvatar;
  window.setUsername = setUsername;
  window.getIconSize = getIconSize;
  window.setIconSize = setIconSize;

  updateUsernameUI();
  updateAvatarUI();
  updateWallpaperUI();
  if (desktopIcons) desktopIcons.setAttribute('data-size', getIconSize());

  if (editBtn) {
    editBtn.addEventListener('click', async e => {
      e.stopPropagation();
      const current = getUsername();
      const name = await showPrompt(t('name.ask'), t('name.placeholder'), current);
      if (name !== null && name.trim()) setUsername(name);
    });
  }

  if (avatarBtn && avatarFile) {
    avatarBtn.addEventListener('click', e => {
      e.stopPropagation();
      avatarFile.click();
    });

    avatarFile.addEventListener('change', e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showError(t('toast.avatarFailed'));
        return;
      }
      const reader = new FileReader();
      reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
          const size = 128;
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          const ratio = Math.min(img.width / size, img.height / size);
          const w = img.width / ratio;
          const h = img.height / ratio;
          ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
          const data = canvas.toDataURL('image/png');
          setAvatar(data);
          toast(t('toast.avatarSaved'));
          const persImg = document.getElementById('pers-avatar-img');
          if (persImg) persImg.src = data;
        };
        img.onerror = () => showError(t('toast.avatarFailed'));
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
      avatarFile.value = '';
    });
  }

  if (wallpaperBtn && wallpaperFile) {
    wallpaperBtn.addEventListener('click', e => {
      e.stopPropagation();
      wallpaperFile.click();
      if (startMenu) startMenu.classList.remove('is-open');
    });

    wallpaperFile.addEventListener('change', e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showError(t('toast.wallpaperFailed'));
        return;
      }
      const reader = new FileReader();
      reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
          const maxW = 1920;
          const scale = Math.min(1, maxW / img.width);
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const data = canvas.toDataURL('image/jpeg', 0.85);
          setWallpaper(data);
          toast(t('toast.wallpaperSaved'));
          const preview = document.getElementById('pers-wp-preview');
          if (preview) preview.innerHTML = '<img src="' + data + '" alt="" />';
        };
        img.onerror = () => showError(t('toast.wallpaperFailed'));
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
      wallpaperFile.value = '';
    });
  }

  function getGridMetrics() {
    const size = getIconSize();
    if (size === 'small')  return { cellW: 82,  cellH: 82 };
    if (size === 'large')  return { cellW: 118, cellH: 122 };
    return { cellW: 100, cellH: 106 };
  }

  function relayoutIcons() {
    if (!desktopIcons) return;
    const saved = (function () {
      try {
        const raw = localStorage.getItem(DESKTOP_POS_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch (e) { return {}; }
    })();

    const { cellW, cellH } = getGridMetrics();
    const padTop = 16;
    const padLeft = 16;
    const containerH = desktopIcons.clientHeight - padTop;
    const maxRows = Math.max(1, Math.floor(containerH / cellH));

    const allIcons = Array.from(desktopIcons.querySelectorAll('.app-icon'));
    allIcons.forEach((el, index) => {
      const id = el.dataset.icon || el.dataset.shortcut || ('icon_' + index);
      let pos = saved[id];
      let col, row;
      if (pos) {
        col = pos.col !== undefined ? pos.col : 0;
        row = pos.row !== undefined ? pos.row : index;
      } else {
        col = Math.floor(index / maxRows);
        row = index % maxRows;
      }
      el.style.position = 'absolute';
      el.style.left = (padLeft + col * cellW) + 'px';
      el.style.top  = (padTop + row * cellH) + 'px';
      el.dataset.gridCol = col;
      el.dataset.gridRow = row;
    });
  }

  window.relayoutIcons = relayoutIcons;

  function saveDesktopPositions() {
    if (!desktopIcons) return;
    const positions = {};
    desktopIcons.querySelectorAll('.app-icon').forEach(el => {
      const id = el.dataset.icon || el.dataset.shortcut;
      if (!id) return;
      positions[id] = {
        col: parseInt(el.dataset.gridCol) || 0,
        row: parseInt(el.dataset.gridRow) || 0
      };
    });
    try { localStorage.setItem(DESKTOP_POS_KEY, JSON.stringify(positions)); } catch (e) {}
  }

  function loadDesktopPositions() {
    relayoutIcons();
  }

  function makeIconDraggable(el) {
    let startX = 0, startY = 0, origX = 0, origY = 0, dragging = false, moved = false;
    const { cellW, cellH } = getGridMetrics();

    el.addEventListener('pointerdown', e => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      origX = parseFloat(el.style.left) || 0;
      origY = parseFloat(el.style.top) || 0;
      el.style.zIndex = 999;
      el.setPointerCapture(e.pointerId);
    });

    el.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) moved = true;
      el.style.left = Math.max(0, origX + dx) + 'px';
      el.style.top = Math.max(0, origY + dy) + 'px';

      const trashEl = document.querySelector('.app-icon[data-drop="trash"]');
      if (trashEl && el.dataset.drop !== 'trash') {
        const trashRect = trashEl.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const overlap = !(elRect.right < trashRect.left || elRect.left > trashRect.right ||
                          elRect.bottom < trashRect.top || elRect.top > trashRect.bottom);
        if (overlap) trashEl.classList.add('is-drop-target');
        else trashEl.classList.remove('is-drop-target');
      }
    });

    el.addEventListener('pointerup', async e => {
      if (!dragging) return;
      dragging = false;
      el.style.zIndex = '';
      try { el.releasePointerCapture(e.pointerId); } catch (err) {}

      const trashEl = document.querySelector('.app-icon[data-drop="trash"]');
      let droppedOnTrash = false;

      if (trashEl && el.dataset.drop !== 'trash') {
        trashEl.classList.remove('is-drop-target');
        const trashRect = trashEl.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const overlap = !(elRect.right < trashRect.left || elRect.left > trashRect.right ||
                          elRect.bottom < trashRect.top || elRect.top > trashRect.bottom);
        if (overlap) droppedOnTrash = true;
      }

      if (droppedOnTrash) {
        showModal({
          mode: 'confirm',
          title: t('trash.moveConfirm'),
          message: t('trash.moveConfirmText'),
          okText: t('trash.moveYes')
        });

        const yesBtn = document.getElementById('modal-ok');
        const noBtn = document.getElementById('modal-cancel');
        if (yesBtn) yesBtn.style.display = 'none';
        if (noBtn) noBtn.textContent = t('trash.moveNo');
      }

      if (moved) {
        const currentLeft = parseFloat(el.style.left) || 0;
        const currentTop = parseFloat(el.style.top) || 0;
        const col = Math.max(0, Math.round((currentLeft - 16) / cellW));
        const row = Math.max(0, Math.round((currentTop - 16) / cellH));
        el.dataset.gridCol = col;
        el.dataset.gridRow = row;
        el.style.left = (16 + col * cellW) + 'px';
        el.style.top  = (16 + row * cellH) + 'px';
        saveDesktopPositions();
        el.dataset.dragged = '1';
        setTimeout(() => { delete el.dataset.dragged; }, 100);
      }
    });

    el.addEventListener('click', e => {
      if (el.dataset.dragged === '1') {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }

  function resetDesktop() {
    if (!desktopIcons) return;
    try { localStorage.removeItem(DESKTOP_POS_KEY); } catch (e) {}
    relayoutIcons();
    toast(t('toast.desktopReset'));
  }

  window.resetDesktop = resetDesktop;
  window.saveDesktopPositions = saveDesktopPositions;
  window.loadDesktopPositions = loadDesktopPositions;
  window.makeIconDraggable = makeIconDraggable;

  if (desktopIcons) {
    desktopIcons.querySelectorAll('.app-icon').forEach(makeIconDraggable);
  }

  window.addEventListener('resize', () => {
    relayoutIcons();
  });

  const contextMenu = document.getElementById('context-menu');

  function hideContextMenu() {
    if (contextMenu) contextMenu.classList.remove('is-open');
  }

  function showContextMenu(x, y) {
    if (!contextMenu) return;
    contextMenu.classList.add('is-open');
    contextMenu.style.left = Math.min(x, window.innerWidth - 220) + 'px';
    contextMenu.style.top = Math.min(y, window.innerHeight - 180) + 'px';
  }

  document.addEventListener('contextmenu', e => {
    const target = e.target;
    if (target.closest('.window')) return;
    if (target.closest('.modal')) return;
    if (target.closest('.start-menu')) return;
    if (target.closest('.taskbar')) return;
    if (target.closest('.context-menu')) return;
    if (target.closest('.app-icon[data-shortcut]')) return;
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY);
  });

  document.addEventListener('click', e => {
    if (contextMenu && !contextMenu.contains(e.target)) hideContextMenu();
  });

  if (contextMenu) {
    contextMenu.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        hideContextMenu();

        if (action === 'refresh') {
          location.reload();
        } else if (action === 'shortcut') {
          if (typeof handleCreateShortcut === 'function') handleCreateShortcut();
        } else if (action === 'personalization') {
          openApp('personalization');
        }
      });
    });
  }

  const aboutSystemBtn = document.getElementById('about-system-btn');
  if (aboutSystemBtn) {
    aboutSystemBtn.addEventListener('click', () => {
      if (startMenu) startMenu.classList.remove('is-open');
      const build = '2026.09.11';
      showAlert(
        t('system.version') + ': 1.0.0\n' +
        t('system.build') + ': ' + build + '\n' +
        t('system.author') + ': Lucovisa\n\n' +
        t('system.description'),
        t('system.title')
      );
    });
  }

  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', async () => {
      if (startMenu) startMenu.classList.remove('is-open');
      const ok = await showConfirm(t('system.restartConfirm'));
      if (ok) {
        document.body.style.transition = 'opacity .4s';
        document.body.style.opacity = '0';
        setTimeout(() => location.reload(), 500);
      }
    });
  }

  const shutdownBtn = document.getElementById('shutdown-btn');
  if (shutdownBtn) {
    shutdownBtn.addEventListener('click', async () => {
      if (startMenu) startMenu.classList.remove('is-open');
      const ok = await showConfirm(t('system.shutdownConfirm'));
      if (ok) {
        document.body.style.transition = 'opacity .8s';
        document.body.style.opacity = '0';
        setTimeout(() => {
          document.body.innerHTML = '<div class="goodbye">' + t('system.goodbye') + '</div>';
          document.body.style.opacity = '1';
          setTimeout(() => { window.close(); }, 1000);
        }, 900);
      }
    });
  }

  document.querySelectorAll('.btn, .pill, .toggle__btn, .taskbar__start, .taskbar__app, .start-menu__item, .start-menu__edit, .start-menu__avatar, .pers-app__tab, .pers-option, .arcade__item').forEach(el => {
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
    titleEl.textContent = getAppTitle(appId, app);

    const offset = Object.keys(openWindows).length * 20;
    const wWidth = Math.min(app.width, window.innerWidth - 40);
    const wHeight = Math.min(app.height, window.innerHeight - 100);
    const left = Math.max(8, Math.round((window.innerWidth - wWidth) / 2) + offset);
    const top = Math.max(8, Math.round((window.innerHeight - wHeight - 52) / 2) + offset);
    node.style.top = top + 'px';
    node.style.left = left + 'px';
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

    if (typeof unlockAchievement === 'function') {
      if (appId !== 'achievements') {
        unlockAchievement('first_app');
      }
    }
  }

  function getAppTitle(appId, app) {
    const key = 'app.' + appId;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    return app.title;
  }

  function closeWindowByApp(appId) {
    const w = openWindows[appId];
    if (!w) return false;
    w.el.remove();
    delete openWindows[appId];
    updateTaskbar();
    return true;
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
      btn.innerHTML = '<span class="window__icon window__icon--sm"></span><span>' + getAppTitle(id, app) + '</span>';
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
      if (titleEl) titleEl.textContent = getAppTitle(id, app);
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

  if (typeof checkStyleAchievement === 'function') {
    setTimeout(() => checkStyleAchievement(), 500);
  }
})();