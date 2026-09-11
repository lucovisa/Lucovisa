(function () {
  const STORAGE_KEY = 'achievements_unlocked';
  const ACHIEVEMENTS = [
    {
      id: 'first_app',
      titleKey: 'ach.first_app.title',
      descKey: 'ach.first_app.desc',
      commentKey: 'ach.first_app.comment',
      icon: 'info'
    },
    {
      id: 'donate',
      titleKey: 'ach.donate.title',
      descKey: 'ach.donate.desc',
      commentKey: 'ach.donate.comment',
      icon: 'heart'
    },
    {
      id: 'secret',
      titleKey: 'ach.secret.title',
      descKey: 'ach.secret.desc',
      commentKey: 'ach.secret.comment',
      icon: 'star',
      hidden: true
    },
    {
      id: 'style',
      titleKey: 'ach.style.title',
      descKey: 'ach.style.desc',
      commentKey: 'ach.style.comment',
      icon: 'settings'
    }
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
    const u = getUnlocked();
    return !!u[id];
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
    try {
      return localStorage.getItem('achievement_position') || 'bottom-right';
    } catch (e) { return 'bottom-right'; }
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

  function unlock(id) {
    const u = getUnlocked();
    if (u[id]) return false;

    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach) return false;

    u[id] = Date.now();
    saveUnlocked(u);

    showAchievementToast(ach);

    if (typeof rerenderOpenWindows === 'function') {
      setTimeout(() => rerenderOpenWindows(), 100);
    }

    return true;
  }

  function checkStyleAchievement() {
    const usernameKey = 'username';
    const avatarKey = 'avatar';
    const wallpaperKey = 'wallpaper';

    let hasName = false;
    let hasAvatar = false;
    let hasWallpaper = false;

    try {
      const name = localStorage.getItem(usernameKey);
      if (name && name.trim()) hasName = true;

      const av = localStorage.getItem(avatarKey);
      if (av && av.length > 0) hasAvatar = true;

      const wp = localStorage.getItem(wallpaperKey);
      if (wp && wp.length > 0) hasWallpaper = true;
    } catch (e) {}

    if (hasName && hasAvatar && hasWallpaper) {
      unlock('style');
    }
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
})();