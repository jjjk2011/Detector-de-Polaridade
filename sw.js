const CACHE_NAME = 'audiobase-pro-v14';
const ASSETS = [
  './',
  './index.html',
  './fase.html',
  './projeto.html',
  './delay.html',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
