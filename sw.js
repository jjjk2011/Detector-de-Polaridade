// Mude de 'v1' para 'v2'
const cacheName = 'audiobase-v2'; 
const assets = [
  './',
  './index.html',
  './manifest.json',
  './AudioBase_Polaridade_Intervalado_500ms.wav'
];

self.addEventListener('install', e => {
  self.skipWaiting(); // Força a instalação imediata
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('activate', e => {
  // Limpa o cache antigo
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)));
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
