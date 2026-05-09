/* ═══════════════════════════════════════════════════
   COACH DIASTASIS — SERVICE WORKER (Offline-first)
═══════════════════════════════════════════════════ */

const CACHE_NAME = 'coach-diastasis-v1.0';
const STATIC_CACHE = 'static-v1.0';
const DATA_CACHE = 'data-v1.0';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/variables.css',
  './css/base.css',
  './css/components.css',
  './css/pages.css',
  './css/animations.css',
  './js/data/programme.js',
  './js/data/exercices.js',
  './js/data/nutrition.js',
  './js/utils/db.js',
  './js/utils/helpers.js',
  './js/utils/diastasisSafety.js',
  './js/store/store.js',
  './js/components/ui.js',
  './js/components/progressRing.js',
  './js/pages/dashboard.js',
  './js/pages/seance.js',
  './js/pages/progression.js',
  './js/app.js',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap',
];

// Install — cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
    }).then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== STATIC_CACHE && k !== DATA_CACHE)
            .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — Cache First for static, Network First for data
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET
  if (request.method !== 'GET') return;

  // YouTube/external — network only
  if (url.hostname.includes('youtube') || url.hostname.includes('googleapis.com') && url.pathname.includes('css')) {
    event.respondWith(
      fetch(request).catch(() => new Response('', { status: 408 }))
    );
    return;
  }

  // Static assets — Cache First
  if (STATIC_ASSETS.some(a => request.url.endsWith(a.replace('./', '')))) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(res => {
        const clone = res.clone();
        caches.open(STATIC_CACHE).then(c => c.put(request, clone));
        return res;
      }))
    );
    return;
  }

  // Default — Stale While Revalidate
  event.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(STATIC_CACHE).then(c => c.put(request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

// Push Notifications
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Coach Diastasis', {
      body: data.body || '💪 Heure de votre séance !',
      icon: './assets/icons/icon-192.png',
      badge: './assets/icons/icon-192.png',
      tag: 'seance-reminder',
      renotify: true,
      vibrate: [100, 50, 100],
      actions: [
        { action: 'open', title: '🏋️ Ouvrir la séance' },
        { action: 'dismiss', title: 'Plus tard' }
      ]
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('./?page=seance')
    );
  }
});
