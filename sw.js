const CACHE_NAME = 'fitcoach-v1.0';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/js/app.js',
  '/data/profile.json',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Network first pour l'API Anthropic
  if (event.request.url.includes('anthropic.com') || event.request.url.includes('fonts.googleapis.com') || event.request.url.includes('cdn.jsdelivr.net')) {
    event.respondWith(fetch(event.request).catch(() => new Response('offline', {status:503})));
    return;
  }
  // Cache first pour le reste
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
      return response;
    }))
  );
});
