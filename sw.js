// A simple service worker for caching the app's shell.

const CACHE_NAME = 'grade-tracker-cache-v1';
// This is the list of files that will be cached when the service worker is installed.
const urlsToCache = [
  '/',
  '/grade_tracker.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Install event: fires when the service worker is first installed.
self.addEventListener('install', event => {
  // We wait until the cache is opened and all our core files are added to it.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: fires every time the app requests a resource (like a file or data).
self.addEventListener('fetch', event => {
  event.respondWith(
    // We check if the requested resource is already in our cache.
    caches.match(event.request)
      .then(response => {
        // If we have it in the cache, return it immediately.
        if (response) {
          return response;
        }
        // If it's not in the cache, fetch it from the network.
        return fetch(event.request);
      }
    )
  );
});
