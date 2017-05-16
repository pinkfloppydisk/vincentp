let cacheName = 'vincentp:0001';
let cacheFiles = ['/', '/offline', 'vincentp.jpg', '/categories/articles/', '/services/', '/about', '/blog/use-cases-for-calc'];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(cacheName).then(function (cache) {
    return cache.addAll(cacheFiles);
  }));
});

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    // Grab the asset from SW cache.
    if (response) {
      return response;
    }
    return fetch(event.request);
  }).catch(function () {
    // Can't access the network return an offline page from the cache
    console.log("trying to redirect");
    return caches.match('/offline');
  }));
});

// Empty out any caches that don’t match the ones listed.
self.addEventListener('activate', function (event) {
  // let bla = document.getElementsByTagName("body");
  // bla.className = "test";
  let cacheWhitelist = ['vincentp:0001'];

  event.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cacheName) {
      if (cacheWhitelist.indexOf(cacheName) === -1) {
        return caches.delete(cacheName);
      }
    }));
  }));
});
