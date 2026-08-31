/** Jewelry images from /client/public — single source for local assets */
export const publicAsset = (fileName: string): string => encodeURI(`/${fileName}`);

export const JEWELRY_IMAGES = {
  ring: publicAsset('Luxury Gold Diamond Ring.png'),
  royalRing: publicAsset('Royal Ring.jpg'),
  ringSet: publicAsset('Ring_s.png'),
  necklace: publicAsset('Luxury Gold Necklace.png'),
  haarSet: publicAsset('Haar Set.png'),
  bridalSet: publicAsset('Bridal Necklace Set.png'),
  earrings: publicAsset('Diamond Earrings.png'),
  jhumka: publicAsset('Jhumka.png'),
  jhumkaAlt: publicAsset('Jhumka_2.png'),
  bangle: publicAsset('Gold Bangle (2).png'),
  bangleAlt: publicAsset('Gold Bangle.png'),
  chain: publicAsset('Gold Diamond Chain.png'),
  pendant: publicAsset('Pendent2.png'),
  pendantAlt: publicAsset('Pendant.png'),
  pendantNath: publicAsset('Pendant_4.png'),
  birdLocket: publicAsset('Bird_locket.png'),
  showcase: publicAsset('ChatGPT Image Aug 11, 2026, 03_35_08 PM.png'),
} as const;

export const DEFAULT_PRODUCT_IMAGE = JEWELRY_IMAGES.ring;
export const SEO_OG_IMAGE = JEWELRY_IMAGES.necklace;

export const HERO_VIDEO = {
  desktop: {
    webm: '/hero-video/hero-desktop.webm',
    mp4: '/hero-video/hero-desktop.mp4',
    poster: {
      webp: '/hero-video/hero-desktop-poster.webp',
      jpg: '/hero-video/hero-desktop-poster.jpg',
    },
  },
  mobile: {
    webm: '/hero-video/hero-mobile.webm',
    mp4: '/hero-video/hero-mobile.mp4',
    poster: {
      webp: '/hero-video/hero-mobile-poster.webp',
      jpg: '/hero-video/hero-mobile-poster.jpg',
    },
  },
  fallbackPoster: publicAsset('hero-frames/frame_006.jpg'),
} as const;

export const CATEGORY_IMAGE_BY_SLUG: Record<string, string> = {
  rings: JEWELRY_IMAGES.ring,
  earrings: JEWELRY_IMAGES.jhumka,
  necklaces: JEWELRY_IMAGES.necklace,
  chains: JEWELRY_IMAGES.chain,
  bangles: JEWELRY_IMAGES.bangle,
  bridal: JEWELRY_IMAGES.bridalSet,
  nath: JEWELRY_IMAGES.pendantNath,
  pendants: JEWELRY_IMAGES.pendant,
};
