// Site-wide settings. Edit freely.
export const CONFIG = {
  siteName: 'Scribble Shed',
  ads: {
    enabled: false,        // false = ad slots are removed from every page. true = placeholders appear.
    provider: null,        // later: (el, slotName) => { ...inject your ad provider's code into el... }
  },
};
