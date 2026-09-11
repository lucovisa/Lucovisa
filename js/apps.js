const PROJECTS = [
  {
    id: 'lucConverter',
    title: 'LucConverter',
    desc: { en: 'Files, units, currencies, links, media - all in one converter.', ru: 'Файлы, единицы, валюты, ссылки, медиа - всё в одном конвертере.' },
    details: {
      en: 'Free and anonymous site. Your data does not go to third parties or to servers. Many features available: File Converter, Currency Converter, Unit Converter, MediaShop, Photoshop, Link generation, 3D model viewer, calculator, text editor with built-in compiler and 30+ more tools.',
      ru: 'Бесплатный и анонимный сайт. Ваши данные не уходят третьим лицам и не уходят на сервера. Доступно много функций: Конвертер файлов, Конвертер Валют, Конвертер Единиц, MediaShop, Photoshop, Link generation, просмотр 3D моделей, калькулятор, текстовый редактор с компилятором внутри и ещё +30 инструментов.'
    },
    github: 'https://github.com/lucovisa/LucConverter',
    site: 'https://lucovisa.github.io/LucConverter/',
    gold: true,
    kind: 'site'
  },
  {
    id: 'sqlInImage',
    title: 'SQL-in-image',
    desc: { en: 'Hide code in pictures and extract it back.', ru: 'Прячем код в картинках и извлекаем обратно.' },
    details: {
      en: 'Tool for hiding text or code inside images and extracting it back.',
      ru: 'Инструмент для сокрытия текста или кода внутри изображений и извлечения обратно.'
    },
    github: 'https://github.com/lucovisa/SQL-in-image',
    site: 'https://lucovisa.github.io/SQL-in-image/',
    kind: 'site'
  },
  {
    id: 'lucCursor',
    title: 'LucCursor',
    desc: { en: 'Draw your own custom cursors.', ru: 'Рисуй свои кастомные курсоры.' },
    details: {
      en: 'Site for drawing your own custom cursor with a reference. Exactly the same as LucFont, but for cursors.',
      ru: 'Сайт для рисования своего кастомного курсора с референсом. Точно такой же как LucFont, но про курсор.'
    },
    github: 'https://github.com/lucovisa/LucCursor',
    site: 'https://lucovisa.github.io/LucCursor/',
    kind: 'site'
  },
  {
    id: 'lucFont',
    title: 'LucFont',
    desc: { en: 'Draw your own fonts, character by character.', ru: 'Рисуй свои шрифты, символ за символом.' },
    details: {
      en: 'Site for drawing your own custom font with a reference.',
      ru: 'Сайт для рисования своего кастомного шрифта с референсом.'
    },
    github: 'https://github.com/lucovisa/LucFont',
    site: 'https://lucovisa.github.io/LucFont/',
    kind: 'site'
  },
  {
    id: 'ipCheck',
    title: 'IP-check',
    desc: { en: 'IP and connection speed checker.', ru: 'Проверка IP и скорости соединения.' },
    details: {
      en: 'My first project for checking all information available in an IP with request history and internet speed test.',
      ru: 'Мой первый проект для проверки всей информации, которая есть в айпи, с историей запросов и проверкой скорости интернета.'
    },
    github: 'https://github.com/lucovisa/IP-check',
    site: 'https://lucovisa.github.io/IP-check/',
    kind: 'ip'
  }
];

const CAT_DIGGER = {
  title: 'Cat Digger',
  desc: { en: 'Game in pre-alpha development.', ru: 'Игра в стадии преальфа-разработки.' },
  details: {
    en: 'Game currently in development (pre-alpha). Developed by an indie developer alone on Godot Engine 4. Will be released on Steam.',
    ru: 'Игра, которая находится в разработке (пре-альфа). Разрабатывается инди-разработчиком в одиночку на Godot Engine 4. Будет выходить в Steam.'
  },
  gold: true,
  kind: 'game'
};

const LUC_VISA = {
  title: 'Lucovisa',
  desc: { en: 'About the developer and all projects.', ru: 'О разработчике и все проекты.' },
  details: {
    en: 'My visit card site with information about me and my projects for employers or just interested people.',
    ru: 'Мой сайт-визитка с информацией обо мне и моих проектах для работодателя или просто заинтересованных людей.'
  },
  github: 'https://github.com/lucovisa/Lucovisa',
  site: 'https://lucovisa.github.io/Lucovisa/',
  isSelf: true,
  kind: 'self'
};

const JOKES = ['joke.1', 'joke.2', 'joke.3', 'joke.4', 'joke.5', 'joke.6'];

const CONTACTS = [
  { id: 'x',     label: 'contact.x',     value: '@Lukovica467771',                url: 'https://x.com/Lukovica467771/' },
  { id: 'steam', label: 'contact.steam', value: 'steamcommunity.com/id/Lucovisa', url: 'https://steamcommunity.com/id/Lucovisa/' },
  { id: 'email', label: 'contact.email', value: 'lucovisa24@gmail.com',           url: 'mailto:lucovisa24@gmail.com' }
];

const DONATE_WALLETS = [
  { label: 'ETH/USDT (ERC-20)',           value: '0xFa78966938743C9168abFC2acD6D7751d7dA35Cf' },
  { label: 'BTC (Bitcoin mainnet)',       value: 'bc1q60tvcsw4guyhxa5e3n47eqmj0s3lpxzkxldpvp' },
  { label: 'TON/USDT (The Open Network)', value: 'UQDsZ_8MkBtjjp-pVa5Fefdg1jtJApOZ7oeFF3WBlLnwQcHF' }
];

const APPS = {
  portfolio:       { title: 'Portfolio',       icon: 'folder',     width: 760, height: 660, render: renderPortfolio },
  about:           { title: 'About me',        icon: 'info',       width: 560, height: 620, render: renderAbout },
  hacker:          { title: 'hacker.exe',      icon: 'terminal',   width: 680, height: 500, render: renderHacker },
  map:             { title: 'Map',             icon: 'web',        width: 800, height: 620, render: renderMap },
  contact:         { title: 'Contact',         icon: 'mail',       width: 560, height: 420, render: renderContact },
  comments:        { title: 'Comments',        icon: 'comment',    width: 640, height: 520, render: renderComments },
  donate:          { title: 'Donate',          icon: 'heart',      width: 560, height: 480, render: renderDonate },
  trash:           { title: 'Trash',           icon: 'trash',      width: 520, height: 400, render: renderTrash },
  personalization: { title: 'Personalization', icon: 'settings',   width: 640, height: 660, render: renderPersonalization },
  achievements:    { title: 'Achievements',    icon: 'trophy',     width: 620, height: 540, render: renderAchievements },
  calendar:        { title: 'Calendar',        icon: 'calendar',   width: 560, height: 620, render: renderCalendar },
  arcade:          { title: 'Arcade',          icon: 'joystick',   width: 720, height: 620, render: renderArcadeWrapper },
  work:            { title: 'Work',            icon: 'briefcase',  width: 640, height: 580, render: renderWork }
};

