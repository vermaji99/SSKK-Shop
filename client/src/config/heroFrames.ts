/** Hover-play hero frame sequence — jeweled bird pendant reconstruction */
export const HERO_FRAMES = {
  basePath: '/hero-frames',
  count: 11,
  padLength: 3,
  prefix: 'frame_',
  extension: 'jpg',
  maxDpr: 3,
  maxDprMobile: 2,
  playbackSmoothing: 0.052,
  autoPlaySpeed: 0.0024,
  idleReturnSpeed: 0.022,
  scrubIdleMs: 320,
  mobile: {
    autoPlaySpeed: 0.0031,
    playbackSmoothing: 0.066,
    idleReturnSpeed: 0.028,
    scrubIdleMs: 440,
    maxDpr: 1.75,
    driftIntensity: 0.58,
    trailIntensity: 0.48,
  },
  tablet: {
    autoPlaySpeed: 0.0028,
    playbackSmoothing: 0.058,
    maxDpr: 2.25,
    driftIntensity: 0.78,
    trailIntensity: 0.66,
  },
  desktop: {
    autoPlaySpeed: 0.0024,
    playbackSmoothing: 0.052,
    idleReturnSpeed: 0.022,
    scrubIdleMs: 320,
    maxDpr: 2.85,
    driftIntensity: 0.86,
    trailIntensity: 0.76,
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
