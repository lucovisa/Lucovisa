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

const CONTACTS = [
  { id: 'x',     label: 'contact.x',     value: '@Lukovica467771',                 url: 'https://x.com/Lukovica467771/' },
  { id: 'steam', label: 'contact.steam', value: 'steamcommunity.com/id/Lucovisa',  url: 'https://steamcommunity.com/id/Lucovisa/' },
  { id: 'email', label: 'contact.email', value: 'lucovisa24@gmail.com',            url: 'mailto:lucovisa24@gmail.com' }
];

const APPS = {
  portfolio: {
    title: 'Portfolio',
    icon: 'icon.png',
    width: 640, height: 480,
    render: renderPortfolio
  },
  about: {
    title: 'About me',
    icon: 'images.png',
    width: 560, height: 520,
    render: renderAbout
  },
  hacker: {
    title: 'hacker.exe',
    icon: 'https://lucovisa.github.io/SQL-in-image/favicon.png',
    width: 640, height: 460,
    render: renderHacker
  },
  map: {
    title: 'Map',
    icon: 'sitemap.png',
    width: 640, height: 460,
    render: renderMap
  },
  contact: {
    title: 'Contact',
    icon: 'contacs.png',
    width: 560, height: 420,
    render: renderContact
  },
  comments: {
    title: 'Comments',
    icon: 'comment.png',
    width: 700, height: 560,
    render: renderComments
  }
};

function lang() { return document.documentElement.lang || 'en'; }

function renderPortfolio(body) {
  const l = lang();
  const list = document.createElement('div');
  list.className = 'app-portfolio';

  PROJECTS.forEach(p => {
    const item = document.createElement('div');
    item.className = 'app-portfolio__item';
    item.innerHTML =
      '<div class="app-portfolio__info">' +
        '<h3>' + p.title + '</h3>' +
        '<p>' + (p.desc[l] || p.desc.en) + '</p>' +
      '</div>' +
      '<div class="app-portfolio__actions">' +
        '<a class="pill pill--ghost" href="' + p.github + '" target="_blank" rel="noopener">GitHub</a>' +
        '<a class="pill" href="' + p.site + '" target="_blank" rel="noopener">' + t('portfolio.site') + '</a>' +
      '</div>';
    list.appendChild(item);
  });

  body.innerHTML = '';
  body.appendChild(list);
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
  const wrap = document.createElement('div');
  wrap.className = 'app-map';

  const title = document.createElement('h2');
  title.textContent = t('map.title');
  title.style.color = 'var(--accent-2)';
  title.style.fontSize = '16px';
  wrap.appendChild(title);

  PROJECTS.forEach((p, i) => {
    const node = document.createElement('div');
    node.className = 'map-node';
    node.innerHTML =
      '<span class="map-node__arrow">' + (i === 0 ? '▶' : '└▶') + '</span>' +
      '<div style="flex:1">' +
        '<a href="' + p.site + '" target="_blank" rel="noopener">' + p.title + '</a>' +
        '<p style="font-size:12px;color:var(--text-dim);margin-top:2px">' + (p.desc[l] || p.desc.en) + '</p>' +
      '</div>';
    wrap.appendChild(node);
  });

  body.innerHTML = '';
  body.appendChild(wrap);
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

function renderComments(body) {
  body.innerHTML =
    '<div class="comments__auth" id="comments-auth">' +
      '<button class="pill" id="comments-login">' + t('comments.login') + '</button>' +
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

    if (type === 'snake') {
      loop = startSnake(canvas, () => onKey, key => { onKey = key; }, stop);
    } else {
      loop = startTetris(canvas, () => onKey, key => { onKey = key; }, stop);
    }
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
      printInput(); return;
    }

    if (c === 'about') {
      printLine(t('about.text1'));
      printLine(t('about.level') + ': ' + t('about.levelValue'));
      printLine(t('about.native') + ': ' + t('about.nativeValue'));
      printLine(t('about.also') + ': ' + t('about.alsoValue'));
      printInput(); return;
    }

    if (c === 'snake' || c === 'tetris') {
      runGame(c); return;
    }

    printLine(t('hacker.unknown') + cmd);
    printInput();
  };

  printLine(t('hacker.welcome'), 'terminal__prompt');
  printLine(t('hacker.helpHint'));
  printLine('');
  printInput();
}

function startSnake(canvas, getOnKey, setOnKey, onStop) {
  const ctx = canvas.getContext('2d');
  const cell = 16;
  const cols = canvas.width / cell;
  const rows = canvas.height / cell;

  let snake = [{x: 5, y: 5}];
  let dir = {x: 1, y: 0};
  let food = {x: 10, y: 10};
  let alive = true;

  const place = () => {
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  };
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

function startTetris(canvas, getOnKey, setOnKey, onStop) {
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
  let piece, px, py, shape;
  let alive = true;

  const spawn = () => {
    shape = SHAPES[Math.floor(Math.random() * SHAPES.length)].map(r => r.slice());
    piece = shape.map(r => r.slice());
    px = Math.floor((cols - piece[0].length) / 2);
    py = 0;
    if (collide(piece, px, py)) { alive = false; onStop(); }
  };

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
    if (!collide(piece, px, py + 1)) { py++; return true; }
    merge();
    let lines = 0;
    grid = grid.filter(row => {
      if (row.every(v => v)) { lines++; return false; }
      return true;
    });
    while (grid.length < rows) grid.unshift(Array(cols).fill(0));
    spawn();
    return false;
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