function lang() { return document.documentElement.lang || 'en'; }

function renderArcadeWrapper(body) {
  if (typeof renderArcade === 'function') renderArcade(body);
}

function renderTrash(body) {
  body.innerHTML =
    '<div class="trash-app">' +
      '<div class="trash-app__files">' +
        '<button class="trash-file" data-file="error">' +
          '<span class="app-icon__svg trash-file__icon" data-svg="fileError"></span>' +
          '<span class="trash-file__name">' + t('trash.errorFile') + '</span>' +
        '</button>' +
        '<button class="trash-file" data-file="bug">' +
          '<span class="app-icon__svg trash-file__icon" data-svg="fileBug"></span>' +
          '<span class="trash-file__name">' + t('trash.bugFile') + '</span>' +
        '</button>' +
      '</div>' +
    '</div>';

  renderIcons(body);

  body.querySelectorAll('.trash-file').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.file;
      const lines = type === 'error' ? t('trash.errorContent') : t('trash.bugContent');
      const line = Array.isArray(lines) ? lines[Math.floor(Math.random() * lines.length)] : lines;
      if (typeof toast === 'function') toast(line);
    });
  });
}

function renderPersonalization(body) {
  const tabs = ['profile', 'wallpaper', 'theme', 'language', 'desktop', 'achievements', 'reset', 'exportImport'];
  let activeTab = 'profile';

  body.innerHTML =
    '<div class="pers-app">' +
      '<div class="pers-app__tabs" id="pers-tabs"></div>' +
      '<div class="pers-app__content" id="pers-content"></div>' +
    '</div>';

  const tabsEl = body.querySelector('#pers-tabs');
  const contentEl = body.querySelector('#pers-content');

  function renderTabs() {
    tabsEl.innerHTML = '';
    tabs.forEach(key => {
      const btn = document.createElement('button');
      btn.className = 'pers-app__tab' + (activeTab === key ? ' is-active' : '');
      btn.textContent = t('personalization.' + key);
      btn.addEventListener('click', () => {
        activeTab = key;
        renderTabs();
        renderContent();
      });
      tabsEl.appendChild(btn);
    });
  }

  function renderContent() {
    contentEl.innerHTML = '';
    if (activeTab === 'profile') renderPersProfile(contentEl);
    else if (activeTab === 'wallpaper') renderPersWallpaper(contentEl);
    else if (activeTab === 'theme') renderPersTheme(contentEl);
    else if (activeTab === 'language') renderPersLanguage(contentEl);
    else if (activeTab === 'desktop') renderPersDesktop(contentEl);
    else if (activeTab === 'achievements') renderPersAchievements(contentEl);
    else if (activeTab === 'reset') renderPersReset(contentEl);
    else if (activeTab === 'exportImport') renderPersExportImport(contentEl);
  }

  renderTabs();
  renderContent();
}

function renderPersProfile(el) {
  const currentAvatar = (function () { try { return localStorage.getItem('avatar'); } catch (e) { return null; } })();
  const currentName = (function () { try { return localStorage.getItem('username'); } catch (e) { return null; } })();

  el.innerHTML =
    '<div class="pers-section">' +
      '<h3>' + t('personalization.profile') + '</h3>' +
      '<div class="pers-row">' +
        '<div class="pers-label">' + t('personalization.avatar') + '</div>' +
        '<button class="pers-avatar" id="pers-avatar-btn">' +
          '<img src="' + (currentAvatar || 'icon.png') + '" alt="" id="pers-avatar-img" />' +
        '</button>' +
        '<p class="pers-hint">' + t('personalization.avatarHint') + '</p>' +
      '</div>' +
      '<div class="pers-row">' +
        '<div class="pers-label">' + t('personalization.nickname') + '</div>' +
        '<input type="text" class="modal__input" id="pers-name" placeholder="' + t('personalization.nicknamePlaceholder') + '" value="' + (currentName || '') + '" />' +
      '</div>' +
      '<button class="pill" id="pers-save">' + t('modal.ok') + '</button>' +
    '</div>';

  el.querySelector('#pers-avatar-btn').addEventListener('click', () => {
    const fi = document.getElementById('avatar-file');
    if (fi) fi.click();
  });

  el.querySelector('#pers-save').addEventListener('click', () => {
    const name = el.querySelector('#pers-name').value.trim();
    if (name && typeof setUsername === 'function') setUsername(name);
  });
}

function renderPersWallpaper(el) {
  const currentWp = (function () { try { return localStorage.getItem('wallpaper'); } catch (e) { return null; } })();

  el.innerHTML =
    '<div class="pers-section">' +
      '<h3>' + t('personalization.wallpaper') + '</h3>' +
      '<div class="pers-wallpaper-preview" id="pers-wp-preview">' +
        (currentWp ? '<img src="' + currentWp + '" alt="" />' : '<div class="pers-wallpaper-empty">' + t('personalization.wallpaperHint') + '</div>') +
      '</div>' +
      '<p class="pers-hint">' + t('personalization.wallpaperHint') + '</p>' +
      '<div class="pers-actions">' +
        '<button class="pill" id="pers-wp-upload">' + t('personalization.wallpaperUpload') + '</button>' +
        '<button class="pill pill--ghost" id="pers-wp-reset">' + t('personalization.wallpaperReset') + '</button>' +
      '</div>' +
    '</div>';

  el.querySelector('#pers-wp-upload').addEventListener('click', () => {
    const fi = document.getElementById('wallpaper-file');
    if (fi) fi.click();
  });

  el.querySelector('#pers-wp-reset').addEventListener('click', () => {
    if (typeof resetWallpaper === 'function') resetWallpaper();
    el.querySelector('#pers-wp-preview').innerHTML = '<div class="pers-wallpaper-empty">' + t('personalization.wallpaperHint') + '</div>';
  });
}

function renderPersTheme(el) {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

  el.innerHTML =
    '<div class="pers-section">' +
      '<h3>' + t('personalization.theme') + '</h3>' +
      '<div class="pers-options">' +
        '<button class="pers-option' + (currentTheme === 'dark' ? ' is-active' : '') + '" data-theme="dark">' +
          '<span class="app-icon__svg" data-svg="moon"></span>' +
          '<span>' + t('personalization.themeDark') + '</span>' +
        '</button>' +
        '<button class="pers-option' + (currentTheme === 'light' ? ' is-active' : '') + '" data-theme="light">' +
          '<span class="app-icon__svg" data-svg="sun"></span>' +
          '<span>' + t('personalization.themeLight') + '</span>' +
        '</button>' +
      '</div>' +
    '</div>';

  renderIcons(el);

  el.querySelectorAll('[data-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof applyTheme === 'function') applyTheme(btn.dataset.theme);
      el.querySelectorAll('.pers-option').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
}

function renderPersLanguage(el) {
  const currentLang = document.documentElement.lang || 'en';

  el.innerHTML =
    '<div class="pers-section">' +
      '<h3>' + t('personalization.language') + '</h3>' +
      '<div class="pers-options">' +
        '<button class="pers-option' + (currentLang === 'en' ? ' is-active' : '') + '" data-lang="en"><span>English</span></button>' +
        '<button class="pers-option' + (currentLang === 'ru' ? ' is-active' : '') + '" data-lang="ru"><span>Русский</span></button>' +
      '</div>' +
    '</div>';

  el.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof applyLang === 'function') applyLang(btn.dataset.lang);
      el.querySelectorAll('.pers-option').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
}

