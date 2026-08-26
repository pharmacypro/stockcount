// MediStock Service Worker v3.5.0
const CACHE_NAME = 'medistock-v3.5.0';
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
                console.log('✅ เปิด Cache สำเร็จ');
                return cache.addAll(urlsToCache);
            })
            .catch(err => console.log('⚠️ Cache error:', err))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ ลบ Cache เก่า:', cacheName);
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
                if (response) return response;
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200) return response;
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                        return response;
                    })
                    .catch(() => {
                        return new Response('⚠️ ออฟไลน์ - กรุณาเชื่อมต่ออินเทอร์เน็ต', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});
