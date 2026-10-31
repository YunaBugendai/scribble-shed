// Service worker: offline app shell + runtime caching. Bump CACHE after each deploy.
const CACHE = 'scribble-shed-v2';
const SHELL = ['./', 'index.html', 'play.html', 'css/style.css', 'js/app.js', 'js/play.js', 'js/ads.js',
  'js/config.js', 'js/platform.js', 'games/registry.js', 'manifest.webmanifest', 'icons/icon.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(r, { ignoreSearch: true });
    const net = fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res; }).catch(() => null);
    return hit || (await net) || (r.mode === 'navigate' ? c.match('index.html') : Response.error());
  }));
});
