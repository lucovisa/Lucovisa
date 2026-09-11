const PROJECTS = [
  {
    id: 'lucConverter',
    title: 'LucConverter',
    desc: { en: 'Files, units, currencies, links, media - all in one converter.', ru: 'Файлы, единицы, валюты, ссылки, медиа - всё в одном конвертере.' },
    github: 'https://github.com/lucovisa/LucConverter',
    site: 'https://lucovisa.github.io/LucConverter/'
  },
  {
    id: 'sqlInImage',
    title: 'SQL-in-image',
    desc: { en: 'Hide code in pictures and extract it back.', ru: 'Прячем код в картинках и извлекаем обратно.' },
    github: 'https://github.com/lucovisa/SQL-in-image',
    site: 'https://lucovisa.github.io/SQL-in-image/'
  },
  {
    id: 'lucCursor',
    title: 'LucCursor',
    desc: { en: 'Draw your own custom cursors.', ru: 'Рисуй свои кастомные курсоры.' },
    github: 'https://github.com/lucovisa/LucCursor',
    site: 'https://lucovisa.github.io/LucCursor/'
  },
  {
    id: 'lucFont',
    title: 'LucFont',
    desc: { en: 'Draw your own fonts, character by character.', ru: 'Рисуй свои шрифты, символ за символом.' },
    github: 'https://github.com/lucovisa/LucFont',
    site: 'https://lucovisa.github.io/LucFont/'
  },
  {
    id: 'ipCheck',
    title: 'IP-check',
    desc: { en: 'IP and connection speed checker.', ru: 'Проверка IP и скорости соединения.' },
    github: 'https://github.com/lucovisa/IP-check',
    site: 'https://lucovisa.github.io/IP-check/'
  }
];

const CAT_DIGGER = {
  title: 'Cat Digger',
  desc: { en: 'Game in pre-alpha development.', ru: 'Игра в стадии преальфа-разработки.' }
};

const LUC_VISA = {
  title: 'Lucovisa',
  desc: { en: 'About the developer.', ru: 'О разработчике.' },
  url: 'https://lucovisa.github.io/Lucovisa/'
};

const CONTACTS = [
  { id: 'x',     label: 'contact.x',     value: '@Lukovica467771',                url: 'https://x.com/Lukovica467771/' },
  { id: 'steam', label: 'contact.steam', value: 'steamcommunity.com/id/Lucovisa', url: 'https://steamcommunity.com/id/Lucovisa/' },
  { id: 'email', label: 'contact.email', value: 'lucovisa24@gmail.com',           url: 'mailto:lucovisa24@gmail.com' }
];

const DONATE_WALLETS = [
  { label: 'ETH/USDT (ERC-20)',             value: '0xFa78966938743C9168abFC2acD6D7751d7dA35Cf' },
  { label: 'BTC (Bitcoin mainnet)',         value: 'bc1q60tvcsw4guyhxa5e3n47eqmj0s3lpxzkxldpvp' },
  { label: 'TON/USDT (The Open Network)',   value: 'UQDsZ_8MkBtjjp-pVa5Fefdg1jtJApOZ7oeFF3WBlLnwQcHF' }
];

const APPS = {
  portfolio: { title: 'Portfolio', icon: 'folder',    width: 660, height: 560, render: renderPortfolio },
  about:     { title: 'About me',  icon: 'info',      width: 560, height: 520, render: renderAbout },
  hacker:    { title: 'hacker.exe',icon: 'terminal',  width: 660, height: 480, render: renderHacker },
  map:       { title: 'Map',       icon: 'web',       width: 660, height: 520, render: renderMap },
  contact:   { title: 'Contact',   icon: 'mail',      width: 560, height: 420, render: renderContact },
  comments:  { title: 'Comments',  icon: 'comment',   width: 700, height: 560, render: renderComments },
  donate:    { title: 'Donate',    icon: 'heart',     width: 560, height: 460, render: renderDonate }
};

