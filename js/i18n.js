const I18N = {
  en: {
    "page.title": "Lucovisa Visit card",
    "page.description": "This is my visit card site for viewing my projects - frontend, game dev and web tools by Lucovisa.",
    "window.title": "Lucovisa Visit card",

    "hero.tag": "main",
    "hero.title": "LucConverter",
    "hero.text": "Files, units, currencies, links, media - all in one converter.",

    "catdigger": "Cat Digger",

    "converter.title": "LucConverter",
    "converter.text": "Convert anything",
    "sql.title": "SQL-in-image",
    "sql.text": "Hide code in pictures",
    "cursor.title": "LucCursor",
    "cursor.text": "Custom cursors",
    "font.title": "LucFont",
    "font.text": "Draw your own fonts",

    "profile.tag": "profile",
    "profile.title": "Lucovisa",
    "profile.text": "About the developer",

    "ip.title": "IP-check",
    "ip.text": "IP & speed test",

    "comments.title": "Comments",
    "comments.login": "Sign in with GitHub",
    "comments.hint": "GitHub account required. Be respectful - comments are moderated.",

    "footer.version": "v1.0.0"
  },
  ru: {
    "page.title": "Lucovisa - визитная карточка",
    "page.description": "Сайт-визитка Lucovisa: фронтенд, разработка игр и веб-инструменты.",
    "window.title": "Lucovisa - визитка",

    "hero.tag": "главный",
    "hero.title": "LucConverter",
    "hero.text": "Файлы, единицы, валюты, ссылки, медиа - всё в одном конвертере.",

    "catdigger": "Cat Digger",

    "converter.title": "LucConverter",
    "converter.text": "Конвертер всего",
    "sql.title": "SQL-in-image",
    "sql.text": "Прячем код в картинках",
    "cursor.title": "LucCursor",
    "cursor.text": "Свои курсоры",
    "font.title": "LucFont",
    "font.text": "Рисуй свои шрифты",

    "profile.tag": "профиль",
    "profile.title": "Lucovisa",
    "profile.text": "О разработчике",

    "ip.title": "IP-check",
    "ip.text": "Проверка IP и скорости",

    "comments.title": "Комментарии",
    "comments.login": "Войти через GitHub",
    "comments.hint": "Нужен GitHub-аккаунт. Будьте вежливы - комментарии модерируются.",

    "footer.version": "v1.0.0"
  }
};

function applyLang(lang) {
  if (!I18N[lang]) lang = 'en';

  document.documentElement.lang = lang;
  document.title = I18N[lang]["page.title"];

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && I18N[lang]["page.description"]) {
    metaDesc.setAttribute('content', I18N[lang]["page.description"]);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', I18N[lang]["page.title"]);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && I18N[lang]["page.description"]) {
    ogDesc.setAttribute('content', I18N[lang]["page.description"]);
  }

  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', lang === 'ru' ? 'ru_RU' : 'en_US');

  const ogLocaleAlt = document.querySelector('meta[property="og:locale:alternate"]');
  if (ogLocaleAlt) ogLocaleAlt.setAttribute('content', lang === 'ru' ? 'en_US' : 'ru_RU');

  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', I18N[lang]["page.title"]);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc && I18N[lang]["page.description"]) {
    twDesc.setAttribute('content', I18N[lang]["page.description"]);
  }

  const appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
  if (appleTitle) appleTitle.setAttribute('content', I18N[lang]["window.title"]);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = I18N[lang][key];
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    const value = I18N[lang][key];
    if (value !== undefined) el.innerHTML = value;
  });

  document.querySelectorAll('.lang-toggle [data-lang]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });

  try { localStorage.setItem('lang', lang); } catch (e) {}

  if (typeof updateGiscusLang === 'function') updateGiscusLang(lang);
}