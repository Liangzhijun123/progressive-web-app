const CACHE_NAME = 'liang-app-cache-v1';
const urlsToCache = [
  '/index.html',
  '/styles.css',
  '/app.js',
  '/locationsData.json', 
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/image/background.png' 
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