function renderPersDesktop(el) {
  let currentSize = 'medium';
  try { currentSize = localStorage.getItem('icon_size') || 'medium'; } catch (e) {}

  el.innerHTML =
    '<div class="pers-section">' +
      '<h3>' + t('personalization.desktop') + '</h3>' +
      '<div class="pers-label">' + t('personalization.iconSize') + '</div>' +
      '<div class="pers-options">' +
        '<button class="pers-option' + (currentSize === 'small' ? ' is-active' : '') + '" data-size="small">' + t('personalization.iconSmall') + '</button>' +
        '<button class="pers-option' + (currentSize === 'medium' ? ' is-active' : '') + '" data-size="medium">' + t('personalization.iconMedium') + '</button>' +
        '<button class="pers-option' + (currentSize === 'large' ? ' is-active' : '') + '" data-size="large">' + t('personalization.iconLarge') + '</button>' +
      '</div>' +
    '</div>';

  el.querySelectorAll('[data-size]').forEach(btn => {
    btn.addEventListener('click', () => {
      const size = btn.dataset.size;
      if (typeof setIconSize === 'function') setIconSize(size);
      el.querySelectorAll('.pers-option').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      if (typeof toast === 'function') toast(t('toast.iconSizeChanged'));
    });
  });
}

function renderPersAchievements(el) {
  const posKey = 'achievement_position';
  let currentPos = 'top-left';
  try { currentPos = localStorage.getItem(posKey) || 'top-left'; } catch (e) {}

  const positions = [
    { id: 'top-left',      label: 'personalization.achievementTopLeft' },
    { id: 'top-right',     label: 'personalization.achievementTopRight' },
    { id: 'bottom-left',   label: 'personalization.achievementBottomLeft' },
    { id: 'bottom-right',  label: 'personalization.achievementBottomRight' }
  ];

  el.innerHTML =
    '<div class="pers-section">' +
      '<h3>' + t('personalization.achievements') + '</h3>' +
      '<div class="pers-label">' + t('personalization.achievementPosition') + '</div>' +
      '<div class="pers-options pers-options--grid">' +
        positions.map(p =>
          '<button class="pers-option' + (currentPos === p.id ? ' is-active' : '') + '" data-pos="' + p.id + '"><span>' + t(p.label) + '</span></button>'
        ).join('') +
      '</div>' +
    '</div>';

  el.querySelectorAll('[data-pos]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pos = btn.dataset.pos;
      try { localStorage.setItem(posKey, pos); } catch (e) {}
      el.querySelectorAll('.pers-option').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
}

function renderPersReset(el) {
  el.innerHTML =
    '<div class="pers-section">' +
      '<h3>' + t('personalization.reset') + '</h3>' +
      '<div class="pers-actions pers-actions--column">' +
        '<button class="pill pill--ghost" data-reset="profile">' + t('personalization.resetProfile') + '</button>' +
        '<button class="pill pill--ghost" data-reset="wallpaper">' + t('personalization.resetWallpaper') + '</button>' +
        '<button class="pill pill--ghost" data-reset="desktop">' + t('personalization.resetDesktop') + '</button>' +
        '<button class="pill pill--ghost" data-reset="shortcuts">' + t('personalization.resetShortcuts') + '</button>' +
        '<button class="pill pill--danger" data-reset="all">' + t('personalization.resetAll') + '</button>' +
      '</div>' +
    '</div>';

  el.querySelectorAll('[data-reset]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const type = btn.dataset.reset;
      const confirmMsg = type === 'all' ? t('personalization.resetAll') + '?' : t('modal.confirm') + '?';
      const ok = await showConfirm(confirmMsg);
      if (!ok) return;

      if (type === 'profile' && typeof resetProfile === 'function') {
        resetProfile();
        toast(t('toast.profileReset'));
      } else if (type === 'wallpaper' && typeof resetWallpaper === 'function') {
        resetWallpaper();
      } else if (type === 'desktop' && typeof resetDesktop === 'function') {
        resetDesktop();
      } else if (type === 'shortcuts' && typeof clearShortcuts === 'function') {
        clearShortcuts();
        toast(t('toast.shortcutsReset'));
      } else if (type === 'all') {
        if (typeof resetAll === 'function') resetAll();
      }
    });
  });
}

function renderPersExportImport(el) {
  el.innerHTML =
    '<div class="pers-section">' +
      '<h3>' + t('personalization.exportImport') + '</h3>' +
      '<div class="pers-actions pers-actions--column">' +
        '<button class="pill" id="pers-export">' + t('personalization.export') + '</button>' +
        '<button class="pill pill--ghost" id="pers-import">' + t('personalization.import') + '</button>' +
        '<input type="file" id="pers-import-file" accept="application/json" hidden />' +
      '</div>' +
    '</div>';

  const exportBtn = el.querySelector('#pers-export');
  const importBtn = el.querySelector('#pers-import');
  const importFile = el.querySelector('#pers-import-file');

  exportBtn.addEventListener('click', () => {
    const keys = ['username', 'avatar', 'wallpaper', 'theme', 'lang', 'desktop_positions', 'custom_shortcuts', 'starred_repo', 'achievement_position', 'achievements_unlocked', 'icon_size', 'clicker_count'];
    const data = { version: 1, date: new Date().toISOString() };
    keys.forEach(k => {
      try {
        const v = localStorage.getItem(k);
        if (v !== null) data[k] = v;
      } catch (e) {}
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lucovisa-settings-' + Date.now() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast(t('personalization.exported'));
  });

  importBtn.addEventListener('click', () => importFile.click());

  importFile.addEventListener('change', e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        Object.keys(data).forEach(k => {
          if (k === 'version' || k === 'date') return;
          try { localStorage.setItem(k, data[k]); } catch (err) {}
        });
        toast(t('personalization.imported'));
        setTimeout(() => location.reload(), 800);
      } catch (err) {
        toast(t('personalization.importFailed'));
      }
    };
    reader.readAsText(file);
    importFile.value = '';
  });
}

