const PROJECTS = [
  {
    id: 'lucConverter',
    title: 'LucConverter',
    desc: { en: 'Files, units, currencies, links, media - all in one converter.', ru: 'Файлы, единицы, валюты, ссылки, медиа - всё в одном конвертере.' },
    github: 'https://github.com/lucovisa/LucConverter',
    site: 'https://lucovisa.github.io/LucConverter/',
    gold: true
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

const LUC_VISA = {
  title: 'Lucovisa',
  desc: { en: 'About the developer and all projects.', ru: 'О разработчике и все проекты.' },
  github: 'https://github.com/lucovisa/Lucovisa',
  site: 'https://lucovisa.github.io/Lucovisa/',
  gold: true
};

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
  portfolio: { title: 'Portfolio',  icon: 'folder',   width: 680, height: 620, render: renderPortfolio },
  about:     { title: 'About me',   icon: 'info',     width: 560, height: 540, render: renderAbout },
  hacker:    { title: 'hacker.exe', icon: 'terminal', width: 680, height: 500, render: renderHacker },
  map:       { title: 'Map',        icon: 'web',      width: 720, height: 560, render: renderMap },
  contact:   { title: 'Contact',    icon: 'mail',     width: 560, height: 420, render: renderContact },
  comments:  { title: 'Comments',   icon: 'comment',  width: 640, height: 520, render: renderComments },
  donate:    { title: 'Donate',     icon: 'heart',    width: 560, height: 480, render: renderDonate }
};

function lang() { return document.documentElement.lang || 'en'; }

function projectCard(p, opts) {
  opts = opts || {};
  const l = lang();
  const el = document.createElement(opts.link ? 'a' : 'div');
  el.className = 'pyramid__card' + (p.gold ? ' pyramid__card--gold' : '');
  if (opts.link && p.site) {
    el.href = p.site;
    el.target = '_blank';
    el.rel = 'noopener';
  }
  el.innerHTML =
    (p.gold ? '<span class="pyramid__badge">' + t('portfolio.gold') + '</span>' : '') +
    '<h3>' + p.title + '</h3>' +
    '<p>' + (p.desc[l] || p.desc.en) + '</p>' +
    '<div class="pyramid__actions">' +
      (p.github ? '<a class="pill pill--ghost" href="' + p.github + '" target="_blank" rel="noopener">' + t('portfolio.github') + '</a>' : '') +
      (p.site ? '<a class="pill" href="' + p.site + '" target="_blank" rel="noopener">' + t('portfolio.site') + '</a>' : '') +
    '</div>';
  el.querySelectorAll('.pill').forEach(a => a.addEventListener('click', e => e.stopPropagation()));
  return el;
}

function renderPortfolio(body) {
  body.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'pyramid-wrap';

  const inner = document.createElement('div');
  inner.className = 'pyramid';

  const t1 = document.createElement('div');
  t1.className = 'pyramid__tier pyramid__tier--1';
  t1.appendChild(projectCard(PROJECTS[0], { link: true }));
  t1.appendChild(projectCard(LUC_VISA, { link: true }));

  const t3 = document.createElement('div');
  t3.className = 'pyramid__tier pyramid__tier--3';
  [PROJECTS[1], PROJECTS[2], PROJECTS[3]].forEach(p => t3.appendChild(projectCard(p)));

  const t5 = document.createElement('div');
  t5.className = 'pyramid__tier pyramid__tier--5';
  t5.appendChild(projectCard(PROJECTS[4]));

  inner.appendChild(t1);
  inner.appendChild(t3);
  inner.appendChild(t5);

  wrap.appendChild(inner);
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
        '<li>JavaScript</li><li>C++</li><li>C#</li><li>Python</li><li>C</li>' +
      '</ul>' +
      '<p><strong>' + t('about.mainFocus') + ':</strong> ' + t('about.mainFocusValue') + '</p>' +
      '<p><strong>' + t('about.learning') + ':</strong> ' + t('about.learningValue') + '</p>' +
      '<h3>' + t('about.projects') + '</h3>' +
      '<p>' + t('about.projectsText') +
        '<a href="https://lucovisa.github.io/Lucovisa/" target="_blank" rel="noopener">lucovisa.github.io/Lucovisa</a>' +
      '</p>' +
      '<p>' + t('about.seePortfolio') + '</p>' +
    '</div>';
}

function renderMap(body) {
  const l = lang();

  const projects = {
    ip:       { title: 'IP-check',      desc: { en: 'standalone', ru: 'отдельный' } },
    conv:     { title: 'LucConverter',  desc: { en: 'hub', ru: 'хаб' } },
    sql:      { title: 'SQL-in-image',  desc: { en: 'tool', ru: 'инструмент' } },
    cursor:   { title: 'LucCursor',     desc: { en: 'tool', ru: 'инструмент' } },
    font:     { title: 'LucFont',       desc: { en: 'tool', ru: 'инструмент' } },
    vis:      { title: 'Lucovisa',      desc: { en: 'root', ru: 'корень' } }
  };

  function nodeHTML(id) {
    const p = projects[id];
    return '<div class="gh-node" data-node="' + id + '">' +
      '<span class="gh-node__check"></span>' +
      '<span class="gh-node__title">' + p.title + '</span>' +
      '<span class="gh-node__desc">' + p.desc[l] + '</span>' +
    '</div>';
  }

  body.innerHTML =
    '<div class="gh-graph">' +
      '<div class="gh-graph__row gh-graph__row--ip">' +
        nodeHTML('ip') +
      '</div>' +

      '<div class="gh-connector gh-connector--v"></div>' +

      '<div class="gh-graph__row">' +
        nodeHTML('conv') +
      '</div>' +

      '<div class="gh-branches">' +
        '<div class="gh-branch"><div class="gh-connector gh-connector--v"></div>' + nodeHTML('sql') + '</div>' +
        '<div class="gh-branch"><div class="gh-connector gh-connector--v"></div>' + nodeHTML('cursor') + '</div>' +
        '<div class="gh-branch"><div class="gh-connector gh-connector--v"></div>' + nodeHTML('font') + '</div>' +
      '</div>' +

      '<div class="gh-connector gh-connector--v"></div>' +

      '<div class="gh-graph__row">' +
        nodeHTML('vis') +
      '</div>' +

      '<p class="gh-graph__hint">' + t('map.hint') + '</p>' +
    '</div>';

  body.querySelectorAll('.gh-node__check').forEach(el => {
    el.innerHTML = ICONS.check;
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

  const heart = wrap.querySelector('.app-donate__heart');
  if (heart) heart.innerHTML = ICONS.heart;
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
      toast(t('toast.copied') ? t('comments.starred') : '');
    });
  } else {
    if (starBtn) starBtn.style.pointerEvents = 'none';
  }

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
    term.appendChild(canvas);
    const hint = document.createElement('div');
    hint.className = 'game-hint';
    hint.textContent = type === 'snake' ? t('hacker.snakeHint') : t('hacker.tetrisHint');
    term.appendChild(hint);

    let restart = () => {};
    const gameOver = () => {
      const go = document.createElement('div');
      go.className = 'game-over';
      go.textContent = t('hacker.gameOver');
      term.appendChild(go);
    };

    const stop = () => {
      window.removeEventListener('keydown', onKey);
      clearInterval(loop);
      busy = false;
      term.innerHTML = '';
      printInput();
    };

    let onKey = () => {};
    let loop;

    if (type === 'snake') {
      loop = startSnake(canvas, stop, gameOver, k => { onKey = k; }, r => { restart = r; });
    } else {
      loop = startTetris(canvas, stop, gameOver, k => { onKey = k; }, r => { restart = r; });
    }
  };

  const handle = (cmd) => {
    if (busy) return;
    const c = cmd.toLowerCase().trim();

    if (c === '') { printInput(); return; }
    if (c === 'clear') { term.innerHTML = ''; printInput(); return; }

    if (c === 'npm' || c === 'help') {
      t('hacker.helpLines').forEach(l => printLine(l));
      printInput(); return;
    }

    if (c.startsWith('exit')) {
      const parts = c.split(/\s+/);
      if (parts.length < 2) {
        printLine('Usage: exit <app>');
        printInput(); return;
      }
      const appId = parts[1];
      if (typeof closeWindowByApp === 'function' && APPS[appId]) {
        closeWindowByApp(appId);
        printLine(t('hacker.exited') + appId);
      } else {
        printLine(t('hacker.exitNotFound') + appId);
      }
      printInput(); return;
    }

    if (c === 'snake' || c === 'tetris') { runGame(c); return; }

    printLine(t('hacker.unknown') + cmd);
    printInput();
  };

  printLine(t('hacker.welcome'), 'terminal__prompt');
  printLine(t('hacker.hint'));
  printLine('');
  printInput();
}