function lang() { return document.documentElement.lang || 'en'; }

function renderPortfolio(body) {
  const l = lang();
  body.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'pyramid';

  const t1 = document.createElement('div');
  t1.className = 'pyramid__tier pyramid__tier--1';
  const cardConv = document.createElement('a');
  cardConv.className = 'pyramid__card';
  cardConv.href = PROJECTS[0].site;
  cardConv.target = '_blank';
  cardConv.rel = 'noopener';
  cardConv.innerHTML =
    '<h3>' + PROJECTS[0].title + '</h3>' +
    '<p>' + PROJECTS[0].desc[l] + '</p>' +
    '<div class="pyramid__actions">' +
      '<a class="pill pill--ghost" href="' + PROJECTS[0].github + '" target="_blank" rel="noopener">GitHub</a>' +
      '<a class="pill" href="' + PROJECTS[0].site + '" target="_blank" rel="noopener">Site</a>' +
    '</div>';
  cardConv.addEventListener('click', e => e.stopPropagation());
  t1.appendChild(cardConv);

  const t2 = document.createElement('div');
  t2.className = 'pyramid__tier pyramid__tier--2';
  const catCard = document.createElement('div');
  catCard.className = 'pyramid__card pyramid__card--plain';
  catCard.innerHTML =
    '<h3>' + CAT_DIGGER.title + '</h3>' +
    '<p>' + CAT_DIGGER.desc[l] + '</p>';
  t2.appendChild(catCard);

  const t3 = document.createElement('div');
  t3.className = 'pyramid__tier pyramid__tier--3';
  [PROJECTS[1], PROJECTS[2], PROJECTS[3]].forEach(p => {
    const card = document.createElement('div');
    card.className = 'pyramid__card';
    card.innerHTML =
      '<h4>' + p.title + '</h4>' +
      '<p>' + p.desc[l] + '</p>' +
      '<div class="pyramid__actions">' +
        '<a class="pill pill--ghost" href="' + p.github + '" target="_blank" rel="noopener">GitHub</a>' +
        '<a class="pill" href="' + p.site + '" target="_blank" rel="noopener">Site</a>' +
      '</div>';
    t3.appendChild(card);
  });

  const t4 = document.createElement('div');
  t4.className = 'pyramid__tier pyramid__tier--4';
  const visCard = document.createElement('a');
  visCard.className = 'pyramid__card pyramid__card--accent';
  visCard.href = LUC_VISA.url;
  visCard.target = '_blank';
  visCard.rel = 'noopener';
  visCard.innerHTML =
    '<h3>' + LUC_VISA.title + '</h3>' +
    '<p>' + LUC_VISA.desc[l] + '</p>';
  t4.appendChild(visCard);

  const t5 = document.createElement('div');
  t5.className = 'pyramid__tier pyramid__tier--5';
  const ipCard = document.createElement('div');
  ipCard.className = 'pyramid__card';
  ipCard.innerHTML =
    '<h4>' + PROJECTS[4].title + '</h4>' +
    '<p>' + PROJECTS[4].desc[l] + '</p>' +
    '<div class="pyramid__actions">' +
      '<a class="pill pill--ghost" href="' + PROJECTS[4].github + '" target="_blank" rel="noopener">GitHub</a>' +
      '<a class="pill" href="' + PROJECTS[4].site + '" target="_blank" rel="noopener">Site</a>' +
    '</div>';
  t5.appendChild(ipCard);

  wrap.appendChild(t1);
  wrap.appendChild(t2);
  wrap.appendChild(t3);
  wrap.appendChild(t4);
  wrap.appendChild(t5);

  body.appendChild(wrap);
}

