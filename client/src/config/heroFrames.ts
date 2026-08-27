/** Hover-play hero frame sequence — jeweled bird pendant reconstruction */
export const HERO_FRAMES = {
  basePath: '/hero-frames',
  count: 11,
  padLength: 3,
  prefix: 'frame_',
  extension: 'jpg',
  maxDpr: 3,
  maxDprMobile: 2,
  playbackSmoothing: 0.04,
  autoPlaySpeed: 0.0011,
  idleReturnSpeed: 0.02,
  scrubIdleMs: 280,
  mobile: {
    autoPlaySpeed: 0.0016,
    playbackSmoothing: 0.054,
    idleReturnSpeed: 0.027,
    scrubIdleMs: 400,
    maxDpr: 1.75,
    driftIntensity: 0.34,
    trailIntensity: 0.26,
  },
  tablet: {
    autoPlaySpeed: 0.00135,
    playbackSmoothing: 0.046,
    maxDpr: 2.25,
    driftIntensity: 0.48,
    trailIntensity: 0.4,
  },
  desktop: {
    autoPlaySpeed: 0.0011,
    playbackSmoothing: 0.04,
    idleReturnSpeed: 0.02,
    scrubIdleMs: 280,
    maxDpr: 2.75,
    driftIntensity: 0.5,
    trailIntensity: 0.45,
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