function startSnake(canvas, onStop, onGameOver, setOnKey, setRestart) {
  const ctx = canvas.getContext('2d');
  const cell = 16;
  const cols = Math.floor(canvas.clientWidth / cell) || 30;
  const rows = 20;
  canvas.width = cols * cell;
  canvas.height = rows * cell;

  let snake, dir, food, alive, score, loop;

  const reset = () => {
    snake = [{x: 5, y: 5}];
    dir = {x: 1, y: 0};
    food = {x: 10, y: 10};
    alive = true;
    score = 0;
    place();
  };

  const place = () => {
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  };

  const onKey = e => {
    if (e.key === 'q' || e.key === 'Q') { alive = false; onStop(); return; }
    if ((e.key === 'r' || e.key === 'R') && !alive) { reset(); return; }
    if (!alive) return;
    const k = e.key;
    if (k === 'ArrowUp' && dir.y === 0) dir = {x: 0, y: -1};
    else if (k === 'ArrowDown' && dir.y === 0) dir = {x: 0, y: 1};
    else if (k === 'ArrowLeft' && dir.x === 0) dir = {x: -1, y: 0};
    else if (k === 'ArrowRight' && dir.x === 0) dir = {x: 1, y: 0};
  };
  setOnKey(onKey);
  window.addEventListener('keydown', onKey);

  const draw = () => {
    ctx.fillStyle = '#0a0f15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#66C0F4';
    ctx.fillRect(food.x * cell, food.y * cell, cell - 1, cell - 1);

    ctx.fillStyle = '#7CFC98';
    snake.forEach(s => ctx.fillRect(s.x * cell, s.y * cell, cell - 1, cell - 1));

    ctx.fillStyle = '#7CFC98';
    ctx.font = '12px monospace';
    ctx.fillText(t('hacker.score') + score, 6, 14);
  };

  reset();
  draw();

  loop = setInterval(() => {
    if (!alive) { draw(); return; }
    let head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    if (head.x < 0) head.x = cols - 1;
    if (head.x >= cols) head.x = 0;
    if (head.y < 0) head.y = rows - 1;
    if (head.y >= rows) head.y = 0;

    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      alive = false;
      draw();
      onGameOver();
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) { score++; place(); }
    else snake.pop();

    draw();
  }, 110);

  setRestart(reset);
  return loop;
}

