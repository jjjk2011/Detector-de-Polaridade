// Service worker do AudioBase Pro
// Troque a versão sempre que publicar mudanças: isso apaga o cache antigo.
const VERSION = 'audiobase-v1.1.0';

const ASSETS = [
    './',
    './index.html',
    './fase.html',
    './delay.html',
    './projeto.html',
    './gerador.html',
    './style.css',
    './manifest.json',
    './icons/icon.svg',
    './icons/icon-192.png',
    './icons/icon-512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(VERSION)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Remove caches de versões anteriores
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET') return;

    // Arquivos de áudio grandes não entram no cache
    if (req.url.endsWith('.wav')) return;

    // Páginas: tenta a rede primeiro (pega atualizações) e cai no cache se estiver offline
    if (req.mode === 'navigate') {
        e.respondWith(
            fetch(req)
                .then(res => { putInCache(req, res.clone()); return res; })
                .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
        );
        return;
    }

    // Demais arquivos (CSS, ícones, fontes): responde do cache e atualiza em segundo plano
    e.respondWith(
        caches.match(req).then(cached => {
            const network = fetch(req)
                .then(res => { putInCache(req, res.clone()); return res; })
                .catch(() => cached);
            return cached || network;
        })
    );
});

function putInCache(req, res) {
    if (res && (res.ok || res.type === 'opaque')) {
        caches.open(VERSION).then(c => c.put(req, res));
    }
}
