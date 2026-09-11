(function () {
  const STORAGE_KEY = 'achievements_unlocked';

  const ACHIEVEMENTS = [
    { id: 'first_app',         titleKey: 'ach.first_app.title',         descKey: 'ach.first_app.desc',         commentKey: 'ach.first_app.comment',         icon: 'info' },
    { id: 'donate',            titleKey: 'ach.donate.title',            descKey: 'ach.donate.desc',            commentKey: 'ach.donate.comment',            icon: 'heart' },
    { id: 'secret',            titleKey: 'ach.secret.title',            descKey: 'ach.secret.desc',            commentKey: 'ach.secret.comment',            icon: 'star', hidden: true },
    { id: 'style',             titleKey: 'ach.style.title',             descKey: 'ach.style.desc',             commentKey: 'ach.style.comment',             icon: 'settings' },
    { id: 'snake1000',         titleKey: 'ach.snake1000.title',         descKey: 'ach.snake1000.desc',         commentKey: 'ach.snake1000.comment',         icon: 'joystick' },
    { id: 'snake2d1000',       titleKey: 'ach.snake2d1000.title',       descKey: 'ach.snake2d1000.desc',       commentKey: 'ach.snake2d1000.comment',       icon: 'joystick' },
    { id: 'tetris10000',       titleKey: 'ach.tetris10000.title',       descKey: 'ach.tetris10000.desc',       commentKey: 'ach.tetris10000.comment',       icon: 'joystick' },
    { id: 'clicker1000000',    titleKey: 'ach.clicker1000000.title',    descKey: 'ach.clicker1000000.desc',    commentKey: 'ach.clicker1000000.comment',    icon: 'heart' },
    { id: 'minesweeper',       titleKey: 'ach.minesweeper.title',       descKey: 'ach.minesweeper.desc',       commentKey: 'ach.minesweeper.comment',       icon: 'minesweeper' },
    { id: 'solitaire',         titleKey: 'ach.solitaire.title',         descKey: 'ach.solitaire.desc',         commentKey: 'ach.solitaire.comment',         icon: 'solitaire' },
    { id: '2048_score',        titleKey: 'ach.2048_score.title',        descKey: 'ach.2048_score.desc',        commentKey: 'ach.2048_score.comment',        icon: 'grid' },
    { id: '2048_record',       titleKey: 'ach.2048_record.title',       descKey: 'ach.2048_record.desc',       commentKey: 'ach.2048_record.comment',       icon: 'grid' },
    { id: 'guess_win',         titleKey: 'ach.guess_win.title',         descKey: 'ach.guess_win.desc',         commentKey: 'ach.guess_win.comment',         icon: 'info' },
    { id: 'sudoku',            titleKey: 'ach.sudoku.title',            descKey: 'ach.sudoku.desc',            commentKey: 'ach.sudoku.comment',            icon: 'grid' }
  ];

  function getUnlocked() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const obj = JSON.parse(raw);
      return (obj && typeof obj === 'object') ? obj : {};
    } catch (e) { return {}; }
  }

  function saveUnlocked(obj) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); } catch (e) {}
  }

  function isUnlocked(id) {
    return !!getUnlocked()[id];
  }

  function countUnlocked() {
    const u = getUnlocked();
    return ACHIEVEMENTS.filter(a => u[a.id]).length;
  }

  function countHiddenLeft() {
    const u = getUnlocked();
    return ACHIEVEMENTS.filter(a => a.hidden && !u[a.id]).length;
  }

  function getPosition() {
    try { return localStorage.getItem('achievement_position') || 'top-left'; }
    catch (e) { return 'top-left'; }
  }

  function showAchievementToast(ach) {
    const layer = document.getElementById('achievement-layer');
    if (!layer) return;

    const pos = getPosition();
    const el = document.createElement('div');
    el.className = 'achievement-toast achievement-toast--' + pos;

    const icon = document.createElement('div');
    icon.className = 'achievement-toast__icon';
    icon.innerHTML = ICONS.trophy;

    const body = document.createElement('div');
    body.className = 'achievement-toast__body';

    const title = document.createElement('div');
    title.className = 'achievement-toast__title';
    title.textContent = t('achievements.new');

    const name = document.createElement('div');
    name.className = 'achievement-toast__name';
    name.textContent = t(ach.titleKey);

    const desc = document.createElement('div');
    desc.className = 'achievement-toast__desc';
    desc.textContent = t(ach.descKey);

    body.appendChild(title);
    body.appendChild(name);
    body.appendChild(desc);

    el.appendChild(icon);
    el.appendChild(body);

    layer.appendChild(el);

    setTimeout(() => {
      el.classList.add('achievement-toast--out');
      setTimeout(() => el.remove(), 400);
    }, 4500);
  }

  function refreshOpenAchievementsWindow() {
    const win = document.querySelector('.window[data-app="achievements"]');
    if (!win) return;
    const body = win.querySelector('.window__body');
    if (!body) return;
    if (typeof renderAchievements === 'function') renderAchievements(body);
  }

  function unlock(id) {
    const u = getUnlocked();
    if (u[id]) return false;

    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach) return false;

    u[id] = Date.now();
    saveUnlocked(u);

    showAchievementToast(ach);

    setTimeout(() => refreshOpenAchievementsWindow(), 120);

    return true;
  }

  function checkStyleAchievement() {
    let hasName = false;
    let hasAvatar = false;
    let hasWallpaper = false;

    try {
      const name = localStorage.getItem('username');
      if (name && name.trim()) hasName = true;

      const av = localStorage.getItem('avatar');
      if (av && av.length > 0) hasAvatar = true;

      const wp = localStorage.getItem('wallpaper');
      if (wp && wp.length > 0) hasWallpaper = true;
    } catch (e) {}

    if (hasName && hasAvatar && hasWallpaper) unlock('style');
  }

  function getList() {
    const u = getUnlocked();
    return ACHIEVEMENTS.map(a => ({
      id: a.id,
      titleKey: a.titleKey,
      descKey: a.descKey,
      commentKey: a.commentKey,
      icon: a.icon,
      hidden: a.hidden,
      unlocked: !!u[a.id],
      unlockedAt: u[a.id] || null
    }));
  }

  window.ACHIEVEMENTS = ACHIEVEMENTS;
  window.getAchievements = getList;
  window.unlockAchievement = unlock;
  window.isAchievementUnlocked = isUnlocked;
  window.countAchievementsUnlocked = countUnlocked;
  window.countAchievementsHiddenLeft = countHiddenLeft;
  window.checkStyleAchievement = checkStyleAchievement;
  window.refreshOpenAchievementsWindow = refreshOpenAchievementsWindow;
})();