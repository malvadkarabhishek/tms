const staticCacheName = 'tms-cache';
const assets = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './addTask.html',
  './main.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
];

// install event
self.addEventListener('install', evt => {
    // console.log('service worker installed');
    evt.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
    );
  });
  
  // activate event
  self.addEventListener('activate', evt => {
    // console.log('service worker activated');
    evt.waitUntil(
      caches.keys().then(keys => {
        //console.log(keys);
        return Promise.all(keys
          .filter(key => key !== staticCacheName)
          .map(key => caches.delete(key))
        );
      })
    );
  });
  
  // fetch event
  self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request);
      })
    );
  });