const cacheName = "DiceToWin-v1";
const assets = [
  '/',
  '/index.html',
  '/audio/coffin-song.mp3',
  '/audio/game-intro-audio.mp3',
  '/audio/roll-dice-click-sound.mp3',
  '/css/style.css',
  '/images/back.jpg',
  '/images/favicon.png',
  '/images/dice-1.png',
  '/images/dice-2.png',
  '/images/dice-3.png',
  '/images/dice-4.png',
  '/images/dice-5.png',
  '/images/dice-6.png',
  '/images/favicon72x72.png',
  '/images/favicon96x96.png',
  '/images/favicon128x128.png',
  '/images/favicon144x144.png',
  '/images/favicon152x152.png',
  '/images/favicon192x192.png',
  '/images/favicon384x384.png',
  '/images/favicon512x512.png',
  'https://fonts.googleapis.com/css?family=Lato:100,300,600',
  '/js/app.js'
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets)
      .catch(err=>console.log(err))
    })
  );
});

self.addEventListener('activate',evt=>{
  evt.waitUntil(
    caches.keys()
    .then(res=>{
      return Promise.all(
        res
        .filter(element=>element!==cacheName)
        .map(key=>caches.delete(key))
      )
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
      
    )
  })