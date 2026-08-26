// MediStock Service Worker - v3.2.1
const CACHE_NAME = 'medistock-v3.2.1';
const urlsToCache = [
  '/stockcount/',
  '/stockcount/index.html',
  '/stockcount/manifest.json',
  '/stockcount/android-chrome-192x192.png',
  '/stockcount/android-chrome-512x512.png',
  '/stockcount/apple-touch-icon.png',
  '/stockcount/favicon.ico',
  '/stockcount/favicon-16x16.png',
  '/stockcount/favicon-32x32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ เปิดแคชสำเร็จ');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('❌ แคชล้มเหลว:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ ลบแคชเก่า:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});
