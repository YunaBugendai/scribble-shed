# Scribble Shed

A small indie browser game platform. Plain HTML, CSS and JavaScript. No build step, no dependencies. It is a PWA and works offline after the first visit.

The platform ships with **no games**. The homepage shows a friendly empty state until you register one.

## Run it locally

ES modules and service workers need `http://`, not `file://`.

    cd scribble-shed
    python3 -m http.server 8000     # then open http://localhost:8000

## Folder structure

    index.html            homepage (search, category chips, random game)
    play.html             reusable game page: play.html?g=<game-id>
    sw.js                 service worker (offline)
    manifest.webmanifest  PWA manifest
    css/style.css         platform styles
    js/config.js          site name and ad settings
    js/app.js, play.js    homepage and game page logic
    js/ads.js             central ad system
    js/platform.js        everything platform-specific (storage, fullscreen, theme, service worker)
    games/registry.js     THE list of games
    games/_template/      empty game skeleton to copy
    games/<your-game>/    one isolated folder per game

## Add a game

1. Copy `games/_template/` to `games/my-game/` (lowercase, dashes, no spaces).
2. Build your game inside that folder: `index.html`, `game.js`, `style.css`, `assets/`. It is a normal web page with its own design. Use relative paths only (`assets/hero.png`).
3. Register it in `games/registry.js`:

       { id: 'my-game', title: 'My Game', description: 'Do a small odd thing.',
         category: 'toy', emoji: '🐙', color: '#ff5fa2' },

4. Reload. The card appears on the homepage and the game lives at `play.html?g=my-game`.

Optional fields: `tags`, `thumb` (image path inside the game folder), `aspect` (e.g. `'16/9'`), `restart: false`. The full list is at the top of `games/registry.js`.

### What the platform gives your game

Your game runs in an iframe inside the game page, which adds the title, description, Restart (reloads the game), Sound toggle, Fullscreen and a Home link.

- **Sound:** read `localStorage.getItem('ss:sound') !== '0'` at startup, and listen for changes: `addEventListener('message', e => { if (e.data?.type === 'platform:sound') mute(!e.data.on) })`.
- **Saving:** use `localStorage` keys prefixed with your game id, e.g. `my-game:best`.
- **Standalone:** `games/my-game/index.html` also works when opened directly.

## Ads

Slots are `<div data-ad-slot="name"></div>` (`home-banner`, `game-below`). They sit below content and never cover a game.

- `ads.enabled: false` in `js/config.js` (the default) removes every slot.
- `true` shows labelled placeholders so you can check the layout.
- To use a real provider, set `ads.provider` to `(el, slotName) => { ... }` and inject the provider's code into `el`. Follow the provider's rules and your local consent requirements.

## Theme

Light/dark follows the visitor's system and can be toggled (saved in `localStorage`). Colors live in the CSS variables at the top of `css/style.css`.

## Deploy

It is a static folder, so upload it as is. Everything uses relative paths, so it also works in a sub-folder.

- **GitHub Pages:** push the folder, then Settings > Pages > deploy from branch.
- **Netlify / Cloudflare Pages:** connect the repo, no build command, publish directory is the project root (or drag the folder in).
- **Any host:** copy the files to the web root. HTTPS is required for the service worker and install prompt (localhost is exempt).

**After every deploy, change `CACHE` in `sw.js`** (e.g. `scribble-shed-v2`) so returning visitors get the new files. Game files are cached as players open them.

## Future native apps

Platform-specific code lives in `js/platform.js`, and everything else uses web standards. Wrap the folder with Capacitor (Android/iOS) or Tauri/Electron (Windows/macOS/Linux) and only replace functions in that one file if needed.