function renderAbout(body) {
  body.innerHTML =
    '<div class="app-about">' +
      '<h2>' + t('about.title') + '</h2>' +
      '<p>' + t('about.text1') + '</p>' +
      '<p><strong>' + t('about.level') + ':</strong> ' + t('about.levelValue') + '</p>' +
      '<p><strong>' + t('about.native') + ':</strong> ' + t('about.nativeValue') + '<br>' +
         '<strong>' + t('about.also') + ':</strong> ' + t('about.alsoValue') + '</p>' +
      '<h3>' + t('about.skills') + '</h3>' +
      '<ul>' +
        '<li>JavaScript</li>' +
        '<li>C++</li>' +
        '<li>C#</li>' +
        '<li>Python</li>' +
        '<li>C</li>' +
      '</ul>' +
      '<p><strong>' + t('about.mainFocus') + ':</strong> ' + t('about.mainFocusValue') + '</p>' +
      '<p><strong>' + t('about.learning') + ':</strong> ' + t('about.learningValue') + '</p>' +
      '<h3>' + t('about.projects') + '</h3>' +
      '<p>' + t('about.projectsText') +
        '<a href="https://lucovisa.github.io/Lucovisa/" target="_blank" rel="noopener">lucovisa.github.io/Lucovisa</a>' +
      '</p>' +
    '</div>';
}

function renderMap(body) {
  const l = lang();
  body.innerHTML =
    '<div class="map-web">' +
      '<h2 class="map-web__title">' + t('map.title') + '</h2>' +

      '<div class="map-web__row map-web__row--top">' +
        '<div class="map-node map-node--isolated">IP-check</div>' +
      '</div>' +

      '<div class="map-line map-line--v"></div>' +

      '<div class="map-web__row">' +
        '<div class="map-node map-node--hub">LucConverter</div>' +
      '</div>' +

      '<div class="map-branches">' +
        '<div class="map-branch">' +
          '<div class="map-line map-line--v"></div>' +
          '<div class="map-node">SQL-in-image</div>' +
        '</div>' +
        '<div class="map-branch">' +
          '<div class="map-line map-line--v"></div>' +
          '<div class="map-node">LucCursor</div>' +
          '<div class="map-line map-line--v"></div>' +
          '<div class="map-node map-node--small">Cat Digger</div>' +
        '</div>' +
        '<div class="map-branch">' +
          '<div class="map-line map-line--v"></div>' +
          '<div class="map-node">LucFont</div>' +
          '<div class="map-line map-line--v"></div>' +
          '<div class="map-node map-node--small">Cat Digger</div>' +
        '</div>' +
      '</div>' +

      '<div class="map-line map-line--v"></div>' +

      '<div class="map-web__row">' +
        '<div class="map-node map-node--center">Lucovisa</div>' +
      '</div>' +

      '<p class="map-web__hint">' +
        (l === 'ru'
          ? 'Все проекты связаны с Lucovisa. IP-check - отдельный.'
          : 'All projects connect to Lucovisa. IP-check is standalone.') +
      '</p>' +
    '</div>';
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
    const text = btn.dataset.copy;
    navigator.clipboard.writeText(text).then(() => {
      const old = btn.textContent;
      btn.textContent = t('contact.copied');
      setTimeout(() => { btn.textContent = old; }, 1200);
    });
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
    const text = btn.dataset.copy;
    navigator.clipboard.writeText(text).then(() => {
      const old = btn.textContent;
      btn.textContent = t('donate.copied');
      setTimeout(() => { btn.textContent = old; }, 1200);
    });
  });

  body.innerHTML = '';
  body.appendChild(wrap);

  const heart = wrap.querySelector('.app-donate__heart');
  if (heart) heart.innerHTML = ICONS.heart;
}

function renderComments(body) {
  body.innerHTML =
    '<div class="comments__auth" id="comments-auth">' +
      '<button class="pill" id="comments-login">' + t('comments.login') + '</button>' +
      '<a class="pill pill--ghost" href="https://github.com/signup" target="_blank" rel="noopener">' + t('comments.create') + '</a>' +
      '<p class="comments__hint">' + t('comments.hint') + '</p>' +
    '</div>' +
    '<div class="giscus" id="giscus-container"></div>';

  const btn = body.querySelector('#comments-login');
  if (btn) btn.addEventListener('click', () => loadGiscusIn(body));
}

