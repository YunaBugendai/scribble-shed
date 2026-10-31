// Central ad system. Pages only contain <div data-ad-slot="name"></div>.
// Slots sit below content and never overlay a game.
import { CONFIG } from './config.js';
export function mountAds() {
  document.querySelectorAll('[data-ad-slot]').forEach(el => {
    if (!CONFIG.ads.enabled) return el.remove();
    el.classList.add('ad');
    const name = el.dataset.adSlot;
    if (typeof CONFIG.ads.provider === 'function') CONFIG.ads.provider(el, name);
    else el.textContent = 'Ad space (' + name + ')';
  });
}
