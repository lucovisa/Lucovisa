(function () {
  const CURSOR_KEY = 'custom_cursor_enabled';
  const cursorEnabled = true;

  const ARROW_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 2 L3 18 L7 14 L10 21 L12 20 L9 13 L15 13 Z" fill="#FFFFFF" stroke="#0F1218" stroke-width="1.5" stroke-linejoin="round" shape-rendering="crispEdges"/><path d="M3 2 L3 18 L7 14 L10 21 L12 20 L9 13 L15 13 Z" fill="none" stroke="#66C0F4" stroke-width="0.5" stroke-linejoin="round" shape-rendering="crispEdges"/></svg>';

  const POINTER_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 2 L10 12 L13 10 L15 15 L17 14 L15 9 L18 9 Z" fill="#FFFFFF" stroke="#0F1218" stroke-width="1.5" stroke-linejoin="round" shape-rendering="crispEdges"/><path d="M10 2 L10 12 L13 10 L15 15 L17 14 L15 9 L18 9 Z" fill="none" stroke="#F5B301" stroke-width="0.5" stroke-linejoin="round" shape-rendering="crispEdges"/></svg>';

  const TEXT_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="8" y="3" width="2" height="18" fill="#FFFFFF" stroke="#0F1218" stroke-width="1.5" shape-rendering="crispEdges"/><rect x="14" y="3" width="2" height="18" fill="#FFFFFF" stroke="#0F1218" stroke-width="1.5" shape-rendering="crispEdges"/><rect x="8" y="3" width="8" height="2" fill="#FFFFFF" stroke="#0F1218" stroke-width="1.5" shape-rendering="crispEdges"/><rect x="8" y="19" width="8" height="2" fill="#FFFFFF" stroke="#0F1218" stroke-width="1.5" shape-rendering="crispEdges"/></svg>';

  const GRAB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 4 L8 8 L7 8 L7 6 L6 6 L6 9 L5 9 L5 7 L4 7 L4 12 L4 18 C4 20 6 22 9 22 L15 22 C18 22 20 20 20 18 L20 12 L19 12 L19 10 L18 10 L18 12 L17 12 L17 9 L16 9 L16 12 L15 12 L15 9 L14 9 L14 12 L13 12 L13 5 L12 5 L12 12 L11 12 L11 4 Z" fill="#FFFFFF" stroke="#0F1218" stroke-width="1.3" stroke-linejoin="round" shape-rendering="crispEdges"/></svg>';

  function svgToCursor(svg, hotspotX, hotspotY) {
    const encoded = encodeURIComponent(svg);
    return 'url("data:image/svg+xml;charset=utf-8,' + encoded + '") ' + hotspotX + ' ' + hotspotY + ', auto';
  }

  function applyCursor() {
    if (!cursorEnabled) return;

    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent =
      '* { cursor: ' + svgToCursor(ARROW_SVG, 3, 2) + ' !important; }' +
      'button, a, .app-icon, .pill, .toggle__btn, .taskbar__start, .taskbar__app, .start-menu__item, .start-menu__edit, .start-menu__avatar, .menu__item, .context-menu__item, [role="button"] { cursor: ' + svgToCursor(POINTER_SVG, 10, 2) + ' !important; }' +
      'input[type="text"], input[type="email"], input[type="url"], input[type="search"], input[type="password"], textarea, .terminal__input, .modal__input { cursor: ' + svgToCursor(TEXT_SVG, 9, 3) + ' !important; }' +
      '[data-drag], .window__titlebar, .modal__titlebar, .map-node-g { cursor: ' + svgToCursor(GRAB_SVG, 12, 12) + ' !important; }' +
      '[data-drag]:active, .window__titlebar:active, .modal__titlebar:active, .map-node-g:active, .map-node-g.is-dragging { cursor: ' + svgToCursor(GRAB_SVG, 12, 12) + ' !important; }';

    document.head.appendChild(style);
  }

  function removeCursor() {
    const existing = document.getElementById('custom-cursor-style');
    if (existing) existing.remove();
  }

  function setCursorEnabled(enabled) {
    try { localStorage.setItem(CURSOR_KEY, enabled ? '1' : '0'); } catch (e) {}
    if (enabled) applyCursor();
    else removeCursor();
  }

  function isCursorEnabled() {
    try {
      const saved = localStorage.getItem(CURSOR_KEY);
      if (saved === '0') return false;
      return true;
    } catch (e) { return true; }
  }

  window.setCursorEnabled = setCursorEnabled;
  window.isCursorEnabled = isCursorEnabled;

  if (isCursorEnabled()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyCursor);
    } else {
      applyCursor();
    }
  }
})();