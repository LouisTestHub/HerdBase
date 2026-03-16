// HerdBase Service Worker — Cache-first static, network-first API, offline fallback, background sync
const CACHE_VERSION = 'herdbase-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const API_CACHE = `${CACHE_VERSION}-api`;

const STATIC_ASSETS = [
  '/',
  '/free/calving',
  '/free/herd',
  '/upgrade',
  '/login',
  '/manifest.json',
  '/offline.html',
];

// Install — pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== STATIC_CACHE && k !== API_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — routing strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API requests — network-first with offline fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(API_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) =>
            cached || new Response(JSON.stringify({ error: 'offline', message: 'You are offline. Changes will sync when connected.' }), {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
            })
          )
        )
    );
    return;
  }

  // Static/page requests — cache-first
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached ||
        fetch(request)
          .then((response) => {
            if (response.ok && url.origin === self.location.origin) {
              const clone = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
            }
            return response;
          })
          .catch(() => caches.match('/offline.html'))
      )
    );
    return;
  }

  // POST/PUT/DELETE — try network, queue for sync on failure
  event.respondWith(
    fetch(request).catch(() => {
      // Queue for background sync
      return self.registration.sync.register('sync-pending').then(() =>
        new Response(JSON.stringify({ queued: true, message: 'Saved offline — will sync when connected' }), {
          status: 202,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    })
  );
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-pending') {
    event.waitUntil(syncPendingData());
  }
});

async function syncPendingData() {
  // This will be handled by the IndexedDB sync queue in the client
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({ type: 'SYNC_TRIGGERED' });
  });
}

// Push notifications (for calving alerts etc.)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'HerdBase', body: 'You have a new notification' };
  event.waitUntil(
    self.registration.showNotification(data.title || 'HerdBase', {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: data.tag || 'default',
    })
  );
});
