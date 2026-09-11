const I18N = {
  en: {
    "page.title": "Lucovisa Visit card",
    "page.description": "This is my visit card site for viewing my projects - frontend, game dev and web tools by Lucovisa.",

    "taskbar.start": "Start",
    "taskbar.editName": "Click to change name",

    "app.portfolio": "Portfolio",
    "app.about": "About me",
    "app.hacker": "hacker.exe",
    "app.map": "Map",
    "app.contact": "Contact",
    "app.comments": "Comments",
    "app.donate": "Donate",

    "portfolio.github": "GitHub",
    "portfolio.site": "Site",
    "portfolio.seeMore": "See the Portfolio app for more details",

    "contact.x": "X (Twitter)",
    "contact.steam": "Steam",
    "contact.email": "Email",
    "contact.open": "Open",
    "contact.copy": "Copy",
    "contact.copied": "Copied!",

    "comments.login": "Sign in with GitHub",
    "comments.create": "Create GitHub account",
    "comments.hint": "GitHub account required. Be respectful - comments are moderated.",

    "about.title": "About me",
    "about.text1": "Developer focused on automation, web tools and game development.",
    "about.level": "Level",
    "about.levelValue": "Middle+",
    "about.native": "Native language",
    "about.nativeValue": "Russian",
    "about.also": "Also understand",
    "about.alsoValue": "English, French, German",
    "about.skills": "Skills",
    "about.mainFocus": "Main focus",
    "about.mainFocusValue": "automation and web tooling",
    "about.learning": "Learning",
    "about.learningValue": "self-taught",
    "about.projects": "Projects",
    "about.projectsText": "All current projects are listed at ",

    "map.title": "Project map",

    "hacker.helpHint": "type 'help' to see commands",
    "hacker.welcome": "Welcome to hacker.exe",
    "hacker.helpLines": [
      "Available commands:",
      "  help        - show this help",
      "  clear       - clear terminal",
      "  projects    - list all projects",
      "  about       - print about info",
      "  snake       - play Snake",
      "  tetris      - play Tetris",
      "  exit        - close this window"
    ],
    "hacker.projectsTitle": "Projects:",
    "hacker.unknown": "Unknown command: ",
    "hacker.snakeHint": "Arrows to move. Press Q to quit.",
    "hacker.tetrisHint": "Arrows to move, Up to rotate. Press Q to quit.",
    "hacker.gameOver": "Game over. Press Q to quit.",

    "donate.title": "Donate",
    "donate.subtitle": "Your donation helps keep my projects free and anonymous",
    "donate.copy": "Copy",
    "donate.copied": "Copied!",

    "name.ask": "Enter your name:"
  },
  ru: {
    "page.title": "Lucovisa - визитная карточка",
    "page.description": "Сайт-визитка Lucovisa: фронтенд, разработка игр и веб-инструменты.",

    "taskbar.start": "Пуск",
    "taskbar.editName": "Нажми, чтобы изменить имя",

    "app.portfolio": "Портфолио",
    "app.about": "Обо мне",
    "app.hacker": "hacker.exe",
    "app.map": "Карта",
    "app.contact": "Связь",
    "app.comments": "Комментарии",
    "app.donate": "Донат",

    "portfolio.github": "GitHub",
    "portfolio.site": "Сайт",
    "portfolio.seeMore": "Подробности в приложении Портфолио",

    "contact.x": "X (Twitter)",
    "contact.steam": "Steam",
    "contact.email": "Почта",
    "contact.open": "Открыть",
    "contact.copy": "Скопировать",
    "contact.copied": "Скопировано!",

    "comments.login": "Войти через GitHub",
    "comments.create": "Создать GitHub-аккаунт",
    "comments.hint": "Нужен GitHub-аккаунт. Будьте вежливы - комментарии модерируются.",

    "about.title": "Обо мне",
    "about.text1": "Разработчик, сфокусированный на автоматизации, веб-инструментах и разработке игр.",
    "about.level": "Уровень",
    "about.levelValue": "Middle+",
    "about.native": "Родной язык",
    "about.nativeValue": "Русский",
    "about.also": "Также понимаю",
    "about.alsoValue": "Английский, французский, немецкий",
    "about.skills": "Навыки",
    "about.mainFocus": "Основной фокус",
    "about.mainFocusValue": "автоматизация и веб-инструменты",
    "about.learning": "Обучение",
    "about.learningValue": "самоучка",
    "about.projects": "Проекты",
    "about.projectsText": "Все актуальные проекты указаны на ",

    "map.title": "Карта проектов",

    "hacker.helpHint": "введи 'help' чтобы увидеть команды",
    "hacker.welcome": "Добро пожаловать в hacker.exe",
    "hacker.helpLines": [
      "Доступные команды:",
      "  help        - показать справку",
      "  clear       - очистить терминал",
      "  projects    - список проектов",
      "  about       - информация обо мне",
      "  snake       - играть в Змейку",
      "  tetris      - играть в Тетрис",
      "  exit        - закрыть окно"
    ],
    "hacker.projectsTitle": "Проекты:",
    "hacker.unknown": "Неизвестная команда: ",
    "hacker.snakeHint": "Стрелки - движение. Q - выход.",
    "hacker.tetrisHint": "Стрелки - движение, Вверх - поворот. Q - выход.",
    "hacker.gameOver": "Игра окончена. Q - выход.",

    "donate.title": "Донат",
    "donate.subtitle": "Ваш донат помогает моим проектам оставаться бесплатными и анонимными",
    "donate.copy": "Скопировать",
    "donate.copied": "Скопировано!",

    "name.ask": "Введите ваше имя:"
  }
};

function t(key) {
  const lang = document.documentElement.lang || 'en';
  const dict = I18N[lang] || I18N.en;
  return dict[key] !== undefined ? dict[key] : (I18N.en[key] || key);
}

function applyLang(lang) {
  if (!I18N[lang]) lang = 'en';

  document.documentElement.lang = lang;
  document.title = I18N[lang]["page.title"];

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', I18N[lang]["page.description"]);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', I18N[lang]["page.title"]);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', I18N[lang]["page.description"]);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = I18N[lang][key];
    if (value !== undefined && typeof value === 'string') el.textContent = value;
  });

  document.querySelectorAll('.lang-toggle [data-lang]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });

  const editBtn = document.getElementById('edit-username');
  if (editBtn) editBtn.title = t('taskbar.editName');

  try { localStorage.setItem('lang', lang); } catch (e) {}

  if (typeof updateGiscusLang === 'function') updateGiscusLang(lang);
  if (typeof rerenderOpenWindows === 'function') rerenderOpenWindows();
}