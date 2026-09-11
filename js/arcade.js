(function () {
  function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0f15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function makeBackButton(onBack) {
    const wrap = document.createElement('div');
    wrap.className = 'arcade-back';
    const btn = document.createElement('button');
    btn.className = 'pill pill--ghost';
    btn.textContent = t('arcade.back');
    btn.addEventListener('click', onBack);
    wrap.appendChild(btn);
    return wrap;
  }

  function makeScoreBar() {
    const bar = document.createElement('div');
    bar.className = 'arcade-score';
    return bar;
  }

  function updateScore(bar, score, extra) {
    bar.textContent = t('arcade.score') + ': ' + score + (extra ? ' · ' + extra : '');
  }

  function makeHint(text) {
    const hint = document.createElement('div');
    hint.className = 'arcade-hint';
    hint.textContent = text;
    return hint;
  }

  const WORDS_EN = [
    'apple','banana','cherry','dog','cat','house','tree','water','fire','moon',
    'star','cloud','river','stone','bread','chair','table','window','door','light',
    'music','game','code','robot','paper','glass','bottle','phone','watch','train'
  ];

  const WORDS_RU = [
    'яблоко','банан','вишня','собака','кошка','дом','дерево','вода','огонь','луна',
    'звезда','облако','река','камень','хлеб','стул','стол','окно','дверь','свет',
    'музыка','игра','код','робот','бумага','стекло','бутылка','телефон','часы','поезд'
  ];

  function getWords() {
    const l = document.documentElement.lang || 'en';
    return l === 'ru' ? WORDS_RU : WORDS_EN;
  }

  function renderArcade(body) {
    let cleanup = null;

    function renderMenu() {
      if (cleanup) { cleanup(); cleanup = null; }

      body.innerHTML =
        '<div class="arcade">' +
          '<div class="arcade__menu">' +
            '<button class="arcade__item" data-game="snake3d">' +
              '<span class="app-icon__svg arcade__item-icon" data-svg="joystick"></span>' +
              '<span>' + t('arcade.snake3d') + '</span>' +
            '</button>' +
            '<button class="arcade__item" data-game="snake2d">' +
              '<span class="app-icon__svg arcade__item-icon" data-svg="joystick"></span>' +
              '<span>' + t('arcade.snake2d') + '</span>' +
            '</button>' +
            '<button class="arcade__item" data-game="tetris">' +
              '<span class="app-icon__svg arcade__item-icon" data-svg="joystick"></span>' +
              '<span>' + t('arcade.tetris') + '</span>' +
            '</button>' +
            '<button class="arcade__item" data-game="guess">' +
              '<span class="app-icon__svg arcade__item-icon" data-svg="info"></span>' +
              '<span>' + t('arcade.guess') + '</span>' +
            '</button>' +
            '<button class="arcade__item" data-game="solitaire">' +
              '<span class="app-icon__svg arcade__item-icon" data-svg="solitaire"></span>' +
              '<span>' + t('arcade.solitaire') + '</span>' +
            '</button>' +
            '<button class="arcade__item" data-game="minesweeper">' +
              '<span class="app-icon__svg arcade__item-icon" data-svg="minesweeper"></span>' +
              '<span>' + t('arcade.minesweeper') + '</span>' +
            '</button>' +
            '<button class="arcade__item" data-game="clicker">' +
              '<span class="app-icon__svg arcade__item-icon" data-svg="heart"></span>' +
              '<span>' + t('arcade.clicker') + '</span>' +
            '</button>' +
          '</div>' +
        '</div>';

      renderIcons(body);

      body.querySelectorAll('[data-game]').forEach(btn => {
        btn.addEventListener('click', () => {
          const game = btn.dataset.game;
          if (game === 'snake3d') startSnake3D();
          else if (game === 'snake2d') startSnake2D();
          else if (game === 'tetris') startTetrisArcade();
          else if (game === 'guess') startGuess();
          else if (game === 'solitaire') startSolitaire();
          else if (game === 'minesweeper') startMinesweeper();
          else if (game === 'clicker') startClicker();
        });
      });
    }

    function prepareGame() {
      body.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.className = 'arcade-game';
      body.appendChild(wrap);

      const back = makeBackButton(renderMenu);
      wrap.appendChild(back);

      const scoreBar = makeScoreBar();
      wrap.appendChild(scoreBar);

      const stage = document.createElement('div');
      stage.className = 'arcade-stage';
      wrap.appendChild(stage);

      return { wrap, stage, scoreBar };
    }

    function startSnake3D() {
      const { stage, scoreBar } = prepareGame();
      const canvas = document.createElement('canvas');
      canvas.className = 'arcade-canvas';
      canvas.width = 640;
      canvas.height = 480;
      stage.appendChild(canvas);
      stage.appendChild(makeHint(t('arcade.controls') + ' · ' + t('arcade.pressR') + ' · ' + t('arcade.pressQ')));

      const ctx = canvas.getContext('2d');
      const COLS = 15;
      const ROWS = 15;
      const ISO_X = 22;
      const ISO_Y = 11;
      const OFFSET_X = canvas.width / 2;
      const OFFSET_Y = 100;

      let snake, dir, food, alive, score, loop;

      function project(x, y, z) {
        return {
          x: OFFSET_X + (x - y) * ISO_X,
          y: OFFSET_Y + (x + y) * ISO_Y - z
        };
      }

      function shadeColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
        const B = Math.max(0, Math.min(255, (num & 0xff) + amt));
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
      }

      function drawCube(x, y, color, height) {
        height = height || 14;
        const top = project(x, y, height);
        const left = project(x, y + 1, height);
        const right = project(x + 1, y, height);
        const bottomL = project(x, y + 1, 0);
        const bottomR = project(x + 1, y, 0);
        const bottomBack = project(x + 1, y + 1, 0);

        ctx.fillStyle = shadeColor(color, -25);
        ctx.beginPath();
        ctx.moveTo(left.x, left.y);
        ctx.lineTo(bottomL.x, bottomL.y);
        ctx.lineTo(bottomBack.x, bottomBack.y);
        ctx.lineTo(top.x + (bottomBack.x - right.x), top.y + (bottomBack.y - right.y));
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = shadeColor(color, -50);
        ctx.beginPath();
        ctx.moveTo(right.x, right.y);
        ctx.lineTo(bottomR.x, bottomR.y);
        ctx.lineTo(bottomBack.x, bottomBack.y);
        ctx.lineTo(top.x + (bottomBack.x - left.x), top.y + (bottomBack.y - left.y));
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(top.x, top.y);
        ctx.lineTo(left.x, left.y);
        ctx.lineTo(bottomBack.x, bottomBack.y);
        ctx.lineTo(right.x, right.y);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(0,0,0,0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      function drawGrid() {
        clearCanvas(canvas);
        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            const p = project(x, y, 0);
            const p2 = project(x + 1, y, 0);
            const p3 = project(x + 1, y + 1, 0);
            const p4 = project(x, y + 1, 0);
            ctx.fillStyle = (x + y) % 2 === 0 ? '#1a2332' : '#151c28';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = 'rgba(102, 192, 244, 0.08)';
            ctx.stroke();
          }
        }
      }

      function drawScene() {
        drawGrid();
        snake.forEach((s, i) => {
          if (i === snake.length - 1 && snake.length > 1) return;
          drawCube(s.x, s.y, i === 0 ? '#66C0F4' : '#2F80ED', i === 0 ? 18 : 14);
        });
        drawCube(food.x, food.y, '#FF7BAC', 12);
      }

      function place() {
        let tries = 0;
        while (tries < 100) {
          const nx = Math.floor(Math.random() * COLS);
          const ny = Math.floor(Math.random() * ROWS);
          if (!snake.some(s => s.x === nx && s.y === ny)) {
            food = { x: nx, y: ny };
            return;
          }
          tries++;
        }
      }

      function reset() {
        snake = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
        dir = { x: 1, y: 0 };
        alive = true;
        score = 0;
        place();
        updateScore(scoreBar, score);
        drawScene();
      }

      function onKey(e) {
        const k = e.key.toLowerCase();
        if (k === 'q' || k === 'й') { alive = false; stop(); return; }
        if (k === 'r' || k === 'к') { reset(); return; }
        if (!alive) return;
        if ((e.key === 'ArrowUp' || k === 'w' || k === 'ц') && dir.y === 0) dir = { x: 0, y: -1 };
        else if ((e.key === 'ArrowDown' || k === 's' || k === 'ы') && dir.y === 0) dir = { x: 0, y: 1 };
        else if ((e.key === 'ArrowLeft' || k === 'a' || k === 'ф') && dir.x === 0) dir = { x: -1, y: 0 };
        else if ((e.key === 'ArrowRight' || k === 'd' || k === 'в') && dir.x === 0) dir = { x: 1, y: 0 };
      }

      function stop() {
        window.removeEventListener('keydown', onKey);
        clearInterval(loop);
      }

      window.addEventListener('keydown', onKey);
      reset();

      loop = setInterval(() => {
        if (!alive) return;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
        if (head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS ||
            snake.some(s => s.x === head.x && s.y === head.y)) {
          alive = false;
          const go = document.createElement('div');
          go.className = 'arcade-gameover';
          go.textContent = t('arcade.gameOver') + ' · ' + t('arcade.pressR');
          stage.appendChild(go);
          if (score >= 1000 && typeof unlockAchievement === 'function') unlockAchievement('snake1000');
          return;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          score += 100;
          place();
          updateScore(scoreBar, score);
        } else {
          snake.pop();
        }
        drawScene();
      }, 180);

      cleanup = stop;
    }

    function startSnake2D() {
      const { stage, scoreBar } = prepareGame();
      const canvas = document.createElement('canvas');
      canvas.className = 'arcade-canvas';
      canvas.width = 480;
      canvas.height = 480;
      stage.appendChild(canvas);
      stage.appendChild(makeHint(t('arcade.controls') + ' · ' + t('arcade.pressR') + ' · ' + t('arcade.pressQ')));

      const ctx = canvas.getContext('2d');
      const CELL = 20;
      const COLS = 24;
      const ROWS = 24;

      let snake, dir, food, alive, score, loop;

      function place() {
        let tries = 0;
        while (tries < 100) {
          const nx = Math.floor(Math.random() * COLS);
          const ny = Math.floor(Math.random() * ROWS);
          if (!snake.some(s => s.x === nx && s.y === ny)) {
            food = { x: nx, y: ny };
            return;
          }
          tries++;
        }
      }

      function draw() {
        clearCanvas(canvas);

        ctx.fillStyle = '#0f1520';
        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            if ((x + y) % 2 === 0) ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
          }
        }

        ctx.fillStyle = '#FF7BAC';
        ctx.fillRect(food.x * CELL + 2, food.y * CELL + 2, CELL - 4, CELL - 4);

        snake.forEach((s, i) => {
          ctx.fillStyle = i === 0 ? '#66C0F4' : '#2F80ED';
          ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
        });

        ctx.fillStyle = '#7CFC98';
        ctx.font = '14px monospace';
        ctx.fillText(t('arcade.score') + ': ' + score, 8, 20);
      }

      function reset() {
        snake = [{ x: 10, y: 12 }, { x: 9, y: 12 }, { x: 8, y: 12 }];
        dir = { x: 1, y: 0 };
        alive = true;
        score = 0;
        place();
        updateScore(scoreBar, score);
        draw();
      }

      function onKey(e) {
        const k = e.key.toLowerCase();
        if (k === 'q' || k === 'й') { alive = false; stop(); return; }
        if (k === 'r' || k === 'к') { reset(); return; }
        if (!alive) return;
        if ((e.key === 'ArrowUp' || k === 'w' || k === 'ц') && dir.y === 0) dir = { x: 0, y: -1 };
        else if ((e.key === 'ArrowDown' || k === 's' || k === 'ы') && dir.y === 0) dir = { x: 0, y: 1 };
        else if ((e.key === 'ArrowLeft' || k === 'a' || k === 'ф') && dir.x === 0) dir = { x: -1, y: 0 };
        else if ((e.key === 'ArrowRight' || k === 'd' || k === 'в') && dir.x === 0) dir = { x: 1, y: 0 };
      }

      function stop() {
        window.removeEventListener('keydown', onKey);
        clearInterval(loop);
      }

      window.addEventListener('keydown', onKey);
      reset();

      loop = setInterval(() => {
        if (!alive) return;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
        if (head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS ||
            snake.some(s => s.x === head.x && s.y === head.y)) {
          alive = false;
          draw();
          const go = document.createElement('div');
          go.className = 'arcade-gameover';
          go.textContent = t('arcade.gameOver') + ' · ' + t('arcade.pressR');
          stage.appendChild(go);
          return;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          score += 10;
          place();
          updateScore(scoreBar, score);
        } else {
          snake.pop();
        }
        draw();
      }, 110);

      cleanup = stop;
    }

    function startTetrisArcade() {
      const { stage, scoreBar } = prepareGame();
      const canvas = document.createElement('canvas');
      canvas.className = 'arcade-canvas';
      canvas.width = 300;
      canvas.height = 480;
      stage.appendChild(canvas);
      stage.appendChild(makeHint(t('arcade.controls') + ' · ' + t('arcade.tetrisRotate') + ' · ' + t('arcade.pressR') + ' · ' + t('arcade.pressQ')));

      const ctx = canvas.getContext('2d');
      const CELL = 30;
      const COLS = 10;
      const ROWS = 16;

      const SHAPES = [
        [[1,1,1,1]],
        [[1,1],[1,1]],
        [[1,1,1],[0,1,0]],
        [[1,0,0],[1,1,1]],
        [[0,0,1],[1,1,1]],
        [[0,1,1],[1,1,0]],
        [[1,1,0],[0,1,1]]
      ];
      const COLORS = ['#66C0F4', '#FFD166', '#B07BFF', '#2F80ED', '#FF8A8A', '#7CFC98', '#E03A6D'];

      let grid, piece, pieceColor, px, py, alive, score, loop;

      function collide(p, x, y) {
        for (let r = 0; r < p.length; r++)
          for (let c = 0; c < p[r].length; c++) {
            if (!p[r][c]) continue;
            const nx = x + c, ny = y + r;
            if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
            if (ny >= 0 && grid[ny][nx]) return true;
          }
        return false;
      }

      function spawn() {
        const idx = Math.floor(Math.random() * SHAPES.length);
        piece = SHAPES[idx].map(r => r.slice());
        pieceColor = COLORS[idx];
        px = Math.floor((COLS - piece[0].length) / 2);
        py = 0;
        if (collide(piece, px, py)) {
          alive = false;
          const go = document.createElement('div');
          go.className = 'arcade-gameover';
          go.textContent = t('arcade.gameOver') + ' · ' + t('arcade.pressR');
          stage.appendChild(go);
          if (score >= 10000 && typeof unlockAchievement === 'function') unlockAchievement('tetris10000');
        }
      }

      function merge() {
        piece.forEach((row, r) => row.forEach((v, c) => {
          if (v && py + r >= 0) {
            grid[py + r][px + c] = { v: 1, color: pieceColor };
          }
        }));
      }

      function rotate() {
        const rotated = piece[0].map((_, i) => piece.map(row => row[i]).reverse());
        if (!collide(rotated, px, py)) piece = rotated;
      }

      function drop() {
        if (!collide(piece, px, py + 1)) { py++; return; }
        merge();
        let cleared = 0;
        grid = grid.filter(row => {
          if (row.every(v => v)) { cleared++; return false; }
          return true;
        });
        while (grid.length < ROWS) grid.unshift(Array(COLS).fill(0));
        if (cleared > 0) {
          score += cleared * 500;
          updateScore(scoreBar, score);
        }
        spawn();
      }

      function draw() {
        clearCanvas(canvas);
        grid.forEach((row, r) => row.forEach((v, c) => {
          if (v) {
            ctx.fillStyle = v.color;
            ctx.fillRect(c * CELL, r * CELL, CELL - 1, CELL - 1);
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.strokeRect(c * CELL, r * CELL, CELL - 1, CELL - 1);
          }
        }));
        if (piece) {
          ctx.fillStyle = pieceColor;
          piece.forEach((row, r) => row.forEach((v, c) => {
            if (v) {
              ctx.fillRect((px + c) * CELL, (py + r) * CELL, CELL - 1, CELL - 1);
              ctx.strokeStyle = 'rgba(0,0,0,0.3)';
              ctx.strokeRect((px + c) * CELL, (py + r) * CELL, CELL - 1, CELL - 1);
            }
          }));
        }
      }

      function reset() {
        grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
        score = 0;
        alive = true;
        const go = stage.querySelector('.arcade-gameover');
        if (go) go.remove();
        spawn();
        updateScore(scoreBar, score);
        draw();
      }

      function onKey(e) {
        const k = e.key.toLowerCase();
        if (k === 'q' || k === 'й') { alive = false; stop(); return; }
        if (k === 'r' || k === 'к') { reset(); return; }
        if (!alive) return;
        if (e.key === 'ArrowLeft' || k === 'a' || k === 'ф') { if (!collide(piece, px - 1, py)) px--; }
        else if (e.key === 'ArrowRight' || k === 'd' || k === 'в') { if (!collide(piece, px + 1, py)) px++; }
        else if (e.key === 'ArrowDown' || k === 's' || k === 'ы') drop();
        else if (e.key === 'ArrowUp' || k === 'w' || k === 'ц') rotate();
        draw();
      }

      function stop() {
        window.removeEventListener('keydown', onKey);
        clearInterval(loop);
      }

      window.addEventListener('keydown', onKey);
      reset();

      loop = setInterval(() => {
        if (!alive) return;
        drop();
        draw();
      }, 500);

      cleanup = stop;
    }

    function startGuess() {
      const { stage } = prepareGame();
      let mode = 'numbers';

      function renderSetup() {
        stage.innerHTML = '';

        const modes = document.createElement('div');
        modes.className = 'guess-modes';

        const mNums = document.createElement('button');
        mNums.className = 'guess-mode' + (mode === 'numbers' ? ' is-active' : '');
        mNums.textContent = t('arcade.guessNumbers');
        mNums.addEventListener('click', () => { mode = 'numbers'; renderSetup(); });

        const mWords = document.createElement('button');
        mWords.className = 'guess-mode' + (mode === 'words' ? ' is-active' : '');
        mWords.textContent = t('arcade.guessWords');
        mWords.addEventListener('click', () => { mode = 'words'; renderSetup(); });

        const mHang = document.createElement('button');
        mHang.className = 'guess-mode' + (mode === 'hangman' ? ' is-active' : '');
        mHang.textContent = t('arcade.guessHangman');
        mHang.addEventListener('click', () => { mode = 'hangman'; renderSetup(); });

        modes.appendChild(mNums);
        modes.appendChild(mWords);
        modes.appendChild(mHang);
        stage.appendChild(modes);

        const setup = document.createElement('div');
        setup.className = 'guess-setup';

        if (mode === 'numbers') {
          setup.innerHTML =
            '<label>' + t('arcade.guessMaxNumber') +
              '<input type="number" id="g-max" min="2" max="100000" value="100" />' +
            '</label>';
        } else if (mode === 'words') {
          setup.innerHTML =
            '<label>' + t('arcade.guessMinLen') +
              '<input type="number" id="g-min" min="4" max="12" value="4" />' +
            '</label>' +
            '<label>' + t('arcade.guessMaxLen') +
              '<input type="number" id="g-maxlen" min="4" max="12" value="8" />' +
            '</label>';
        } else {
          setup.innerHTML =
            '<label>' + t('arcade.guessMinLen') +
              '<input type="number" id="g-min" min="4" max="12" value="4" />' +
            '</label>' +
            '<label>' + t('arcade.guessMaxLen') +
              '<input type="number" id="g-maxlen" min="4" max="12" value="8" />' +
            '</label>';
        }

        const start = document.createElement('button');
        start.className = 'pill';
        start.textContent = t('arcade.guessStart');
        start.addEventListener('click', runGame);
        setup.appendChild(start);

        stage.appendChild(setup);
      }

      function runGame() {
        stage.innerHTML = '';

        const info = document.createElement('div');
        info.className = 'guess-stage';
        stage.appendChild(info);

        if (mode === 'numbers') {
          const maxEl = document.getElementById('g-max');
          const max = Math.max(2, parseInt(maxEl.value, 10) || 100);
          const secret = Math.floor(Math.random() * max) + 1;
          let attempts = 0;
          const history = [];

          function renderNum() {
            info.innerHTML =
              '<div class="guess-text">' + t('arcade.guessNumbers') + ': 1 - ' + max + '</div>' +
              '<div class="guess-row">' +
                '<input type="number" id="g-input" min="1" max="' + max + '" />' +
                '<button class="pill" id="g-go">OK</button>' +
              '</div>' +
              '<div class="guess-history">' +
                history.map(h => h.v + ' — ' + h.r).join('<br>') +
              '</div>';

            const goBtn = info.querySelector('#g-go');
            const input = info.querySelector('#g-input');
            input.focus();
            input.addEventListener('keydown', e => { if (e.key === 'Enter') goBtn.click(); });
            goBtn.addEventListener('click', () => {
              const v = parseInt(input.value, 10);
              if (isNaN(v)) return;
              attempts++;
              if (v === secret) {
                history.push({ v: v, r: t('arcade.guessCorrect') });
                info.querySelector('.guess-history').innerHTML = history.map(h => h.v + ' — ' + h.r).join('<br>');
                info.querySelector('.guess-row').innerHTML = '<div class="guess-text">' + t('arcade.guessCorrect') + ' (' + attempts + ')</div>';
                return;
              }
              const rel = v < secret ? '↑' : '↓';
              history.push({ v: v, r: rel });
              renderNum();
            });
          }
          renderNum();
        } else {
          const minEl = document.getElementById('g-min');
          const maxEl = document.getElementById('g-maxlen');
          const minLen = Math.max(4, Math.min(12, parseInt(minEl.value, 10) || 4));
          const maxLen = Math.max(minLen, Math.min(12, parseInt(maxEl.value, 10) || 8));
          const words = getWords().filter(w => w.length >= minLen && w.length <= maxLen);
          if (words.length === 0) {
            info.innerHTML = '<div class="guess-text">No words</div>';
            return;
          }
          const secret = words[Math.floor(Math.random() * words.length)];

          if (mode === 'words') {
            let attempts = 0;
            const history = [];

            function renderWord() {
              info.innerHTML =
                '<div class="guess-text">' + t('arcade.guessWords') + ': ' + minLen + ' - ' + maxLen + '</div>' +
                '<div class="guess-row">' +
                  '<input type="text" id="g-input" />' +
                  '<button class="pill" id="g-go">OK</button>' +
                '</div>' +
                '<div class="guess-history">' +
                  history.map(h => h.v + ' — ' + h.r).join('<br>') +
                '</div>';

              const goBtn = info.querySelector('#g-go');
              const input = info.querySelector('#g-input');
              input.focus();
              input.addEventListener('keydown', e => { if (e.key === 'Enter') goBtn.click(); });
              goBtn.addEventListener('click', () => {
                const v = (input.value || '').trim().toLowerCase();
                if (!v) return;
                attempts++;
                if (v === secret) {
                  info.innerHTML = '<div class="guess-text">' + t('arcade.guessCorrect') + ' (' + attempts + ')</div>';
                  return;
                }
                const rel = v < secret ? '↑' : '↓';
                history.push({ v: v, r: rel });
                renderWord();
              });
            }
            renderWord();
          } else {
            const used = [];
            const correctSet = new Set(secret.split(''));
            let wrong = 0;
            const maxWrong = Math.max(2, secret.length - 1);

            function renderHang() {
              const masked = secret.split('').map(ch => used.indexOf(ch) !== -1 ? ch : '_').join(' ');
              const alphabet = (document.documentElement.lang === 'ru')
                ? 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('')
                : 'abcdefghijklmnopqrstuvwxyz'.split('');

              info.innerHTML =
                '<div class="guess-text">' + t('arcade.hangmanHint') + '</div>' +
                '<div class="hangman-word">' + masked + '</div>' +
                '<div class="guess-text">' + t('arcade.guessAttemptsLeft') + ': ' + (maxWrong - wrong) + '</div>' +
                '<div class="hangman-letters">' +
                  alphabet.map(ch => {
                    const cls = used.indexOf(ch) !== -1
                      ? (correctSet.has(ch) ? ' is-used is-correct' : ' is-used is-wrong')
                      : '';
                    return '<button class="hangman-letter' + cls + '" data-ch="' + ch + '">' + ch + '</button>';
                  }).join('') +
                '</div>';

              info.querySelectorAll('.hangman-letter').forEach(btn => {
                btn.addEventListener('click', () => {
                  const ch = btn.dataset.ch;
                  if (used.indexOf(ch) !== -1) return;
                  used.push(ch);
                  if (correctSet.has(ch)) {
                    const allFound = secret.split('').every(c => used.indexOf(c) !== -1);
                    if (allFound) {
                      info.innerHTML = '<div class="guess-text">' + t('arcade.hangmanWin') + ': ' + secret + '</div>';
                      return;
                    }
                  } else {
                    wrong++;
                    if (wrong >= maxWrong) {
                      info.innerHTML = '<div class="guess-text">' + t('arcade.hangmanLose') + ': ' + secret + '</div>';
                      return;
                    }
                  }
                  renderHang();
                });
              });
            }
            renderHang();
          }
        }
      }

      renderSetup();
    }

    function startSolitaire() {
      const { stage } = prepareGame();
      const wrap = document.createElement('div');
      wrap.className = 'solitaire';
      stage.appendChild(wrap);

      const SUITS = ['♠', '♥', '♦', '♣'];
      const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      const RED = ['♥', '♦'];

      let stock = [];
      let waste = [];
      let foundations = [[], [], [], []];
      let tableau = [[], [], [], [], [], [], []];
      let selected = null;
      let selectedFrom = null;

      function buildDeck() {
        const deck = [];
        for (const s of SUITS) {
          for (let r = 0; r < RANKS.length; r++) {
            deck.push({ suit: s, rank: r, faceUp: false });
          }
        }
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
      }

      function deal() {
        const deck = buildDeck();
        stock = [];
        waste = [];
        foundations = [[], [], [], []];
        tableau = [[], [], [], [], [], [], []];
        selected = null;
        selectedFrom = null;
        for (let i = 0; i < 7; i++) {
          for (let j = i; j < 7; j++) {
            const card = deck.pop();
            if (i === j) card.faceUp = true;
            tableau[j].push(card);
          }
        }
        stock = deck.slice();
      }

      function isRed(card) { return RED.indexOf(card.suit) !== -1; }

      function cardHTML(card, clickable) {
        if (!card) return '<div class="s-card s-card--empty"></div>';
        if (!card.faceUp) return '<div class="s-card s-card--back"' + (clickable ? ' data-clickable="1"' : '') + '></div>';
        const cls = isRed(card) ? 's-card--red' : 's-card--black';
        return '<div class="s-card ' + cls + '"' + (clickable ? ' data-clickable="1"' : '') + '>' +
          '<span class="s-card__rank">' + RANKS[card.rank] + '</span>' +
          '<span class="s-card__suit">' + card.suit + '</span>' +
        '</div>';
      }

      function render() {
        let html = '<div class="solitaire__top">';
        html += '<div class="s-pile s-pile--stock" data-pile="stock">' +
          (stock.length > 0 ? '<div class="s-card s-card--back" data-clickable="1"></div>' : '<div class="s-card s-card--empty"></div>') +
        '</div>';
        html += '<div class="s-pile s-pile--waste" data-pile="waste">' +
          (waste.length > 0 ? cardHTML(waste[waste.length - 1], true) : '<div class="s-card s-card--empty"></div>') +
        '</div>';
        html += '<div class="solitaire__spacer"></div>';
        for (let i = 0; i < 4; i++) {
          html += '<div class="s-pile s-pile--foundation" data-pile="foundation" data-index="' + i + '">' +
            (foundations[i].length > 0 ? cardHTML(foundations[i][foundations[i].length - 1], true) : '<div class="s-card s-card--empty">' + SUITS[i] + '</div>') +
          '</div>';
        }
        html += '</div>';

        html += '<div class="solitaire__tableau">';
        for (let i = 0; i < 7; i++) {
          html += '<div class="s-column" data-pile="tableau" data-index="' + i + '">';
          tableau[i].forEach((card, j) => {
            const offset = j * 22;
            const isTop = j === tableau[i].length - 1;
            html += '<div class="s-column__card" style="top:' + offset + 'px">' +
              cardHTML(card, isTop || card.faceUp) +
            '</div>';
          });
          html += '</div>';
        }
        html += '</div>';

        const footer = document.createElement('div');
        footer.className = 'solitaire__footer';
        footer.style.display = 'flex';
        footer.style.gap = '8px';
        footer.style.marginTop = '12px';
        footer.style.justifyContent = 'center';
        footer.innerHTML =
          '<button class="pill pill--ghost" id="sol-new">' + t('arcade.solitaireNewDeal') + '</button>';

        wrap.innerHTML = html;
        wrap.appendChild(footer);

        wrap.querySelectorAll('[data-clickable]').forEach(el => {
          el.addEventListener('click', e => {
            e.stopPropagation();
            handleClick(el);
          });
        });

        wrap.querySelector('#sol-new').addEventListener('click', () => {
          deal();
          render();
        });
      }

      function handleClick(el) {
        const pile = el.closest('[data-pile]');
        if (!pile) return;
        const pileName = pile.dataset.pile;
        const idx = parseInt(pile.dataset.index);

        if (pileName === 'stock') {
          if (stock.length === 0) {
            stock = waste.reverse().map(c => ({ ...c, faceUp: false }));
            waste = [];
          } else {
            const card = stock.pop();
            card.faceUp = true;
            waste.push(card);
          }
          selected = null;
          render();
          return;
        }

        if (pileName === 'waste') {
          if (selected) {
            tryFoundation(waste[waste.length - 1]);
          } else if (waste.length > 0) {
            selected = waste[waste.length - 1];
            selectedFrom = { pile: 'waste' };
          }
          render();
          return;
        }

        if (pileName === 'foundation') {
          if (selected) {
            const card = selected;
            const f = foundations[idx];
            const top = f[f.length - 1];
            if ((!top && card.rank === 0) || (top && top.suit === card.suit && card.rank === top.rank + 1)) {
              f.push(card);
              removeFromSource();
              checkWin();
            }
          }
          selected = null;
          render();
          return;
        }

        if (pileName === 'tableau') {
          const col = tableau[idx];

          if (selected) {
            const top = col[col.length - 1];
            const card = selected;
            const canPlace = (!top && card.rank === 12) ||
              (top && top.faceUp && isRed(card) !== isRed(top) && card.rank === top.rank - 1);
            if (canPlace) {
              col.push(card);
              removeFromSource();
            }
            selected = null;
            render();
            return;
          }

          if (col.length === 0) return;
          const topCard = col[col.length - 1];
          if (!topCard.faceUp) {
            topCard.faceUp = true;
            render();
            return;
          }
          selected = topCard;
          selectedFrom = { pile: 'tableau', index: idx };
          render();
          return;
        }
      }

      function tryFoundation(card) {
        for (let i = 0; i < 4; i++) {
          const f = foundations[i];
          const top = f[f.length - 1];
          if ((!top && card.rank === 0) || (top && top.suit === card.suit && card.rank === top.rank + 1)) {
            f.push(card);
            selected = null;
            if (selectedFrom && selectedFrom.pile === 'waste') waste.pop();
            selectedFrom = null;
            checkWin();
            return;
          }
        }
      }

      function removeFromSource() {
        if (!selectedFrom) return;
        if (selectedFrom.pile === 'waste') waste.pop();
        else if (selectedFrom.pile === 'tableau') {
          tableau[selectedFrom.index].pop();
        }
        selectedFrom = null;
      }

      function checkWin() {
        if (foundations.every(f => f.length === 13)) {
          const go = document.createElement('div');
          go.className = 'arcade-gameover arcade-gameover--win';
          go.textContent = t('arcade.win') + ' · ' + t('arcade.pressR');
          stage.appendChild(go);
          if (typeof unlockAchievement === 'function') unlockAchievement('solitaire');
        }
      }

      deal();
      render();
    }

    function startMinesweeper() {
      const { stage } = prepareGame();
      const wrap = document.createElement('div');
      wrap.className = 'minesweeper';
      stage.appendChild(wrap);

      let COLS = 9;
      let ROWS = 9;
      let MINES = 10;
      let grid, revealed, flagged, gameOver, won, flagMode;

      function reset() {
        grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
        revealed = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
        flagged = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
        gameOver = false;
        won = false;
        flagMode = false;

        let placed = 0;
        while (placed < MINES) {
          const r = Math.floor(Math.random() * ROWS);
          const c = Math.floor(Math.random() * COLS);
          if (grid[r][c] !== -1) {
            grid[r][c] = -1;
            placed++;
          }
        }

        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            if (grid[r][c] === -1) continue;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] === -1) count++;
              }
            }
            grid[r][c] = count;
          }
        }
      }

      function reveal(r, c) {
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
        if (revealed[r][c] || flagged[r][c]) return;
        revealed[r][c] = true;
        if (grid[r][c] === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              reveal(r + dr, c + dc);
            }
          }
        }
      }

      function checkWin() {
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            if (grid[r][c] !== -1 && !revealed[r][c]) return false;
          }
        }
        return true;
      }

      function renderSetup() {
        wrap.innerHTML =
          '<div class="ms-setup">' +
            '<label>' + t('arcade.size') +
              '<input type="number" id="ms-size" min="6" max="20" value="' + COLS + '" />' +
            '</label>' +
            '<label>' + t('arcade.mines') +
              '<input type="number" id="ms-mines" min="1" max="200" value="' + MINES + '" />' +
            '</label>' +
            '<button class="pill" id="ms-start">' + t('arcade.newGame') + '</button>' +
          '</div>';

        wrap.querySelector('#ms-start').addEventListener('click', () => {
          const s = parseInt(wrap.querySelector('#ms-size').value, 10);
          const m = parseInt(wrap.querySelector('#ms-mines').value, 10);
          COLS = Math.max(6, Math.min(20, s || 9));
          ROWS = COLS;
          const maxMines = Math.floor(COLS * ROWS * 0.7);
          MINES = Math.max(1, Math.min(maxMines, m || 10));
          reset();
          render();
        });
      }

      function render() {
        let html = '<div class="ms-header">';
        html += '<button class="ms-btn' + (flagMode ? ' is-active' : '') + '" id="ms-flag">🚩 ' + t('arcade.flagMode') + '</button>';
        html += '<button class="ms-btn" id="ms-restart">↻</button>';
        html += '<div class="ms-info">' + t('arcade.mines') + ': ' + MINES + '</div>';
        html += '</div>';
        html += '<div class="ms-grid" style="grid-template-columns: repeat(' + COLS + ', 1fr);">';
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const rev = revealed[r][c];
            const flag = flagged[r][c];
            const v = grid[r][c];
            let cls = 'ms-cell';
            let content = '';
            if (rev) {
              cls += ' ms-cell--revealed';
              if (v === -1) { cls += ' ms-cell--mine'; content = '💥'; }
              else if (v > 0) { content = v; cls += ' ms-cell--n' + v; }
            } else if (flag) {
              content = '🚩';
            }
            html += '<div class="' + cls + '" data-r="' + r + '" data-c="' + c + '">' + content + '</div>';
          }
        }
        html += '</div>';

        if (gameOver) {
          html += '<div class="arcade-gameover ' + (won ? 'arcade-gameover--win' : '') + '">' +
            (won ? t('arcade.msWin') : t('arcade.msLose')) + ' · ' + t('arcade.pressR') +
          '</div>';
        }

        wrap.innerHTML = html;

        const flagBtn = wrap.querySelector('#ms-flag');
        if (flagBtn) flagBtn.addEventListener('click', () => { flagMode = !flagMode; render(); });

        const restartBtn = wrap.querySelector('#ms-restart');
        if (restartBtn) restartBtn.addEventListener('click', () => { reset(); render(); });

        wrap.querySelectorAll('.ms-cell').forEach(cell => {
          cell.addEventListener('click', () => {
            if (gameOver) return;
            const r = parseInt(cell.dataset.r);
            const c = parseInt(cell.dataset.c);
            if (flagMode) {
              if (!revealed[r][c]) flagged[r][c] = !flagged[r][c];
              render();
              return;
            }
            if (flagged[r][c]) return;
            if (grid[r][c] === -1) {
              revealed[r][c] = true;
              gameOver = true;
              won = false;
              render();
              return;
            }
            reveal(r, c);
            if (checkWin()) {
              gameOver = true;
              won = true;
              if (typeof unlockAchievement === 'function') unlockAchievement('minesweeper');
            }
            render();
          });
          cell.addEventListener('contextmenu', e => {
            e.preventDefault();
            if (gameOver) return;
            const r = parseInt(cell.dataset.r);
            const c = parseInt(cell.dataset.c);
            if (!revealed[r][c]) flagged[r][c] = !flagged[r][c];
            render();
          });
        });
      }

      reset();
      render();
    }

    function startClicker() {
      const { stage, scoreBar } = prepareGame();
      const wrap = document.createElement('div');
      wrap.className = 'clicker';
      stage.appendChild(wrap);

      let count = 0;

      try {
        const saved = localStorage.getItem('clicker_count');
        if (saved) count = parseInt(saved) || 0;
      } catch (e) {}

      updateScore(scoreBar, count);

      function render() {
        wrap.innerHTML =
          '<div class="clicker__stage">' +
            '<div class="clicker__cat">' +
              '<div class="clicker__cat-body">' +
                '<div class="clicker__cat-ear clicker__cat-ear--l"></div>' +
                '<div class="clicker__cat-ear clicker__cat-ear--r"></div>' +
                '<div class="clicker__cat-face">' +
                  '<div class="clicker__cat-eye clicker__cat-eye--l"></div>' +
                  '<div class="clicker__cat-eye clicker__cat-eye--r"></div>' +
                  '<div class="clicker__cat-nose"></div>' +
                '</div>' +
                '<div class="clicker__cat-paw"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="clicker__count">' + t('arcade.clicks') + ': ' + count + '</div>' +
          '<div class="clicker__hint">' + t('arcade.clickCat') + '</div>';

        const cat = wrap.querySelector('.clicker__cat');
        cat.addEventListener('click', () => {
          count++;
          updateScore(scoreBar, count);
          try { localStorage.setItem('clicker_count', String(count)); } catch (e) {}

          cat.classList.add('is-paw');
          setTimeout(() => cat.classList.remove('is-paw'), 250);

          const cnt = wrap.querySelector('.clicker__count');
          if (cnt) cnt.textContent = t('arcade.clicks') + ': ' + count;

          if (count >= 1000000 && typeof unlockAchievement === 'function') unlockAchievement('clicker1000000');
        });
      }

      render();
    }

    renderMenu();
  }

  window.renderArcade = renderArcade;
})();