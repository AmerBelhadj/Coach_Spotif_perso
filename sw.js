const CACHE_NAME = 'fitcoach-v2.1';
const SHELL_URLS = ['./', './index.html', './assets/js/app.js', './manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network only: API + fonts + CDN
  if (url.hostname.includes('anthropic.com') || url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com') || url.hostname.includes('jsdelivr.net')) {
    event.respondWith(fetch(event.request).catch(() => new Response('offline', {status:503})));
    return;
  }

  // Navigation → serve index.html from cache (FIX 404 on relaunch)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(cached => {
        if (cached) return cached;
        return fetch('./index.html').then(r => {
          const clone = r.clone();
          caches.open(CACHE_NAME).then(c => c.put('./index.html', clone));
          return r;
        });
      })
    );
    return;
  }

  // Cache first + network fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(r => {
        if (r && r.status === 200 && r.type !== 'opaque') {
          caches.open(CACHE_NAME).then(c => c.put(event.request, r.clone()));
        }
        return r;
      }).catch(() => event.request.destination === 'image'
        ? new Response('', {status:200}) : new Response('Offline', {status:503}));
    })
  );
});
