import { GAMES } from '../games/registry.js';
import { CONFIG } from './config.js';
import { mountAds } from './ads.js';
import { initPlatform, store, canFullscreen, toggleFullscreen } from './platform.js';
initPlatform(); mountAds();

const $ = id => document.getElementById(id);
const g = GAMES.find(x => x.id === new URLSearchParams(location.search).get('g'));

if (!g) {
  document.title = 'Game not found | ' + CONFIG.siteName;
  $('title').textContent = 'Game not found';
  $('desc').textContent = 'No game lives at this address. Go back to the shed and pick another.';
  $('actions').hidden = $('stage').hidden = true;
} else {
  document.title = `${g.title} | ${CONFIG.siteName}`;
  $('title').textContent = g.title;
  $('desc').textContent = g.description;
  const frame = $('frame'), stage = $('stage');
  if (g.aspect) { stage.style.height = 'auto'; stage.style.aspectRatio = g.aspect; stage.style.maxHeight = '80dvh'; }
  let sound = store.get('sound', '1') === '1';
  // Games hear about sound via postMessage and may also read localStorage 'ss:sound'.
  const send = () => frame.contentWindow?.postMessage({ type: 'platform:sound', on: sound }, '*');
  const paintSound = () => { $('sound').textContent = sound ? 'Sound on' : 'Sound off'; $('sound').setAttribute('aria-pressed', sound); };
  $('sound').onclick = () => { sound = !sound; store.set('sound', sound ? '1' : '0'); paintSound(); send(); };
  paintSound();
  frame.addEventListener('load', send);
  frame.src = `games/${g.id}/index.html`;
  $('restart').hidden = g.restart === false;
  $('restart').onclick = () => { frame.src = frame.src; };
  $('full').hidden = !canFullscreen();
  $('full').onclick = () => toggleFullscreen(stage);
}
