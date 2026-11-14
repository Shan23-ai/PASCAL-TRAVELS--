(function () {
  'use strict';

  const fallbackPhotos = [
    '649_1545_16128728737895_959a0726.jpg',
    'Balloon safari at dawn.jpg',
    'Balloon safari at.jpg',
    'Bwindi_Impenetrable_National_Park_015.jpg',
    'Diani_Beach_021.jpg',
    'Diani_Beach_038.jpg',
    'elewana-sand-.jpg',
    'ivasha_013.jpg',
    'kadiz_main_area_16_copy_1269_672bc5e01e20f.jpg',
    'Kalinzu_Forest_Reserve_002 (1).jpg',
    'Kalinzu_Forest_Reserve_003.jpg',
    'Kidepo_Valley_National_Park_022 (1).jpg',
    'Kidepo_Valley_National_Park_040 (1).jpg',
    'Lake_Nakuru_National_Park_036.jpg',
    'Mgahinga_Gorilla_National_Park_019 (1).jpg',
    'Moremi_Game_Reserve_043 (1).jpg',
    'Murchison_Falls_National_Park_023.jpg',
    'Murchison_Falls_National_Park_031.jpg',
    'Murchison_Falls_National_Park_040 (1).jpg',
    'Murchison_Falls_National_Park_044 (1).jpg',
    'Murchison_Falls_National_Park_047 (1).jpg',
    'Murchison_Falls_National_Park_049.jpg',
    'Okavango_Delta_009.jpg',
    'Okavango_Delta_044.jpg',
    'Okavango_Delta_070.jpg',
    'Okavango_Delta_082.jpg',
    'Queen_Elizabeth_National_Park_009.jpg',
    'Queen_Elizabeth_National_Park_016 (1).jpg',
    'Queen_Elizabeth_National_Park_018.jpg',
    'Queen_Elizabeth_National_Park_033 (1).jpg',
    'Queen_Elizabeth_National_Park_039.jpg',
    'Reserve_008.jpg',
    'Three giraffes.jpg',
    'Watamu_0.jpg',
    'Ziwa_Rhino_and_Wildlife_Ranch_016.jpg',
    '_diani1.jpg'
  ].map(function (filename) { return `images/background/${filename}`; });
  const photos = window.PASCAL_BACKGROUND_PHOTOS && window.PASCAL_BACKGROUND_PHOTOS.length
    ? window.PASCAL_BACKGROUND_PHOTOS
    : fallbackPhotos;

  const layers = Array.from(document.querySelectorAll('.hero-bg-img'));
  let photoIndex = 0;
  let layerIndex = 0;

  function applyPhoto(index) {
    const url = `url("${photos[index]}")`;
    document.documentElement.style.setProperty('--page-background', url);
    document.querySelectorAll('.section-tour, .section-dark').forEach(function (section) {
      section.style.setProperty('background-image', `linear-gradient(rgba(12, 31, 49, 0.72), rgba(12, 31, 49, 0.72)), ${url}`, 'important');
    });
    if (!layers.length) return;
    layers.forEach(function (layer) {
      layer.style.setProperty('animation', 'none', 'important');
      layer.style.setProperty('opacity', '0');
    });
    const activeLayer = layers[layerIndex];
    activeLayer.style.setProperty('background-image', url, 'important');
    activeLayer.style.setProperty('opacity', '1');
  }

  applyPhoto(photoIndex);
  if (photos.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(function () {
      photoIndex = (photoIndex + 1) % photos.length;
      if (layers.length) layerIndex = (layerIndex + 1) % layers.length;
      applyPhoto(photoIndex);
    }, 4000);
  }
})();
