// sw.js - Service Worker สำหรับ MediStock v4.0.2
const CACHE_NAME = 'medistock-v4.0.2';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './android-chrome-192x192.png',
    './android-chrome-512x512.png',
    './apple-touch-icon.png',
    './favicon-16x16.png',
    './favicon-32x32.png',
    './favicon.ico',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js',
    'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
    'https://cdn.jsdelivr.net/npm/eruda',
    'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// ✅ ติดตั้ง Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ เปิด Cache สำเร็จ (v4.0.2)');
                return cache.addAll(urlsToCache);
            })
            .catch(err => console.error('❌ Cache error:', err))
    );
    self.skipWaiting();
});

// ✅ เปิดใช้งาน Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ ลบ cache เก่า:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// ✅ ตอบสนองการร้องขอ
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => new Response('⚠️ ไม่สามารถเชื่อมต่อได้', { status: 503 }))
    );
});

// ✅ รับข้อความจาก client
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
