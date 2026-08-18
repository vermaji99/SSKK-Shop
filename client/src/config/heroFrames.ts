/** Hover-play hero frame sequence — jeweled bird pendant reconstruction */
export const HERO_FRAMES = {
  basePath: '/hero-frames',
  count: 11,
  padLength: 3,
  prefix: 'frame_',
  extension: 'jpg',
  maxDpr: 3,
  maxDprMobile: 2,
  playbackSmoothing: 0.045,
  autoPlaySpeed: 0.0012,
  idleReturnSpeed: 0.022,
  scrubIdleMs: 260,
  mobile: {
    autoPlaySpeed: 0.0018,
    playbackSmoothing: 0.06,
    idleReturnSpeed: 0.03,
    scrubIdleMs: 380,
    maxDpr: 1.75,
    driftIntensity: 0.38,
    trailIntensity: 0.28,
  },
  tablet: {
    autoPlaySpeed: 0.0015,
    playbackSmoothing: 0.05,
    maxDpr: 2.25,
    driftIntensity: 0.52,
    trailIntensity: 0.42,
  },
  desktop: {
    autoPlaySpeed: 0.0012,
    playbackSmoothing: 0.045,
    idleReturnSpeed: 0.022,
    scrubIdleMs: 260,
    maxDpr: 2.75,
    driftIntensity: 0.55,
    trailIntensity: 0.48,
  },
} as const;

export const getHeroFrameUrl = (index: number): string => {
  const { basePath, prefix, padLength, extension } = HERO_FRAMES;
  const num = String(Math.max(1, Math.min(index, HERO_FRAMES.count))).padStart(padLength, '0');
  return `${basePath}/${prefix}${num}.${extension}`;
};

export const getHeroCanvasDpr = (profile?: 'mobile' | 'tablet' | 'desktop'): number => {
  if (typeof window === 'undefined') return HERO_FRAMES.maxDprMobile;
  const width = window.innerWidth;
  const resolved =
    profile ??
    (width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop');
  const tier = resolved === 'mobile' ? HERO_FRAMES.mobile : resolved === 'tablet' ? HERO_FRAMES.tablet : undefined;
  const cap = tier?.maxDpr ?? (resolved === 'mobile' ? HERO_FRAMES.maxDprMobile : HERO_FRAMES.maxDpr);
  return Math.min(window.devicePixelRatio || 1, cap);
};
