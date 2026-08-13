/** Jewelry images served from the Vite public folder (mirrors client/src/config/assets.ts) */
const publicAsset = (fileName) => encodeURI(`/${fileName}`);

export const JEWELRY_IMAGES = {
  ring: publicAsset('Luxury Gold Diamond Ring.png'),
  necklace: publicAsset('Luxury Gold Necklace.png'),
  bridalSet: publicAsset('Bridal Necklace Set.png'),
  earrings: publicAsset('Diamond Earrings.png'),
  jhumka: publicAsset('Jhumka.png'),
  bangle: publicAsset('Gold Bangle.png'),
  bangleAlt: publicAsset('Gold Bangle (2).png'),
  chain: publicAsset('Gold Diamond Chain.png'),
  pendant: publicAsset('Pendant.png'),
  showcase: publicAsset('ChatGPT Image Aug 11, 2026, 03_35_08 PM.png'),
};

export const img = (key) => ({ url: JEWELRY_IMAGES[key], public_id: `local-${key}` });
