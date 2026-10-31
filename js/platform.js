export const store = {
  get(k, d = null) { try { const v = localStorage.getItem('ss:' + k); return v === null ? d : v; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('ss:' + k, v); } catch {} },
};
export const canFullscreen = () => !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
export function toggleFullscreen(el) {
  const d = document;
  if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
  else (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
}
export function initPlatform() {
  const root = document.documentElement, btn = document.getElementById('theme');
  const paint = () => { if (btn) btn.textContent = root.dataset.theme === 'dark' ? 'Light' : 'Dark'; };
  paint();
  btn?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    store.set('theme', root.dataset.theme); paint();
  });
  if ('serviceWorker' in navigator && location.protocol !== 'file:')
    navigator.serviceWorker.register('sw.js').catch(() => {});
}
