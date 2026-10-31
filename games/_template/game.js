// Empty game skeleton. Replace init() with your game.
let soundOn = localStorage.getItem('ss:sound') !== '0';   // shared sound setting

// The platform tells us when the player toggles sound.
addEventListener('message', e => {
  if (e.data?.type === 'platform:sound') soundOn = e.data.on;   // mute or unmute your audio here
});

function init() {
  const ctx = document.getElementById('stage').getContext('2d');
  // Your game starts here. The platform's Restart button reloads this page.
}
init();
