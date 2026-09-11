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

const CAT_DIGGER = {
  title: 'Cat Digger',
  desc: { en: 'Game in pre-alpha development.', ru: 'Игра в стадии преальфа-разработки.' },
  gold: true
};

const LUC_VISA = {
  title: 'Lucovisa',
  desc: { en: 'About the developer and all projects.', ru: 'О разработчике и все проекты.' },
  github: 'https://github.com/lucovisa/Lucovisa',
  site: 'https://lucovisa.github.io/Lucovisa/'
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
  portfolio: { title: 'Portfolio',  icon: 'folder',   width: 680, height: 640, render: renderPortfolio },
  about:     { title: 'About me',   icon: 'info',     width: 560, height: 540, render: renderAbout },
  hacker:    { title: 'hacker.exe', icon: 'terminal', width: 680, height: 500, render: renderHacker },
  map:       { title: 'Map',        icon: 'web',      width: 760, height: 600, render: renderMap },
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
  t1.appendChild(projectCard(CAT_DIGGER));

  const t2 = document.createElement('div');
  t2.className = 'pyramid__tier pyramid__tier--2';
  t2.appendChild(projectCard(LUC_VISA, { link: true }));

  const t3 = document.createElement('div');
  t3.className = 'pyramid__tier pyramid__tier--3';
  [PROJECTS[1], PROJECTS[2], PROJECTS[3]].forEach(p => t3.appendChild(projectCard(p)));

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
    { id: 'conv',   label: 'LucConverter',  x: 380, y: 60,  w: 180, h: 44 },
    { id: 'cat',    label: 'Cat Digger',    x: 600, y: 60,  w: 160, h: 44 },
    { id: 'vis',    label: 'Lucovisa',      x: 380, y: 170, w: 180, h: 44 },
    { id: 'sql',    label: 'SQL-in-image',  x: 160, y: 280, w: 170, h: 44 },
    { id: 'cursor', label: 'LucCursor',     x: 380, y: 280, w: 170, h: 44 },
    { id: 'font',   label: 'LucFont',       x: 600, y: 280, w: 170, h: 44 },
    { id: 'ip',     label: 'IP-check',      x: 380, y: 400, w: 170, h: 44 }
  ];

  const edges = [
    { from: 'conv', to: 'cat' },
    { from: 'conv', to: 'vis' },
    { from: 'vis',  to: 'sql' },
    { from: 'vis',  to: 'cursor' },
    { from: 'vis',  to: 'font' },
    { from: 'vis',  to: 'ip' }
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

  const nodeEls = {};

  nodes.forEach(n => {
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'map-node-g');
    g.setAttribute('transform', 'translate(' + (n.x - n.w / 2) + ',' + (n.y - n.h / 2) + ')');

    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('class', 'map-node-rect');
    rect.setAttribute('width', n.w);
    rect.setAttribute('height', n.h);
    rect.setAttribute('rx', '8');

    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('class', 'map-node-check');
    circle.setAttribute('cx', '18');
    circle.setAttribute('cy', n.h / 2);
    circle.setAttribute('r', '8');

    const check = document.createElementNS(SVG_NS, 'path');
    check.setAttribute('class', 'map-node-tick');
    check.setAttribute('d', 'M14 ' + (n.h / 2) + ' l3 3 l6 -6');
    check.setAttribute('fill', 'none');

    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttribute('class', 'map-node-text');
    text.setAttribute('x', '34');
    text.setAttribute('y', n.h / 2 + 5);
    text.textContent = n.label;

    g.appendChild(rect);
    g.appendChild(circle);
    g.appendChild(check);
    g.appendChild(text);

    gNodes.appendChild(g);
    nodeEls[n.id] = g;

    makeNodeDraggable(g, n, nodeEls, edgeEls, edges, nodes);
  });

  function redrawEdges() {
    edges.forEach((e, i) => {
      const a = nodes.find(n => n.id === e.from);
      const b = nodes.find(n => n.id === e.to);
      if (!a || !b) return;

      const ax = a.x;
      const ay = a.y + a.h / 2;
      const bx = b.x;
      const by = b.y - b.h / 2;

      const midY = (ay + by) / 2;
      const d = 'M ' + ax + ' ' + ay +
                ' V ' + midY +
                ' H ' + bx +
                ' V ' + by;
      edgeEls[i].setAttribute('d', d);
    });
  }

  container.appendChild(svg);
  redrawEdges();

  window._mapRedraw = redrawEdges;
}

