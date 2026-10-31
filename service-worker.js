const APP_VERSION = "1.2.0";
const APP_BUILD = "31/10/2026";
const CACHE_NAME =
    `soundboard-v${APP_VERSION}-${APP_BUILD}`;

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./logo theatre boulogne.jpg",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

// Installation
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );

    self.skipWaiting();
});

// Activation : suppression des anciens caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            )
        )
    );

    self.clients.claim();
});

// Interception des requêtes
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});