function renderAchievements(body) {
  const list = (typeof getAchievements === 'function') ? getAchievements() : [];
  const total = list.length;
  const unlocked = list.filter(a => a.unlocked).length;
  const percent = total > 0 ? Math.round((unlocked / total) * 100) : 0;

  let html =
    '<div class="achievements-app">' +
      '<div class="achievements-app__header">' +
        '<span class="app-icon__svg achievements-app__icon" data-svg="trophy"></span>' +
        '<div class="achievements-app__info">' +
          '<h2>' + t('achievements.title') + '</h2>' +
          '<p>' + t('achievements.progress') + ': ' + unlocked + ' / ' + total + ' (' + percent + '%)</p>' +
        '</div>' +
      '</div>' +
      '<div class="achievements-app__bar"><div class="achievements-app__bar-fill" style="width: ' + percent + '%"></div></div>' +
      '<div class="achievements-app__list">';

  list.forEach(a => {
    const isHiddenLocked = a.hidden && !a.unlocked;
    const title = isHiddenLocked ? '???' : t(a.titleKey);
    const desc = isHiddenLocked ? t('achievements.hidden') : t(a.descKey);
    const comment = (!isHiddenLocked && t(a.commentKey)) ? t(a.commentKey) : '';
    const iconKey = a.icon || 'trophy';

    html +=
      '<div class="ach-item' + (a.unlocked ? ' is-unlocked' : ' is-locked') + (isHiddenLocked ? ' is-hidden' : '') + '">' +
        '<div class="ach-item__icon" data-svg="' + iconKey + '"></div>' +
        '<div class="ach-item__body">' +
          '<div class="ach-item__title">' + title + '</div>' +
          '<div class="ach-item__desc">' + desc + '</div>' +
          (comment ? '<div class="ach-item__comment">' + comment + '</div>' : '') +
        '</div>' +
        '<div class="ach-item__status">' + (a.unlocked ? t('achievements.unlocked') : t('achievements.locked')) + '</div>' +
      '</div>';
  });

  html += '</div></div>';

  body.innerHTML = html;
  renderIcons(body);
}

function renderCalendar(body) {
  const now = new Date();
  let viewYear = now.getFullYear();
  let viewMonth = now.getMonth();
  let selectedDay = now.getDate();
  let selectedMonth = now.getMonth();
  let selectedYear = now.getFullYear();

  const months = t('calendar.months');
  const days = t('calendar.days');

  function getEventsForDate(y, m, d) {
    const result = [];
    if (typeof WORK_EVENTS === 'undefined') return result;
    WORK_EVENTS.forEach(ev => {
      const [ey, em, ed] = ev.date.split('-').map(n => parseInt(n, 10));
      if (ey === y && em - 1 === m && ed === d) result.push(ev);
    });
    return result;
  }

  function renderInfo() {
    const infoEl = body.querySelector('#cal-info');
    if (!infoEl) return;

    const events = getEventsForDate(selectedYear, selectedMonth, selectedDay);
    const target = new Date(selectedYear, selectedMonth, selectedDay);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.round((target - today) / (1000 * 60 * 60 * 24));

    let html = '<div class="cal-info__date">' + selectedDay + ' ' + months[selectedMonth] + ' ' + selectedYear + '</div>';

    if (diff === 0) html += '<div class="cal-info__diff">' + t('calendar.today') + '</div>';
    else if (diff > 0) html += '<div class="cal-info__diff">' + t('calendar.daysUntil') + ': ' + diff + '</div>';
    else html += '<div class="cal-info__diff">' + t('calendar.daysPassed') + ': ' + Math.abs(diff) + '</div>';

    if (events.length > 0) {
      events.forEach(ev => {
        html += '<div class="cal-info__event">' +
          '<div>' + t(ev.key) + '</div>' +
          (ev.url ? '<a href="' + ev.url + '" target="_blank" rel="noopener">' + ev.url + '</a>' : '') +
        '</div>';
      });
    } else {
      html += '<div class="cal-info__empty">' + t('calendar.noEvent') + '</div>';
    }

    infoEl.innerHTML = html;
  }

  function render() {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    let startWeekday = firstDay.getDay();
    startWeekday = (startWeekday + 6) % 7;

    let grid = '';
    for (let i = 0; i < startWeekday; i++) {
      grid += '<div class="cal-day cal-day--empty"></div>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = (d === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear());
      const isSelected = (d === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear);
      const hasEvent = getEventsForDate(viewYear, viewMonth, d).length > 0;
      grid += '<div class="cal-day' +
        (isToday ? ' cal-day--today' : '') +
        (isSelected && !isToday ? ' is-selected' : '') +
        (hasEvent ? ' cal-day--event' : '') +
        '" data-day="' + d + '">' + d + '</div>';
    }

    body.innerHTML =
      '<div class="cal-app">' +
        '<div class="cal-app__header">' +
          '<button class="cal-nav" id="cal-prev">‹</button>' +
          '<div class="cal-title">' + months[viewMonth] + ' ' + viewYear + '</div>' +
          '<button class="cal-nav" id="cal-next">›</button>' +
        '</div>' +
        '<div class="cal-weekdays">' +
          days.map(d => '<div class="cal-weekday">' + d + '</div>').join('') +
        '</div>' +
        '<div class="cal-grid">' + grid + '</div>' +
        '<div class="cal-info" id="cal-info"></div>' +
        '<div class="cal-footer">' +
          '<button class="pill pill--ghost" id="cal-today">' + t('calendar.today') + '</button>' +
        '</div>' +
      '</div>';

    body.querySelector('#cal-prev').addEventListener('click', () => {
      viewMonth--;
      if (viewMonth < 0) { viewMonth = 11; viewYear--; }
      render();
    });
    body.querySelector('#cal-next').addEventListener('click', () => {
      viewMonth++;
      if (viewMonth > 11) { viewMonth = 0; viewYear++; }
      render();
    });
    body.querySelector('#cal-today').addEventListener('click', () => {
      viewYear = now.getFullYear();
      viewMonth = now.getMonth();
      selectedDay = now.getDate();
      selectedMonth = now.getMonth();
      selectedYear = now.getFullYear();
      render();
    });

    body.querySelectorAll('.cal-day[data-day]').forEach(cell => {
      cell.addEventListener('click', () => {
        selectedDay = parseInt(cell.dataset.day);
        selectedMonth = viewMonth;
        selectedYear = viewYear;
        render();
      });
    });

    renderInfo();
  }

  render();
}

