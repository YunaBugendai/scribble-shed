import { GAMES } from '../games/registry.js';
import { mountAds } from './ads.js';
import { initPlatform } from './platform.js';
initPlatform(); mountAds();

const $ = id => document.getElementById(id);
const url = g => 'play.html?g=' + encodeURIComponent(g.id);
let cat = 'all';

const cats = ['all', ...new Set(GAMES.map(g => g.category).filter(Boolean))];
$('cats').innerHTML = '';
cats.forEach(c => {
  const b = document.createElement('button');
  b.className = 'chip'; b.type = 'button'; b.textContent = c;
  b.onclick = () => { cat = c; render(); };
  b.dataset.c = c; $('cats').append(b);
});

function card(g) {
  const a = document.createElement('a');
  a.className = 'card'; a.href = url(g);
  const t = document.createElement('div'); t.className = 'thumb';
  if (g.color) t.style.background = g.color;
  if (g.thumb) { const i = new Image(); i.loading = 'lazy'; i.alt = ''; i.src = `games/${g.id}/${g.thumb}`; t.append(i); }
  else t.textContent = g.emoji || '🎲';
  const b = document.createElement('div'); b.className = 'card-body';
  const h = document.createElement('h3'); h.textContent = g.title;
  const p = document.createElement('p'); p.textContent = g.description;
  b.append(h, p);
  if (g.category) { const s = document.createElement('span'); s.className = 'tag'; s.textContent = g.category; b.append(s); }
  a.append(t, b); return a;
}

function render() {
  const term = $('q').value.trim().toLowerCase();
  document.querySelectorAll('.chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.c === cat));
  const list = GAMES.filter(g => (cat === 'all' || g.category === cat) &&
    (!term || [g.title, g.description, g.category, ...(g.tags || [])].join(' ').toLowerCase().includes(term)));
  $('grid').replaceChildren(...list.map(card));
  $('empty').hidden = list.length > 0;
  $('empty').textContent = GAMES.length ? 'Nothing matches that. Try another word or category.'
    : 'The shed is empty. Add your first game in games/registry.js (see README.md).';
}

$('controls').hidden = GAMES.length === 0;
$('random').disabled = GAMES.length === 0;
$('random').onclick = () => { location.href = url(GAMES[Math.floor(Math.random() * GAMES.length)]); };
$('q').addEventListener('input', render);
render();