function makeNodeDraggable(g, node, nodeEls, edgeEls, edges, nodes) {
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

  const COMMANDS = ['help', 'clear', 'snake', 'tetris', 'exit', 'reset', 'profile'];

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
        if (match.length === 1) {
          input.value = match[0] + ' ';
        } else if (match.length > 1) {
          printLine('');
          match.forEach(c => printLine('  ' + c));
          printInput();
          input.remove();
        }
        return;
      }
      if (e.key !== 'Enter') return;
      const cmd = input.value.trim();
      input.disabled = true;
      line.querySelector('.terminal__prompt').textContent = '$ ' + cmd;
      input.remove();
      currentInput = null;
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

    let gameOverShown = false;
    const gameOver = () => {
      if (gameOverShown) return;
      gameOverShown = true;
      const go = document.createElement('div');
      go.className = 'game-over';
      go.textContent = t('hacker.gameOver');
      term.appendChild(go);
    };

    const resetGameOver = () => {
      gameOverShown = false;
      const go = term.querySelector('.game-over');
      if (go) go.remove();
    };

    const stop = () => {
      window.removeEventListener('keydown', onKey);
      clearInterval(loop);
      busy = false;
      currentInput = null;
      term.innerHTML = '';
      printInput();
    };

    let onKey = () => {};
    let loop;

    if (type === 'snake') {
      loop = startSnake(canvas, stop, gameOver, resetGameOver, k => { onKey = k; });
    } else {
      loop = startTetris(canvas, stop, gameOver, resetGameOver, k => { onKey = k; });
    }
  };

  const handle = (cmd) => {
    if (busy) return;
    const c = cmd.toLowerCase().trim();

    if (c === '') { printInput(); return; }
    if (c === 'clear') { term.innerHTML = ''; printInput(); return; }

    if (c === 'help' || c === 'npm') {
      t('hacker.helpLines').forEach(l => printLine(l));
      printInput(); return;
    }

    if (c === 'reset profile' || c === 'resetprofile' || c === 'reset') {
      if (typeof resetProfile === 'function') {
        resetProfile();
        printLine(t('hacker.profileReset'));
      } else {
        printLine(t('hacker.profileResetFail'));
      }
      printInput(); return;
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

    if (c === 'snake' || c === 'tetris') { runGame(c); return; }

    printLine(t('hacker.unknown') + cmd);
    printInput();
  };

  term.addEventListener('click', () => {
    if (busy) return;
    if (currentInput && !currentInput.disabled) currentInput.focus();
    else printInput();
  });

  printLine(t('hacker.welcome'), 'terminal__prompt');
  printLine(t('hacker.hint'));
  printLine('');
  printInput();
  setTimeout(() => { if (currentInput) currentInput.focus(); }, 100);
}

function startSnake(canvas, onStop, onGameOver, onResetGameOver, setOnKey) {
  const ctx = canvas.getContext('2d');
  const cell = 16;
  const cols = 30;
  const rows = 20;
  canvas.width = cols * cell;
  canvas.height = rows * cell;

  let snake, dir, food, alive, score, loop;

  const place = () => {
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  };

  const reset = () => {
    snake = [{x: 5, y: 5}];
    dir = {x: 1, y: 0};
    alive = true;
    score = 0;
    place();
    onResetGameOver();
    draw();
  };

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

  const onKey = e => {
    const k = e.key.toLowerCase();

    if (k === 'q' || e.key === 'Q' || k === 'й') { alive = false; onStop(); return; }
    if (k === 'r' || e.key === 'R' || k === 'к') { reset(); return; }
    if (!alive) return;

    if ((e.key === 'ArrowUp' || k === 'w' || k === 'ц') && dir.y === 0) dir = {x: 0, y: -1};
    else if ((e.key === 'ArrowDown' || k === 's' || k === 'ы') && dir.y === 0) dir = {x: 0, y: 1};
    else if ((e.key === 'ArrowLeft' || k === 'a' || k === 'ф') && dir.x === 0) dir = {x: -1, y: 0};
    else if ((e.key === 'ArrowRight' || k === 'd' || k === 'в') && dir.x === 0) dir = {x: 1, y: 0};
  };
  setOnKey(onKey);
  window.addEventListener('keydown', onKey);

  reset();

  loop = setInterval(() => {
    if (!alive) return;
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

  return loop;
}

function startTetris(canvas, onStop, onGameOver, onResetGameOver, setOnKey) {
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
    onResetGameOver();
    spawn();
    draw();
  };

  const onKey = e => {
    const k = e.key.toLowerCase();

    if (k === 'q' || e.key === 'Q' || k === 'й') { alive = false; onStop(); return; }
    if (k === 'r' || e.key === 'R' || k === 'к') { reset(); return; }
    if (!alive) return;

    if (e.key === 'ArrowLeft' || k === 'a' || k === 'ф') { if (!collide(piece, px - 1, py)) px--; }
    else if (e.key === 'ArrowRight' || k === 'd' || k === 'в') { if (!collide(piece, px + 1, py)) px++; }
    else if (e.key === 'ArrowDown' || k === 's' || k === 'ы') drop();
    else if (e.key === 'ArrowUp' || k === 'w' || k === 'ц') rotate();
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

  return loop;
}