function renderWork(body) {
  const l = lang();
  let activeTab = 'timeline';

  const TECH_STACK = [
    { name: 'JavaScript', icon: 'js' },
    { name: 'C++', icon: 'cpp' },
    { name: 'C#', icon: 'csharp' },
    { name: 'Python', icon: 'python' },
    { name: 'C', icon: 'c' },
    { name: 'gdscript', icon: 'gdscript' },
    { name: 'Git', icon: 'git' },
    { name: 'HTML', icon: 'html' },
    { name: 'CSS', icon: 'css' },
    { name: 'SEO', icon: 'seo' }
  ];

  function renderTabs() {
    let html = '<div class="work-tabs">';
    ['timeline', 'tech', 'reviews'].forEach(key => {
      const label = key === 'timeline' ? 'work.tabTimeline' : key === 'tech' ? 'work.tabTech' : 'work.tabReviews';
      html += '<button class="work-tab' + (activeTab === key ? ' is-active' : '') + '" data-tab="' + key + '">' + t(label) + '</button>';
    });
    html += '</div>';

    html += '<div class="work-panel' + (activeTab === 'timeline' ? ' is-active' : '') + '" data-panel="timeline">';
    html += renderWorkTimeline();
    html += '</div>';

    html += '<div class="work-panel' + (activeTab === 'tech' ? ' is-active' : '') + '" data-panel="tech">';
    html += '<div class="work-tech__grid">';
    TECH_STACK.forEach(tech => {
      html += '<div class="work-tech__card">' +
        '<span class="app-icon__svg work-tech__icon" data-svg="' + tech.icon + '"></span>' +
        '<span class="work-tech__name">' + tech.name + '</span>' +
      '</div>';
    });
    html += '</div>';
    html += '</div>';

    html += '<div class="work-panel' + (activeTab === 'reviews' ? ' is-active' : '') + '" data-panel="reviews">';
    html += '<p class="work-reviews__empty">' + t('work.reviewsEmpty') + '</p>';
    html += '</div>';

    return html;
  }

  function renderWorkTimeline() {
    let html = '<div class="work-timeline">';
    const sorted = (typeof WORK_EVENTS !== 'undefined' ? WORK_EVENTS : []).slice().sort((a, b) => b.date.localeCompare(a.date));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    sorted.forEach(ev => {
      const [y, m, d] = ev.date.split('-').map(n => parseInt(n, 10));
      const evDate = new Date(y, m - 1, d);
      const diffDays = Math.round((today - evDate) / (1000 * 60 * 60 * 24));

      let relText = '';
      if (diffDays === 0) relText = l === 'ru' ? 'сегодня' : 'today';
      else if (diffDays > 0) relText = (l === 'ru' ? 'прошло ' : '') + diffDays + (l === 'ru' ? ' дн.' : ' days ago');
      else relText = (l === 'ru' ? 'через ' : 'in ') + Math.abs(diffDays) + (l === 'ru' ? ' дн.' : ' days');

      html +=
        '<div class="work-item">' +
          '<div class="work-item__dot"></div>' +
          '<div class="work-item__body">' +
            '<div class="work-item__date">' + d + '.' + String(m).padStart(2, '0') + '.' + y + ' · ' + relText + '</div>' +
            '<div class="work-item__title">' + t(ev.key) + '</div>' +
            (ev.url ? '<a class="work-item__link" href="' + ev.url + '" target="_blank" rel="noopener">' + ev.url + '</a>' : '') +
          '</div>' +
        '</div>';
    });

    html += '</div>';
    return html;
  }

  function updateView() {
    body.innerHTML =
      '<div class="work-app">' +
        '<div class="work-app__header">' +
          '<span class="app-icon__svg work-app__icon" data-svg="briefcase"></span>' +
          '<div>' +
            '<h2>' + t('work.title') + '</h2>' +
            '<p>' + (typeof WORK_EVENTS !== 'undefined' ? WORK_EVENTS.length : 0) + ' ' + (l === 'ru' ? 'событий' : 'events') + '</p>' +
          '</div>' +
        '</div>' +
        renderTabs() +
      '</div>';

    renderIcons(body);

    body.querySelectorAll('.work-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        updateView();
      });
    });
  }

  updateView();
}

function projectCard(p, opts) {
  opts = opts || {};
  const l = lang();
  const el = document.createElement('div');
  el.className = 'pyramid__card' + (p.gold ? ' pyramid__card--gold' : '');
  if (p.isSelf) el.classList.add('pyramid__card--self');

  let actionsHtml = '';
  if (p.github) actionsHtml += '<a class="pill pill--ghost card-action" href="' + p.github + '" target="_blank" rel="noopener">' + t('portfolio.github') + '</a>';
  if (p.site) actionsHtml += '<button type="button" class="pill card-action card-action--site" data-self="' + (p.isSelf ? '1' : '0') + '">' + t('portfolio.site') + '</button>';

  el.innerHTML =
    '<h3 class="card-title">' + p.title + '</h3>' +
    '<p>' + (p.desc[l] || p.desc.en) + '</p>' +
    (actionsHtml ? '<div class="pyramid__actions">' + actionsHtml + '</div>' : '');

  const siteBtn = el.querySelector('.card-action--site');
  if (siteBtn) {
    siteBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if (p.isSelf) {
        toast(t('joke.2'));
      } else {
        window.open(p.site, '_blank', 'noopener');
      }
    });
  }

  el.addEventListener('click', e => {
    if (e.target.closest('.card-action')) return;

    if (e.target.closest('.card-title') && p.site && !p.isSelf) {
      window.open(p.site, '_blank', 'noopener');
      return;
    }

    if (p.isSelf) {
      handleSelfClick(el);
      return;
    }

    showProjectInfo(p);
  });

  return el;
}

let selfClickCount = 0;

function handleSelfClick(el) {
  selfClickCount++;
  if (selfClickCount >= 24) {
    toast(t('joke.24'));
    if (typeof unlockAchievement === 'function') unlockAchievement('secret');
    selfClickCount = 0;
    return;
  }
  const idx = (selfClickCount - 1) % JOKES.length;
  toast(t(JOKES[idx]));
}

function showProjectInfo(p) {
  const l = lang();
  let html = '<div class="project-info">' +
    '<h3>' + p.title + '</h3>' +
    '<p>' + ((p.details && (p.details[l] || p.details.en)) || (p.desc[l] || p.desc.en)) + '</p>' +
    '<div class="project-info__actions">' +
      (p.github ? '<a class="pill pill--ghost" href="' + p.github + '" target="_blank" rel="noopener">' + t('portfolio.github') + '</a>' : '') +
      (p.site && !p.isSelf ? '<a class="pill" href="' + p.site + '" target="_blank" rel="noopener">' + t('portfolio.site') + '</a>' : '') +
    '</div>' +
  '</div>';

  showHtml(html, p.title);
}

function renderPortfolio(body) {
  body.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'pyramid-wrap';

  const inner = document.createElement('div');
  inner.className = 'pyramid';

  const t1 = document.createElement('div');
  t1.className = 'pyramid__tier pyramid__tier--1';
  t1.appendChild(projectCard(PROJECTS[0]));
  t1.appendChild(projectCard(CAT_DIGGER));

  const t2 = document.createElement('div');
  t2.className = 'pyramid__tier pyramid__tier--2';
  t2.appendChild(projectCard(LUC_VISA));

  const t3 = document.createElement('div');
  t3.className = 'pyramid__tier pyramid__tier--3';
  t3.appendChild(projectCard(PROJECTS[1]));
  t3.appendChild(projectCard(PROJECTS[2]));
  t3.appendChild(projectCard(PROJECTS[3]));

  const t4 = document.createElement('div');
  t4.className = 'pyramid__tier pyramid__tier--4';
  t4.appendChild(projectCard(PROJECTS[4]));

  inner.appendChild(t1);
  inner.appendChild(t2);
  inner.appendChild(t3);
  inner.appendChild(t4);

  wrap.appendChild(inner);
  body.appendChild(wrap);
}

