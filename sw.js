const CACHE_NAME = 'audiobase-pro-v13';
const assets = [
  './',
  './index.html',
  './fase.html',
  './delay.html',
  './projeto.html',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
