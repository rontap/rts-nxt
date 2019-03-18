
var CACHE_NAME = 'graphene-cache-12';
  var cacheWhitelist = [CACHE_NAME];

var urlsToCache = [
  './index.html',
  './service.js',
  './service-manager.js',
  './*'

];

self.addEventListener('install', function(event) {
  // Perform install steps
 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[ServiceWorker] Cache is Active for ',event);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['graphene-cache-12'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      console.log('>keyList',keyList);
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
        //console.log('>>fetching')
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