function renderAbout(body) {
  body.innerHTML =
    '<div class="app-about">' +
      '<h2>' + t('about.title') + '</h2>' +
      '<p>' + t('about.text1') + '</p>' +
      '<p><strong>' + t('about.experience') + ':</strong> ' + t('about.experienceValue') + '</p>' +
      '<p><strong>' + t('about.timezone') + ':</strong> ' + t('about.timezoneValue') + '</p>' +
      '<p><strong>' + t('about.level') + ':</strong> ' + t('about.levelValue') + '</p>' +
      '<p><strong>' + t('about.native') + ':</strong> ' + t('about.nativeValue') + '<br>' +
         '<strong>' + t('about.also') + ':</strong> ' + t('about.alsoValue') + '</p>' +
      '<h3>' + t('about.skills') + '</h3>' +
      '<ul>' +
        '<li>JavaScript</li><li>C++</li><li>C#</li><li>Python</li><li>C</li>' +
      '</ul>' +
      '<p><strong>' + t('about.mainFocus') + ':</strong> ' + t('about.mainFocusValue') + '</p>' +
      '<p><strong>' + t('about.learning') + ':</strong> ' + t('about.learningValue') + '</p>' +
      '<h3>' + t('about.projects') + '</h3>' +
      '<p>' + t('about.projectsText') +
        '<a href="https://lucovisa.github.io/Lucovisa/" target="_blank" rel="noopener">lucovisa.github.io/Lucovisa</a>' +
      '</p>' +
      '<p>' + t('about.seePortfolio') + '</p>' +
      '<button class="pill app-about__contact" id="about-contact">' +
        '<span class="app-icon__svg app-icon__svg--sm" data-svg="mail2"></span>' +
        '<span>' + t('about.contact') + '</span>' +
      '</button>' +
    '</div>';

  renderIcons(body);

  const contactBtn = body.querySelector('#about-contact');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      if (typeof openApp === 'function') openApp('contact');
    });
  }
}

function renderMap(body) {
  body.innerHTML =
    '<div class="map-app">' +
      '<h2 class="map-app__title">' + t('map.title') + '</h2>' +
      '<div class="map-canvas" id="map-canvas"></div>' +
      '<p class="map-app__hint">' + t('map.hint') + '</p>' +
    '</div>';

  const canvas = body.querySelector('#map-canvas');
  buildMapGraph(canvas);
}

function buildMapGraph(container) {
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const nodes = [
    { id: 'vis',    label: 'Lucovisa',      x: 400, y: 250, w: 170, h: 50, color: 'gold',   center: true },
    { id: 'conv',   label: 'LucConverter',  x: 400, y: 80,  w: 170, h: 44, color: 'site' },
    { id: 'sql',    label: 'SQL-in-image',  x: 150, y: 160, w: 160, h: 44, color: 'site' },
    { id: 'cursor', label: 'LucCursor',     x: 650, y: 160, w: 150, h: 44, color: 'site' },
    { id: 'font',   label: 'LucFont',       x: 150, y: 340, w: 150, h: 44, color: 'site' },
    { id: 'cat',    label: 'Cat Digger',    x: 650, y: 340, w: 150, h: 44, color: 'game' },
    { id: 'ip',     label: 'IP-check',      x: 400, y: 420, w: 150, h: 44, color: 'ip' }
  ];

  const edges = [
    { from: 'vis', to: 'conv' },
    { from: 'vis', to: 'sql' },
    { from: 'vis', to: 'cursor' },
    { from: 'vis', to: 'font' },
    { from: 'vis', to: 'cat' },
    { from: 'vis', to: 'ip' },
    { from: 'conv', to: 'sql' },
    { from: 'conv', to: 'cursor' },
    { from: 'conv', to: 'font' },
    { from: 'cat', to: 'cursor' },
    { from: 'cat', to: 'font' }
  ];

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', '0 0 800 500');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.classList.add('map-svg');

  const gEdges = document.createElementNS(SVG_NS, 'g');
  const gNodes = document.createElementNS(SVG_NS, 'g');
  svg.appendChild(gEdges);
  svg.appendChild(gNodes);

  const edgeEls = edges.map(() => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('class', 'map-edge');
    path.setAttribute('fill', 'none');
    gEdges.appendChild(path);
    return path;
  });

  nodes.forEach(n => {
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'map-node-g map-node-g--' + n.color + (n.center ? ' map-node-g--center' : ''));
    g.setAttribute('transform', 'translate(' + (n.x - n.w / 2) + ',' + (n.y - n.h / 2) + ')');

    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('class', 'map-node-rect map-node-rect--' + n.color);
    rect.setAttribute('width', n.w);
    rect.setAttribute('height', n.h);
    rect.setAttribute('rx', '8');

    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttribute('class', 'map-node-text');
    text.setAttribute('x', n.w / 2);
    text.setAttribute('y', n.h / 2 + 5);
    text.setAttribute('text-anchor', 'middle');
    text.textContent = n.label;

    g.appendChild(rect);
    g.appendChild(text);

    gNodes.appendChild(g);

    makeNodeDraggable(g, n, nodes);
  });

  function redrawEdges() {
    edges.forEach((e, i) => {
      const a = nodes.find(n => n.id === e.from);
      const b = nodes.find(n => n.id === e.to);
      if (!a || !b) return;
      const d = 'M ' + a.x + ' ' + a.y + ' L ' + b.x + ' ' + b.y;
      edgeEls[i].setAttribute('d', d);
    });
  }

  window._mapRedraw = redrawEdges;

  container.appendChild(svg);
  redrawEdges();
}

function makeNodeDraggable(g, node, allNodes) {
  let startX = 0, startY = 0, origX = 0, origY = 0, dragging = false;

  g.addEventListener('pointerdown', e => {
    e.preventDefault();
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    origX = node.x;
    origY = node.y;
    g.setPointerCapture(e.pointerId);
    g.classList.add('is-dragging');
  });

  g.addEventListener('pointermove', e => {
    if (!dragging) return;
    const svg = g.ownerSVGElement;
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const scaleX = vb.width / rect.width;
    const scaleY = vb.height / rect.height;
    const dx = (e.clientX - startX) * scaleX;
    const dy = (e.clientY - startY) * scaleY;

    node.x = Math.max(node.w / 2 + 4, Math.min(800 - node.w / 2 - 4, origX + dx));
    node.y = Math.max(node.h / 2 + 4, Math.min(500 - node.h / 2 - 4, origY + dy));

    g.setAttribute('transform', 'translate(' + (node.x - node.w / 2) + ',' + (node.y - node.h / 2) + ')');
    if (window._mapRedraw) window._mapRedraw();
  });

  g.addEventListener('pointerup', e => {
    dragging = false;
    g.classList.remove('is-dragging');
    try { g.releasePointerCapture(e.pointerId); } catch (err) {}
  });

  g.addEventListener('pointercancel', () => {
    dragging = false;
    g.classList.remove('is-dragging');
  });
}

