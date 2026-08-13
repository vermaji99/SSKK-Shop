/** Jewelry images from /client/public — single source for local assets */
export const publicAsset = (fileName: string): string => encodeURI(`/${fileName}`);

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
} as const;

export const DEFAULT_PRODUCT_IMAGE = JEWELRY_IMAGES.ring;
export const SEO_OG_IMAGE = JEWELRY_IMAGES.necklace;

export const CATEGORY_IMAGE_BY_SLUG: Record<string, string> = {
  rings: JEWELRY_IMAGES.ring,
  earrings: JEWELRY_IMAGES.jhumka,
  necklaces: JEWELRY_IMAGES.necklace,
  chains: JEWELRY_IMAGES.chain,
  bangles: JEWELRY_IMAGES.bangle,
  bridal: JEWELRY_IMAGES.bridalSet,
  nath: JEWELRY_IMAGES.pendant,
  pendants: JEWELRY_IMAGES.pendant,
};
