const cacheName = 'audiobase-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './AudioBase_Polaridade_Intervalado_500ms.wav'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
