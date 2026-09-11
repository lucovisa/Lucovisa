(function () {
  const STORAGE_KEY = 'custom_shortcuts';

  function getShortcuts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function saveShortcuts(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
  }

  function generateId() {
    return 'sc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  }

  function addShortcut(shortcut) {
    const list = getShortcuts();
    shortcut.id = shortcut.id || generateId();
    list.push(shortcut);
    saveShortcuts(list);
    renderShortcuts();
    return shortcut;
  }

  function updateShortcut(id, patch) {
    const list = getShortcuts();
    const idx = list.findIndex(s => s.id === id);
    if (idx === -1) return false;
    list[idx] = Object.assign({}, list[idx], patch);
    saveShortcuts(list);
    renderShortcuts();
    return true;
  }

  function removeShortcut(id) {
    const list = getShortcuts().filter(s => s.id !== id);
    saveShortcuts(list);
    renderShortcuts();
  }

  function clearShortcuts() {
    saveShortcuts([]);
    renderShortcuts();
  }

  function renderShortcuts() {
    const container = document.getElementById('desktop-icons');
    if (!container) return;

    container.querySelectorAll('.app-icon[data-shortcut]').forEach(el => el.remove());

    const list = getShortcuts();
    const baseCount = container.querySelectorAll('.app-icon:not([data-shortcut])').length;
    const baseRect = container.querySelector('.app-icon');

    list.forEach((sc, i) => {
      const btn = document.createElement('button');
      btn.className = 'app-icon app-icon--shortcut';
      btn.dataset.shortcut = sc.id;
      btn.dataset.icon = 'sc_' + sc.id;
      btn.style.position = 'absolute';
      btn.style.left = (baseRect ? 16 : 16) + 'px';
      btn.style.top = (16 + (baseCount + i) * 108) + 'px';

      const img = document.createElement('span');
      img.className = 'app-icon__svg app-icon__shortcut-img';
      if (sc.icon) {
        const inner = document.createElement('img');
        inner.src = sc.icon;
        inner.alt = '';
        img.appendChild(inner);
      } else {
        img.innerHTML = ICONS.shortcut;
      }

      const label = document.createElement('span');
      label.textContent = sc.name || 'Shortcut';

      btn.appendChild(img);
      btn.appendChild(label);

      btn.addEventListener('click', e => {
        if (btn.dataset.dragged === '1') {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        openShortcut(sc);
      });

      btn.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.stopPropagation();
        showShortcutContextMenu(e, sc);
      });

      container.appendChild(btn);

      if (typeof window.makeIconDraggable === 'function') {
        window.makeIconDraggable(btn);
      }
    });

    if (typeof window.loadDesktopPositions === 'function') {
      window.loadDesktopPositions();
    }
  }

  function openShortcut(sc) {
    if (!sc.target) {
      if (typeof toast === 'function') toast(t('shortcut.empty'));
      return;
    }
    window.open(sc.target, '_blank', 'noopener');
  }

  function showShortcutContextMenu(e, sc) {
    let menu = document.getElementById('shortcut-context-menu');
    if (menu) menu.remove();

    menu = document.createElement('div');
    menu.className = 'context-menu context-menu--floating';
    menu.id = 'shortcut-context-menu';
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';

    const openItem = document.createElement('button');
    openItem.className = 'context-menu__item';
    openItem.innerHTML = '<span class="app-icon__svg app-icon__svg--sm" data-svg="web"></span><span>' + t('shortcut.contextOpen') + '</span>';
    openItem.addEventListener('click', () => {
      menu.remove();
      openShortcut(sc);
    });

    const renameItem = document.createElement('button');
    renameItem.className = 'context-menu__item';
    renameItem.innerHTML = '<span class="app-icon__svg app-icon__svg--sm" data-svg="shortcut"></span><span>' + t('shortcut.contextRename') + '</span>';
    renameItem.addEventListener('click', async () => {
      menu.remove();
      const newName = await showPrompt(t('shortcut.contextRename'), t('shortcut.namePlaceholder'), sc.name || '');
      if (newName && newName.trim()) {
        updateShortcut(sc.id, { name: newName.trim().slice(0, 32) });
        if (typeof toast === 'function') toast(t('shortcut.renamed'));
      }
    });

    const deleteItem = document.createElement('button');
    deleteItem.className = 'context-menu__item context-menu__item--danger';
    deleteItem.innerHTML = '<span class="app-icon__svg app-icon__svg--sm" data-svg="trash"></span><span>' + t('shortcut.contextDelete') + '</span>';
    deleteItem.addEventListener('click', async () => {
      menu.remove();
      const ok = await showConfirm(t('shortcut.deleteConfirm'));
      if (ok) {
        removeShortcut(sc.id);
        if (typeof toast === 'function') toast(t('shortcut.deleted'));
      }
    });

    const sep = document.createElement('div');
    sep.className = 'context-menu__sep';

    menu.appendChild(openItem);
    menu.appendChild(sep);
    menu.appendChild(renameItem);
    menu.appendChild(deleteItem);

    document.body.appendChild(menu);
    renderIcons(menu);

    const closeMenu = ev => {
      if (!menu.contains(ev.target)) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
        document.removeEventListener('contextmenu', closeMenu);
      }
    };
    setTimeout(() => {
      document.addEventListener('click', closeMenu);
      document.addEventListener('contextmenu', closeMenu);
    }, 0);
  }

  async function createShortcutDialog() {
    return new Promise(resolve => {
      const overlay = document.getElementById('modal-overlay');
      const modalTitle = document.getElementById('modal-title');
      const modalBody = document.getElementById('modal-body');
      const modalOk = document.getElementById('modal-ok');
      const modalCancel = document.getElementById('modal-cancel');
      const modalClose = document.getElementById('modal-close');

      modalTitle.textContent = t('shortcut.title');

      modalBody.innerHTML =
        '<div class="shortcut-form">' +
          '<label class="shortcut-form__label">' + t('shortcut.name') + '</label>' +
          '<input type="text" class="modal__input" id="sc-name" placeholder="' + t('shortcut.namePlaceholder') + '" />' +
          '<label class="shortcut-form__label">' + t('shortcut.target') + '</label>' +
          '<div class="shortcut-form__row">' +
            '<input type="text" class="modal__input" id="sc-target" placeholder="' + t('shortcut.targetPlaceholder') + '" />' +
            '<button class="pill pill--ghost shortcut-form__file" id="sc-target-file">' + t('shortcut.targetFile') + '</button>' +
          '</div>' +
          '<input type="file" id="sc-target-input" hidden />' +
          '<label class="shortcut-form__label">' + t('shortcut.icon') + '</label>' +
          '<div class="shortcut-form__row">' +
            '<input type="text" class="modal__input" id="sc-icon" placeholder="' + t('shortcut.iconPlaceholder') + '" />' +
            '<button class="pill pill--ghost shortcut-form__file" id="sc-icon-file">' + t('shortcut.iconFile') + '</button>' +
          '</div>' +
          '<input type="file" id="sc-icon-input" accept="image/*" hidden />' +
          '<div class="shortcut-form__preview" id="sc-preview"></div>' +
        '</div>';

      const nameInp = modalBody.querySelector('#sc-name');
      const targetInp = modalBody.querySelector('#sc-target');
      const iconInp = modalBody.querySelector('#sc-icon');
      const preview = modalBody.querySelector('#sc-preview');

      let targetFileData = null;
      let iconFileData = null;

      const targetFileBtn = modalBody.querySelector('#sc-target-file');
      const targetFileInput = modalBody.querySelector('#sc-target-input');
      const iconFileBtn = modalBody.querySelector('#sc-icon-file');
      const iconFileInput = modalBody.querySelector('#sc-icon-input');

      targetFileBtn.addEventListener('click', () => targetFileInput.click());
      iconFileBtn.addEventListener('click', () => iconFileInput.click());

      targetFileInput.addEventListener('change', e => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          targetFileData = ev.target.result;
          targetInp.value = file.name;
        };
        reader.readAsDataURL(file);
      });

      iconFileInput.addEventListener('change', e => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          const img = new Image();
          img.onload = () => {
            const size = 64;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            const ratio = Math.min(img.width / size, img.height / size);
            const w = img.width / ratio;
            const h = img.height / ratio;
            ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
            iconFileData = canvas.toDataURL('image/png');
            iconInp.value = '';
            updatePreview();
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      function updatePreview() {
        const name = nameInp.value || t('shortcut.namePlaceholder');
        const icon = iconFileData || iconInp.value;
        preview.innerHTML = '';
        const box = document.createElement('div');
        box.className = 'shortcut-preview';
        const iconBox = document.createElement('div');
        iconBox.className = 'shortcut-preview__icon';
        if (icon) {
          const im = document.createElement('img');
          im.src = icon;
          iconBox.appendChild(im);
        } else {
          iconBox.innerHTML = ICONS.shortcut;
        }
        const label = document.createElement('div');
        label.className = 'shortcut-preview__label';
        label.textContent = name;
        box.appendChild(iconBox);
        box.appendChild(label);
        preview.appendChild(box);
      }

      nameInp.addEventListener('input', updatePreview);
      iconInp.addEventListener('input', updatePreview);
      updatePreview();

      modalOk.textContent = t('shortcut.create');
      modalCancel.style.display = '';
      overlay.classList.add('is-open');

      const cleanup = () => {
        overlay.classList.remove('is-open');
        modalOk.removeEventListener('click', onOk);
        modalCancel.removeEventListener('click', onCancel);
        modalClose.removeEventListener('click', onCancel);
        overlay.removeEventListener('click', onOverlay);
      };

      const onOk = () => {
        const name = nameInp.value.trim();
        const target = targetFileData || targetInp.value.trim();
        const icon = iconFileData || iconInp.value.trim();

        if (!name) {
          if (typeof toast === 'function') toast(t('shortcut.nameRequired'));
          return;
        }
        if (!target) {
          if (typeof toast === 'function') toast(t('shortcut.targetRequired'));
          return;
        }

        cleanup();
        resolve({ name: name.slice(0, 32), target, icon });
      };

      const onCancel = () => {
        cleanup();
        resolve(null);
      };

      const onOverlay = ev => {
        if (ev.target === overlay) onCancel();
      };

      modalOk.addEventListener('click', onOk);
      modalCancel.addEventListener('click', onCancel);
      modalClose.addEventListener('click', onCancel);
      overlay.addEventListener('click', onOverlay);
    });
  }

  async function handleCreateShortcut() {
    const data = await createShortcutDialog();
    if (!data) return;
    addShortcut(data);
    if (typeof toast === 'function') toast(t('shortcut.created'));
  }

  window.getShortcuts = getShortcuts;
  window.addShortcut = addShortcut;
  window.updateShortcut = updateShortcut;
  window.removeShortcut = removeShortcut;
  window.clearShortcuts = clearShortcuts;
  window.renderShortcuts = renderShortcuts;
  window.handleCreateShortcut = handleCreateShortcut;

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(renderShortcuts, 100);
  });
})();