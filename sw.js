const CACHE_NAME = 'muslim-beginner-v1';
const BASE_PATH = '/muslimbeginner/';

// Fail-fail asas yang wajib ada untuk app berfungsi
const PRE_CACHE_RESOURCES = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'manifest.json',
  BASE_PATH + 'favicon-32x32.png',
  BASE_PATH + 'logo192.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRE_CACHE_RESOURCES);
    })
  );
  // Do not call self.skipWaiting() here anymore so we can show an update prompt
});

// Listen for a message from the app to skip waiting when the user clicks 'Update'
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  // Jangan cache request ke API luaran
  if (
    e.request.url.includes('/api/tadabbur') || 
    e.request.url.includes('api.aladhan.com') ||
    e.request.url.includes('api.bigdatacloud.net')
  ) {
    return; 
  }

  // Network-First untuk fail HTML (supaya sentiasa dapat update terbaru bila online)
  if (e.request.mode === 'navigate' || e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request).then((networkResponse) => {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback jika offline
        return caches.match(e.request).then((cachedResponse) => {
          return cachedResponse || caches.match(BASE_PATH + 'index.html');
        });
      })
    );
    return;
  }

  // Stale-While-Revalidate untuk JS, CSS & Gambar (Laju + Auto Update di belakang tadbir)
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      const fetchPromise = fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        // Abaikan error jika offline (cache akan terus digunakan)
      });

      return cachedResponse || fetchPromise;
    })
  );
});
