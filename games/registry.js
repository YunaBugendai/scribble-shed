// THE GAME REGISTRY. The homepage and game pages are built from this list.
// To add a game: put its folder in games/, then add one entry below.
//
// Fields:
//   id          (required) folder name in games/, lowercase-with-dashes. It is also the URL: play.html?g=<id>
//   title       (required) shown on the card and game page
//   description (required) one short sentence
//   category    (optional) groups games into filter chips, e.g. 'puzzle', 'toy', 'story'
//   tags        (optional) extra search words
//   emoji       (optional) card icon when there is no thumbnail
//   color       (optional) card thumbnail background, any CSS color
//   thumb       (optional) image file inside the game's folder, e.g. 'assets/thumb.png'
//   aspect      (optional) fixed stage shape such as '16/9'. Omit for a flexible stage.
//   restart     (optional) set false to hide the Restart button
//
// Example (uncomment after creating games/my-game/):
//   { id: 'my-game', title: 'My Game', description: 'Do a small odd thing.', category: 'toy', emoji: '🐙', color: '#ff5fa2' },

export const GAMES = [
];