function renderContact(body) {
  const wrap = document.createElement('div');
  wrap.className = 'app-contact';

  CONTACTS.forEach(c => {
    const row = document.createElement('div');
    row.className = 'contact-row';
    row.innerHTML =
      '<div class="contact-row__info">' +
        '<div class="contact-row__label">' + t(c.label) + '</div>' +
        '<div class="contact-row__value">' + c.value + '</div>' +
      '</div>' +
      '<div class="contact-row__actions">' +
        '<a class="pill pill--ghost" href="' + c.url + '" target="_blank" rel="noopener">' + t('contact.open') + '</a>' +
        '<button class="pill" data-copy="' + c.value + '">' + t('contact.copy') + '</button>' +
      '</div>';
    wrap.appendChild(row);
  });

  wrap.addEventListener('click', e => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    copyText(btn.dataset.copy, btn, t('contact.copied'));
  });

  body.innerHTML = '';
  body.appendChild(wrap);
}

function renderDonate(body) {
  const wrap = document.createElement('div');
  wrap.className = 'app-donate';

  const hero = document.createElement('div');
  hero.className = 'app-donate__hero';
  hero.innerHTML = '<div class="app-donate__heart"></div><p>' + t('donate.subtitle') + '</p>';
  wrap.appendChild(hero);

  DONATE_WALLETS.forEach(w => {
    const row = document.createElement('div');
    row.className = 'contact-row';
    row.innerHTML =
      '<div class="contact-row__info">' +
        '<div class="contact-row__label">' + w.label + '</div>' +
        '<div class="contact-row__value">' + w.value + '</div>' +
      '</div>' +
      '<div class="contact-row__actions">' +
        '<button class="pill" data-copy="' + w.value + '">' + t('donate.copy') + '</button>' +
      '</div>';
    wrap.appendChild(row);
  });

  wrap.addEventListener('click', e => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    copyText(btn.dataset.copy, btn, t('donate.copied'));
  });

  body.innerHTML = '';
  body.appendChild(wrap);

  const heartEl = wrap.querySelector('.app-donate__heart');
  if (heartEl) heartEl.innerHTML = ICONS.heart;

  if (typeof unlockAchievement === 'function') unlockAchievement('donate');
}

function renderComments(body) {
  const STARRED_KEY = 'starred_repo';
  let starred = false;
  try { starred = localStorage.getItem(STARRED_KEY) === '1'; } catch (e) {}

  body.innerHTML =
    '<div class="comments__star' + (starred ? ' is-starred' : '') + '" id="comments-star">' +
      '<div class="comments__star-icon"></div>' +
      '<div class="comments__star-text">' +
        '<strong>' + t('comments.starTitle') + '</strong>' +
        '<span>' + t('comments.starText') + '</span>' +
      '</div>' +
      '<a class="pill" id="comments-star-btn" href="https://github.com/lucovisa/Lucovisa" target="_blank" rel="noopener"></a>' +
    '</div>' +
    '<div class="comments__auth" id="comments-auth">' +
      '<button class="pill" id="comments-login">' + t('comments.login') + '</button>' +
      '<a class="pill pill--ghost" href="https://github.com/signup" target="_blank" rel="noopener">' + t('comments.create') + '</a>' +
      '<p class="comments__hint">' + t('comments.hint') + '</p>' +
    '</div>' +
    '<div class="giscus" id="giscus-container"></div>';

  const starIconEl = body.querySelector('.comments__star-icon');
  if (starIconEl) starIconEl.innerHTML = starred ? ICONS.star : ICONS.starOutline;

  const starBtn = body.querySelector('#comments-star-btn');
  if (starBtn) starBtn.textContent = starred ? t('comments.starred') : t('comments.star');

  if (!starred) {
    if (starBtn) starBtn.addEventListener('click', () => {
      try { localStorage.setItem(STARRED_KEY, '1'); } catch (e) {}
      const wrap = body.querySelector('#comments-star');
      if (wrap) wrap.classList.add('is-starred');
      if (starIconEl) starIconEl.innerHTML = ICONS.star;
      if (starBtn) starBtn.textContent = t('comments.starred');
    });
  } else {
    if (starBtn) starBtn.style.pointerEvents = 'none';
  }

  const btn = body.querySelector('#comments-login');
  if (btn) btn.addEventListener('click', () => loadGiscusIn(body));
}

