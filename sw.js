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

// ตั้งชื่อแคช
self.addEventListener('install', event => {
  console.log('🔄 กำลังติดตั้ง Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ เปิดแคชสำเร็จ');
        return cache.addAll(urlsToCache)
          .then(() => console.log('✅ แคชไฟล์ทั้งหมดสำเร็จ'))
          .catch(err => console.error('❌ แคชล้มเหลว:', err));
      })
  );
});

// เปิดใช้งาน Service Worker
self.addEventListener('activate', event => {
  console.log('✅ Service Worker เปิดใช้งานแล้ว');
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

// ตอบสนองการร้องขอไฟล์
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // ถ้ามีในแคช ให้ใช้ของในแคช
        if (response) {
          return response;
        }
        // ถ้าไม่มี ให้โหลดจากเน็ตเวิร์ก
        return fetch(event.request)
          .then(response => {
            // ถ้าโหลดสำเร็จ ให้เก็บไว้ในแคช
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(() => {
            // ถ้าไม่มีเน็ตและไม่มีในแคช
            console.log('⚠️ ไม่มีไฟล์ในแคชและไม่มีการเชื่อมต่อ');
          });
      })
  );
});