function renderHacker(body) {
  body.innerHTML = '<div class="terminal" id="terminal"></div>';
  const term = body.querySelector('#terminal');
  let busy = false;

  const printLine = (text, cls) => {
    const line = document.createElement('div');
    line.className = 'terminal__line' + (cls ? ' ' + cls : '');
    line.textContent = text;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
  };

  const printInput = () => {
    const line = document.createElement('div');
    line.className = 'terminal__line';
    line.style.display = 'flex';
    line.style.gap = '6px';
    line.innerHTML = '<span class="terminal__prompt">$</span>';
    const input = document.createElement('input');
    input.className = 'terminal__input';
    input.type = 'text';
    input.autocomplete = 'off';
    line.appendChild(input);
    term.appendChild(line);
    input.focus();
    term.scrollTop = term.scrollHeight;

    input.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      const cmd = input.value.trim();
      input.disabled = true;
      line.querySelector('.terminal__prompt').textContent = '$ ' + cmd;
      input.remove();
      handle(cmd);
    });
  };

  const runGame = (type) => {
    busy = true;
    term.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    canvas.width = 480;
    canvas.height = 320;
    term.appendChild(canvas);
    const hint = document.createElement('div');
    hint.className = 'game-hint';
    hint.textContent = type === 'snake' ? t('hacker.snakeHint') : t('hacker.tetrisHint');
    term.appendChild(hint);

    const stop = () => {
      window.removeEventListener('keydown', onKey);
      clearInterval(loop);
      term.innerHTML = '';
      busy = false;
      printLine(t('hacker.gameOver'), 'terminal__prompt');
      printInput();
    };

    let onKey = () => {};
    let loop;

    if (type === 'snake') loop = startSnake(canvas, stop, k => { onKey = k; });
    else loop = startTetris(canvas, stop, k => { onKey = k; });
  };

  const handle = (cmd) => {
    if (busy) return;
    const c = cmd.toLowerCase();

    if (c === '') { printInput(); return; }
    if (c === 'clear') { term.innerHTML = ''; printInput(); return; }
    if (c === 'exit') { closeWindowByApp('hacker'); return; }

    if (c === 'help') {
      t('hacker.helpLines').forEach(l => printLine(l));
      printInput(); return;
    }

    if (c === 'projects') {
      printLine(t('hacker.projectsTitle'));
      PROJECTS.forEach(p => printLine('  - ' + p.title + '  ' + p.site));
      printLine('  - Cat Digger (pre-alpha)');
      printInput(); return;
    }

    if (c === 'about') {
      printLine(t('about.text1'));
      printLine(t('about.level') + ': ' + t('about.levelValue'));
      printLine(t('about.native') + ': ' + t('about.nativeValue'));
      printLine(t('about.also') + ': ' + t('about.alsoValue'));
      printInput(); return;
    }

    if (c === 'snake' || c === 'tetris') { runGame(c); return; }

    printLine(t('hacker.unknown') + cmd);
    printInput();
  };

  printLine(t('hacker.welcome'), 'terminal__prompt');
  printLine(t('hacker.helpHint'));
  printLine('');
  printInput();
}

