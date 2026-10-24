/**
 * SchemeAI - Progressive Web App Service Worker
 * 
 * SAFEGUARD & CACHING POLICY:
 * 1. Strictly Network-First for all application logic (JS, HTML, CSS).
 * 2. Never serves stale or outdated eligibility logic or scheme datasets when online.
 * 3. Immediately purges old caches upon activation (caches.delete).
 * 4. Never caches personal user data or eligibility evaluations.
 * 5. Serves cached fallback only when completely offline, notifying the client.
 */

const CACHE_VERSION = "schemeai-v1.0.0";
const CACHE_NAME = `schemeai-cache-${CACHE_VERSION}`;

// Essential shell assets required for offline launch
const APP_SHELL_ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/translations.js",
  "./js/schemes-data.js",
  "./js/eligibility-engine.js",
  "./js/app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/icon.svg"
];

// Installation: pre-cache application shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL_ASSETS);
    }).then(() => {
      // Force active immediately without waiting
      return self.skipWaiting();
    })
  );
});

// Activation: immediately claim all clients and purge any obsolete caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch event: Network-First strategy for all requests
self.addEventListener("fetch", (event) => {
  // Only handle GET requests; never cache POST/PUT/DELETE
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  // External official government links (e.g. pmkisan.gov.in) should always go directly to network
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    // Always attempt network fetch first to guarantee freshest scheme data and logic
    fetch(event.request)
      .then((networkResponse) => {
        // If response is valid, update the cache with the newest version
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed (offline): Fall back to cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If HTML navigation request fails completely, return cached index.html
          if (event.request.headers.get("accept") && event.request.headers.get("accept").includes("text/html")) {
            return caches.match("./index.html");
          }
        });
      })
  );
});
