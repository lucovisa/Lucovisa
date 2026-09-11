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

  function renderArcade(body) {
    let currentGame = null;
    let cleanup = null;

    function renderMenu() {
      if (cleanup) { cleanup(); cleanup = null; }
      currentGame = null;

      body.innerHTML =
        '<div class="arcade">' +
          '<div class="arcade__menu">' +
            '<button class="arcade__item" data-game="snake3d">' +
              '<span class="app-icon__svg arcade__item-icon" data-svg="joystick"></span>' +
              '<span>' + t('arcade.snake3d') + '</span>' +
            '</button>' +
            '<button class="arcade__item" data-game="tetris">' +
              '<span class="app-icon__svg arcade__item-icon" data-svg="joystick"></span>' +
              '<span>' + t('arcade.tetris') + '</span>' +
            '</button>' +
            '<button class="arcade__item" data-game="solitaire">' +
              '<span class="app-icon__svg arcade__item-icon" data-svg="folder"></span>' +
              '<span>' + t('arcade.solitaire') + '</span>' +
            '</button>' +
            '<button class="arcade__item" data-game="minesweeper">' +
              '<span class="app-icon__svg arcade__item-icon" data-svg="web"></span>' +
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
          else if (game === 'tetris') startTetrisArcade();
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

      const hint = document.createElement('div');
      hint.className = 'arcade-hint';
      hint.textContent = t('arcade.pressQ');
      stage.appendChild(hint);

      const ctx = canvas.getContext('2d');
      const COLS = 15;
      const ROWS = 15;
      const CELL = 30;
      const ISO_X = 22;
      const ISO_Y = 11;
      const OFFSET_X = canvas.width / 2;
      const OFFSET_Y = 100;

      let snake, dir, food, alive, score, loop;

      function project(x, y, z) {
        const px = OFFSET_X + (x - y) * ISO_X;
        const py = OFFSET_Y + (x + y) * ISO_Y - z;
        return { x: px, y: py };
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

      function shadeColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
        const B = Math.max(0, Math.min(255, (num & 0xff) + amt));
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
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

    function startTetrisArcade() {
      const { stage, scoreBar } = prepareGame();
      const canvas = document.createElement('canvas');
      canvas.className = 'arcade-canvas';
      canvas.width = 300;
      canvas.height = 480;
      stage.appendChild(canvas);

      const hint = document.createElement('div');
      hint.className = 'arcade-hint';
      hint.textContent = t('arcade.pressQ');
      stage.appendChild(hint);

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

    function startSolitaire() {
      const { stage } = prepareGame();
      const wrap = document.createElement('div');
      wrap.className = 'solitaire';
      stage.appendChild(wrap);

      const SUITS = ['♠', '♥', '♦', '♣'];
      const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      const RED = ['♥', '♦'];

      let deck = [];
      let stock = [];
      let waste = [];
      let foundations = [[], [], [], []];
      let tableau = [[], [], [], [], [], [], []];

      function buildDeck() {
        deck = [];
        for (const s of SUITS) {
          for (let r = 0; r < RANKS.length; r++) {
            deck.push({ suit: s, rank: r, faceUp: false });
          }
        }
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
      }

      function deal() {
        buildDeck();
        stock = [];
        waste = [];
        foundations = [[], [], [], []];
        tableau = [[], [], [], [], [], [], []];
        for (let i = 0; i < 7; i++) {
          for (let j = i; j < 7; j++) {
            const card = deck.pop();
            if (i === j) card.faceUp = true;
            tableau[j].push(card);
          }
        }
        stock = deck.slice();
        deck = [];
      }

      function cardHTML(card, clickable) {
        if (!card) return '<div class="s-card s-card--empty"></div>';
        if (!card.faceUp) return '<div class="s-card s-card--back"' + (clickable ? ' data-clickable="1"' : '') + '></div>';
        const cls = RED.indexOf(card.suit) !== -1 ? 's-card--red' : 's-card--black';
        return '<div class="s-card ' + cls + '"' + (clickable ? ' data-clickable="1"' : '') + '>' +
          '<span class="s-card__rank">' + RANKS[card.rank] + '</span>' +
          '<span class="s-card__suit">' + card.suit + '</span>' +
        '</div>';
      }

      let selected = null;
      let selectedFrom = null;

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

        wrap.innerHTML = html;

        wrap.querySelectorAll('[data-clickable]').forEach(el => {
          el.addEventListener('click', e => {
            e.stopPropagation();
            handleClick(el);
          });
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
            tryPlaceOnFoundation(waste[waste.length - 1], 'waste');
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

      function tryPlaceOnFoundation(card, fromPile) {
        for (let i = 0; i < 4; i++) {
          const f = foundations[i];
          const top = f[f.length - 1];
          if ((!top && card.rank === 0) || (top && top.suit === card.suit && card.rank === top.rank + 1)) {
            f.push(card);
            selected = null;
            if (fromPile === 'waste') waste.pop();
            checkWin();
            return;
          }
        }
      }

      function removeFromSource() {
        if (!selectedFrom) return;
        if (selectedFrom.pile === 'waste') waste.pop();
        else if (selectedFrom.pile === 'tableau') {
          const col = tableau[selectedFrom.index];
          col.pop();
        }
        selectedFrom = null;
      }

      function isRed(card) {
        return RED.indexOf(card.suit) !== -1;
      }

      function checkWin() {
        if (foundations.every(f => f.length === 13)) {
          const go = document.createElement('div');
          go.className = 'arcade-gameover arcade-gameover--win';
          go.textContent = t('arcade.win');
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

      const COLS = 9;
      const ROWS = 9;
      const MINES = 10;

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

      function render() {
        let html = '<div class="ms-header">';
        html += '<button class="ms-btn" id="ms-flag' + (flagMode ? ' is-active' : '') + '">🚩</button>';
        html += '<div class="ms-info">' + t('arcade.mines') + ': ' + MINES + '</div>';
        html += '</div>';
        html += '<div class="ms-grid">';
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
            (won ? t('arcade.win') : t('arcade.lose')) +
          '</div>';
        }

        wrap.innerHTML = html;

        const flagBtn = wrap.querySelector('#ms-flag');
        if (flagBtn) flagBtn.addEventListener('click', () => { flagMode = !flagMode; render(); });

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
      let pawAnimating = false;

      try {
        const saved = localStorage.getItem('clicker_count');
        if (saved) count = parseInt(saved) || 0;
      } catch (e) {}

      updateScore(scoreBar, count);

      function render() {
        wrap.innerHTML =
          '<div class="clicker__stage">' +
            '<div class="clicker__cat' + (pawAnimating ? ' is-paw' : '') + '">' +
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

          pawAnimating = true;
          cat.classList.add('is-paw');
          setTimeout(() => {
            cat.classList.remove('is-paw');
          }, 250);

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