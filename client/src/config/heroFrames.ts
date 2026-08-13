/** Hover-play hero frame sequence — jeweled bird pendant reconstruction */
export const HERO_FRAMES = {
  basePath: '/hero-frames',
  count: 11,
  padLength: 3,
  prefix: 'frame_',
  extension: 'jpg',
  maxDpr: 3,
  maxDprMobile: 2,
  playbackSmoothing: 0.085,
  autoPlaySpeed: 0.0024,
  idleReturnSpeed: 0.038,
  scrubIdleMs: 200,
  mobile: {
    autoPlaySpeed: 0.0032,
    playbackSmoothing: 0.11,
    idleReturnSpeed: 0.05,
    scrubIdleMs: 320,
    maxDpr: 1.75,
    driftIntensity: 0.6,
    trailIntensity: 0.4,
  },
  tablet: {
    autoPlaySpeed: 0.0028,
    playbackSmoothing: 0.095,
    maxDpr: 2.25,
    driftIntensity: 0.85,
    trailIntensity: 0.7,
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
