
var CACHE_NAME = 'rontap-populistic-cache-v4r0';
  var cacheWhitelist = [CACHE_NAME];

var urlsToCache = [
  './index.html',
  './styles/main.css',
  './styles/animate.css',
  './styles/powerups.css',
  './styles/upgrades.css',
  './styles/media.css',
  './js/game.js',
  './js/powerups.js',
  './js/main.js',
  './js/render.js',
  './manifest.json',
  './service.js',
  './service-manager.js'

];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[ServiceWorker] Cache is Active');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['rontap-populistic-cache-v4r0.1'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('[ServiceWorker] Updated Cache')
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }


        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