function startTetris(canvas, onStop, onGameOver, setOnKey, setRestart) {
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

  let grid, piece, px, py, alive, score, loop;

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
    if (collide(piece, px, py)) {
      alive = false;
      onGameOver();
    }
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
    score += 10;
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
    if (piece) piece.forEach((row, r) => row.forEach((v, c) => {
      if (v) ctx.fillRect((px + c) * cell, (py + r) * cell, cell - 1, cell - 1);
    }));

    ctx.fillStyle = '#7CFC98';
    ctx.font = '12px monospace';
    ctx.fillText(t('hacker.score') + score, 6, 14);
  };

  const reset = () => {
    grid = Array.from({length: rows}, () => Array(cols).fill(0));
    score = 0;
    alive = true;
    spawn();
    draw();
  };

  const onKey = e => {
    if (e.key === 'q' || e.key === 'Q') { alive = false; onStop(); return; }
    if ((e.key === 'r' || e.key === 'R') && !alive) { reset(); return; }
    if (!alive) return;
    if (e.key === 'ArrowLeft' && !collide(piece, px - 1, py)) px--;
    else if (e.key === 'ArrowRight' && !collide(piece, px + 1, py)) px++;
    else if (e.key === 'ArrowDown') drop();
    else if (e.key === 'ArrowUp') rotate();
    draw();
  };
  setOnKey(onKey);
  window.addEventListener('keydown', onKey);

  reset();

  loop = setInterval(() => {
    if (!alive) return;
    drop();
    draw();
  }, 480);

  setRestart(reset);
  return loop;
}