function renderHacker(body) {
  body.innerHTML = '<div class="terminal" id="terminal" tabindex="0"></div>';
  const term = body.querySelector('#terminal');
  let busy = false;
  let currentInput = null;
  let history = [];
  let historyIndex = -1;

  const COMMANDS = ['help', 'clear', 'matrix', 'cat', 'whoami', 'ls', 'theme', 'lang', 'reset', 'restart', 'exit'];

  const printLine = (text, cls) => {
    const line = document.createElement('div');
    line.className = 'terminal__line' + (cls ? ' ' + cls : '');
    line.textContent = text;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
  };

  const printInput = () => {
    const line = document.createElement('div');
    line.className = 'terminal__line terminal__line--input';
    line.innerHTML = '<span class="terminal__prompt">npm  $</span>';
    const input = document.createElement('input');
    input.className = 'terminal__input';
    input.type = 'text';
    input.autocomplete = 'off';
    line.appendChild(input);
    term.appendChild(line);
    input.focus();
    term.scrollTop = term.scrollHeight;
    currentInput = input;

    input.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const val = input.value.trim().toLowerCase();
        if (val === '') {
          printLine('');
          COMMANDS.forEach(c => printLine('  ' + c));
          printInput();
          input.remove();
          return;
        }
        const match = COMMANDS.filter(c => c.startsWith(val));
        if (match.length === 1) input.value = match[0] + ' ';
        else if (match.length > 1) {
          printLine('');
          match.forEach(c => printLine('  ' + c));
          printInput();
          input.remove();
        }
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length === 0) return;
        if (historyIndex === -1) historyIndex = history.length;
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex] || '';
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex === -1) return;
        historyIndex = Math.min(history.length, historyIndex + 1);
        input.value = history[historyIndex] || '';
        return;
      }
      if (e.key !== 'Enter') return;
      const cmd = input.value.trim();
      if (cmd) {
        history.push(cmd);
        if (history.length > 50) history.shift();
      }
      historyIndex = -1;
      input.disabled = true;
      line.querySelector('.terminal__prompt').textContent = 'npm  $ ' + cmd;
      input.remove();
      currentInput = null;
      handle(cmd);
    });
  };

  const runMatrix = () => {
    busy = true;
    term.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    canvas.width = 480;
    canvas.height = 320;
    term.appendChild(canvas);
    const hint = document.createElement('div');
    hint.className = 'game-hint';
    hint.textContent = t('hacker.matrixHint');
    term.appendChild(hint);

    const ctx = canvas.getContext('2d');
    const cols = Math.floor(canvas.width / 14);
    const drops = Array(cols).fill(1);
    const chars = '01';

    const onKey = e => {
      const k = e.key.toLowerCase();
      if (k === 'q' || k === 'й') {
        window.removeEventListener('keydown', onKey);
        clearInterval(loop);
        busy = false;
        currentInput = null;
        term.innerHTML = '';
        printLine(t('hacker.hint'), 'terminal__prompt');
        printInput();
      }
    };
    window.addEventListener('keydown', onKey);

    const loop = setInterval(() => {
      ctx.fillStyle = 'rgba(10, 15, 21, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#7CFC98';
      ctx.font = '14px monospace';
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 14, y * 14);
        if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 50);
  };

  const runCat = () => {
    busy = true;
    term.innerHTML = '';

    const stage = document.createElement('div');
    stage.className = 'cat-stage';
    term.appendChild(stage);

    const pre = document.createElement('pre');
    pre.className = 'ascii-cat';
    stage.appendChild(pre);

    const fish = document.createElement('div');
    fish.className = 'cat-fish';
    fish.textContent = '<><';
    stage.appendChild(fish);

    const hint = document.createElement('div');
    hint.className = 'game-hint';
    hint.textContent = t('hacker.catHint');
    term.appendChild(hint);

    const stageW = stage.clientWidth || 400;
    const catW = 100;
    const fishW = 50;
    const maxCatX = Math.max(0, stageW - catW - 10);
    const maxFishX = Math.max(0, stageW - fishW - 10);

    let catX = 20;
    let dir = 1;

    const framesRight = [
      [
        ' /\\_/\\  ',
        '( o.o ) ',
        ' > ω <  ',
        ' /   \\  '
      ],
      [
        ' /\\_/\\  ',
        '( o.o ) ',
        ' > ω <  ',
        '  / \\   '
      ]
    ];

    const framesLeft = [
      [
        '  /\\_/\\ ',
        ' ( o.o )',
        '  > ω < ',
        '  /   \\ '
      ],
      [
        '  /\\_/\\ ',
        ' ( o.o )',
        '  > ω < ',
        '   / \\  '
      ]
    ];

    let frameIdx = 0;
    const render = () => {
      const frames = dir === 1 ? framesRight : framesLeft;
      pre.textContent = frames[frameIdx].join('\n');
      frameIdx = (frameIdx + 1) % frames.length;

      catX += dir * 14;
      if (catX >= maxCatX) { catX = maxCatX; dir = -1; }
      if (catX <= 20) { catX = 20; dir = 1; }

      pre.style.left = catX + 'px';
      pre.style.top = '60px';

      const fishX = dir === 1 ? Math.min(maxFishX, catX + catW - 20) : Math.max(10, catX - 30);
      fish.style.left = fishX + 'px';
      fish.style.top = '120px';
      fish.textContent = dir === 1 ? '<><' : '><>';
    };
    render();

    const onKey = e => {
      const k = e.key.toLowerCase();
      if (k === 'q' || k === 'й') {
        window.removeEventListener('keydown', onKey);
        clearInterval(loop);
        busy = false;
        currentInput = null;
        term.innerHTML = '';
        printLine(t('hacker.hint'), 'terminal__prompt');
        printInput();
      }
    };
    window.addEventListener('keydown', onKey);

    const loop = setInterval(render, 380);
  };

  const handle = (cmd) => {
    if (busy) return;
    const c = cmd.toLowerCase().trim();

    if (c === '') { printInput(); return; }
    if (c === 'clear') { term.innerHTML = ''; printInput(); return; }

    if (c === 'help') {
      t('hacker.helpLines').forEach(l => printLine(l));
      printInput(); return;
    }

    if (c === 'whoami') {
      const name = (function () {
        try { return localStorage.getItem('username'); } catch (e) { return null; }
      })();
      const detected = name || (function () {
        const ua = navigator.userAgent;
        if (/Chrome/i.test(ua)) return 'Chrome User';
        if (/Firefox/i.test(ua)) return 'Firefox User';
        if (/Safari/i.test(ua)) return 'Safari User';
        return 'User';
      })();
      printLine(t('hacker.userIs') + detected);
      printInput(); return;
    }

    if (c === 'ls') {
      printLine(t('hacker.appsList'));
      Object.keys(APPS).forEach(id => {
        if (id.startsWith('details_')) return;
        printLine('  ' + id + '.exe');
      });
      printInput(); return;
    }

    if (c.startsWith('theme ')) {
      const theme = c.split(/\s+/)[1];
      if (theme === 'dark' || theme === 'light') {
        if (typeof applyTheme === 'function') applyTheme(theme);
        printLine(t('hacker.themeChanged') + theme);
      }
      printInput(); return;
    }

    if (c.startsWith('lang ')) {
      const lng = c.split(/\s+/)[1];
      if (lng === 'en' || lng === 'ru') {
        if (typeof applyLang === 'function') applyLang(lng);
        printLine(t('hacker.langChanged') + lng);
      }
      printInput(); return;
    }

    if (c === 'reset theme') {
      if (typeof resetWallpaper === 'function') {
        resetWallpaper();
        printLine(t('hacker.themeReset'));
      }
      printInput(); return;
    }

    if (c === 'reset desktop') {
      if (typeof resetDesktop === 'function') {
        resetDesktop();
        printLine(t('hacker.desktopReset'));
      }
      printInput(); return;
    }

    if (c === 'reset profile' || c === 'resetprofile' || c === 'reset') {
      if (typeof resetProfile === 'function') {
        resetProfile();
        printLine(t('hacker.profileReset'));
      }
      printInput(); return;
    }

    if (c === 'restart') {
      location.reload();
      return;
    }

    if (c.startsWith('exit')) {
      const parts = c.split(/\s+/);
      if (parts.length < 2) {
        printLine(t('hacker.usage'));
        printInput(); return;
      }
      const appId = parts[1];
      if (typeof closeWindowByApp === 'function' && APPS[appId]) {
        const ok = closeWindowByApp(appId);
        if (ok) printLine(t('hacker.exited') + appId);
        else printLine(t('hacker.exitNotFound') + appId);
      } else {
        printLine(t('hacker.exitNotFound') + appId);
      }
      printInput(); return;
    }

    if (c === 'matrix') { runMatrix(); return; }
    if (c === 'cat') { runCat(); return; }

    printLine(t('hacker.unknown') + cmd + t('hacker.tryHelp'));
    printInput();
  };

  term.addEventListener('click', () => {
    if (busy) return;
    if (currentInput && !currentInput.disabled) currentInput.focus();
    else printInput();
  });

  printLine(t('hacker.hint'), 'terminal__prompt');
  printInput();
  setTimeout(() => { if (currentInput) currentInput.focus(); }, 100);
}