function startSnake(canvas, onStop, setOnKey) {
  const ctx = canvas.getContext('2d');
  const cell = 16;
  const cols = canvas.width / cell;
  const rows = canvas.height / cell;

  let snake = [{x: 5, y: 5}];
  let dir = {x: 1, y: 0};
  let food = {x: 10, y: 10};
  let alive = true;

  const place = () => { food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }; };
  place();

  const onKey = e => {
    if (e.key === 'q' || e.key === 'Q') { alive = false; onStop(); return; }
    const k = e.key;
    if (k === 'ArrowUp' && dir.y === 0) dir = {x: 0, y: -1};
    else if (k === 'ArrowDown' && dir.y === 0) dir = {x: 0, y: 1};
    else if (k === 'ArrowLeft' && dir.x === 0) dir = {x: -1, y: 0};
    else if (k === 'ArrowRight' && dir.x === 0) dir = {x: 1, y: 0};
  };
  setOnKey(onKey);
  window.addEventListener('keydown', onKey);

  return setInterval(() => {
    if (!alive) return;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    if (head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows ||
        snake.some(s => s.x === head.x && s.y === head.y)) {
      alive = false;
      onStop();
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) place();
    else snake.pop();

    ctx.fillStyle = '#0a0f15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#66C0F4';
    ctx.fillRect(food.x * cell, food.y * cell, cell - 1, cell - 1);
    ctx.fillStyle = '#7CFC98';
    snake.forEach(s => ctx.fillRect(s.x * cell, s.y * cell, cell - 1, cell - 1));
  }, 110);
}

function startTetris(canvas, onStop, setOnKey) {
  const ctx = canvas.getContext('2d');
  const cell = 20;
  const cols = 10;
  const rows = 16;
  canvas.width = cols * cell;
  canvas.height = rows * cell;

  const SHAPES = [
    [[1,1,1,1]],
    [[1,1],[1,1]],
    [[1,1,1],[0,1,0]],
    [[1,0,0],[1,1,1]],
    [[0,0,1],[1,1,1]],
    [[0,1,1],[1,1,0]],
    [[1,1,0],[0,1,1]]
  ];

  let grid = Array.from({length: rows}, () => Array(cols).fill(0));
  let piece, px, py;
  let alive = true;

  const collide = (p, x, y) => {
    for (let r = 0; r < p.length; r++)
      for (let c = 0; c < p[r].length; c++) {
        if (!p[r][c]) continue;
        const nx = x + c, ny = y + r;
        if (nx < 0 || nx >= cols || ny >= rows) return true;
        if (ny >= 0 && grid[ny][nx]) return true;
      }
    return false;
  };

  const spawn = () => {
    piece = SHAPES[Math.floor(Math.random() * SHAPES.length)].map(r => r.slice());
    px = Math.floor((cols - piece[0].length) / 2);
    py = 0;
    if (collide(piece, px, py)) { alive = false; onStop(); }
  };

  const merge = () => {
    piece.forEach((row, r) => row.forEach((v, c) => {
      if (v && py + r >= 0) grid[py + r][px + c] = 1;
    }));
  };

  const rotate = () => {
    const rotated = piece[0].map((_, i) => piece.map(row => row[i]).reverse());
    if (!collide(rotated, px, py)) piece = rotated;
  };

  const drop = () => {
    if (!collide(piece, px, py + 1)) { py++; return; }
    merge();
    grid = grid.filter(row => !row.every(v => v));
    while (grid.length < rows) grid.unshift(Array(cols).fill(0));
    spawn();
  };

  const draw = () => {
    ctx.fillStyle = '#0a0f15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#2F80ED';
    grid.forEach((row, r) => row.forEach((v, c) => {
      if (v) ctx.fillRect(c * cell, r * cell, cell - 1, cell - 1);
    }));
    ctx.fillStyle = '#66C0F4';
    piece.forEach((row, r) => row.forEach((v, c) => {
      if (v) ctx.fillRect((px + c) * cell, (py + r) * cell, cell - 1, cell - 1);
    }));
  };

  const onKey = e => {
    if (e.key === 'q' || e.key === 'Q') { alive = false; onStop(); return; }
    if (e.key === 'ArrowLeft' && !collide(piece, px - 1, py)) px--;
    else if (e.key === 'ArrowRight' && !collide(piece, px + 1, py)) px++;
    else if (e.key === 'ArrowDown') drop();
    else if (e.key === 'ArrowUp') rotate();
    draw();
  };
  setOnKey(onKey);
  window.addEventListener('keydown', onKey);

  spawn();
  draw();

  return setInterval(() => {
    if (!alive) return;
    drop();
    draw();
  }, 480);
}