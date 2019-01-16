

// https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker

self.addEventListener('fetch', function fetcher (event) {
   console.info('sw', event.request.url)
   event.respondWith(fetch(event.request))
 })
