const CACHE_NAME = 'pascal-travels-shell-v16';
const SHELL_ASSETS = [
  '/', '/index.html', '/tours.html', '/tour.html', '/jobs.html', '/apply.html', '/visa.html', '/visa-apply.html', '/contact.html', '/blog.html', '/404.html',
  '/style.css', '/app.js', '/backgrounds.js', '/api-service.js', '/utils.js', '/whatsapp.js', '/data/packages.js', '/data/regional-tours.js', '/data/background-images.js', '/data/jobs.js', '/data/requirements.js',
  '/assets/logo-main.jpeg', '/assets/logo.svg',
  '/images/Africa-crop.jpg', '/images/kws-logo.jpg',
  '/images/premium-packages/amboseli-elephants-crop.jpg', '/images/premium-packages/nairobi-giraffe-crop.jpg',
  '/images/premium-packages/masai-mara-migration-crop.jpg', '/images/premium-packages/nairobi-rhinos-crop.jpg',
  '/images/premium-packages/nairobi-skyline-safari-crop.jpg',
  '/images/background/649_1545_16128728737895_959a0726.jpg', '/images/background/Balloon safari at dawn.jpg', '/images/background/Balloon safari at.jpg',
  '/images/background/Diani_Beach_021.jpg', '/images/background/Diani_Beach_038.jpg', '/images/background/elewana-sand-.jpg',
  '/images/background/ivasha_013.jpg', '/images/background/kadiz_main_area_16_copy_1269_672bc5e01e20f.jpg',
  '/images/background/Lake_Nakuru_National_Park_036.jpg', '/images/background/Moremi_Game_Reserve_043 (1).jpg',
  '/images/background/Okavango_Delta_009.jpg', '/images/background/Okavango_Delta_044.jpg',
  '/images/background/Okavango_Delta_070.jpg', '/images/background/Okavango_Delta_082.jpg',
  '/images/background/Reserve_008.jpg', '/images/background/Three giraffes.jpg', '/images/background/Watamu_0.jpg', '/images/background/_diani1.jpg',
  '/images/moremi/546_1436635580.jpg', '/images/moremi/dsc_0632_1474373385.jpg', '/images/moremi/dsc_0718_(1)_1474373456.jpg',
  '/images/moremi/Moremi_Game_Reserve_005.jpg', '/images/moremi/Moremi_Game_Reserve_006.jpg', '/images/moremi/Moremi_Game_Reserve_011.jpg',
  '/images/moremi/Moremi_Game_Reserve_015.jpg', '/images/moremi/Moremi_Game_Reserve_036.jpg', '/images/moremi/Moremi_Game_Reserve_040.jpg',
  '/images/moremi/Moremi_Game_Reserve_042.jpg', '/images/moremi/Moremi_Game_Reserve_043.jpg', '/images/moremi/Moremi_Game_Reserve_044.jpg',
  '/images/moremi/Moremi_Game_Reserve_056.jpg', '/images/moremi/Moremi_Game_Reserve_057.jpg', '/images/moremi/Moremi_Game_Reserve_059.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match(request).then(cached => cached || caches.match('/index.html'))));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
    return response;
  })));
});
