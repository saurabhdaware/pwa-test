const CACHE_NAME = 'pwa-workshop-cache-v5'; // bump this version when you make changes.

const URLS_TO_CACHE = [
  './',
  './logo-192.png',
  './app.js',
]


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE)
    })
  )
});

self.addEventListener('fetch', (event) => {
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then((response) => {
      // if the requested asset is cached, return cached response
      console.log('responding from cache', event.request, response);
      console.log(caches.keys());
      if (response) {
        return response
      }

      // else forward request to network
      return fetch(event.request);
    })
  )
});