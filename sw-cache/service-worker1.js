

// http://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
// http://deanhume.com/create-a-really-really-simple-offline-page-using-service-workers

this.addEventListener('fetch', event => {
   if (event.request.mode === 'navigate' ) {
         event.respondWith(
           fetch(event.request.url).catch(error => {
               // Return the offline page
               return caches.match(offlineUrl)
           })
     )
   }
   else {
      // Respond with everything else if we can
      event.respondWith(caches.match(event.request)
            .then(function (response) {
               return response || fetch(event.request)
            })
         )
      }
 })


//put in cache
var cacheVersion = 1
var currentCache = {
  offline: 'offline-cache' + cacheVersion
}
const offlineUrl = 'index.html'

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          'logo.jpg',
          offlineUrl
      ])
    })
  )
})