/** Hover-play cinematic jewelry frame sequence (17 frames) */
export const CINEMATIC_FRAMES = {
  basePath: '/Cinematic_jewelry_video_prompt_202608121432_frames',
  count: 17,
  padLength: 3,
  prefix: 'frame_',
  extension: 'jpg',
  maxDpr: 3,
  maxDprMobile: 2,
  playbackSmoothing: 0.08,
  autoPlaySpeed: 0.0024,
  idleReturnSpeed: 0.036,
  scrubIdleMs: 220,
  mobile: {
    autoPlaySpeed: 0.0031,
    playbackSmoothing: 0.105,
    idleReturnSpeed: 0.048,
    scrubIdleMs: 340,
    maxDpr: 1.75,
    driftIntensity: 0.48,
    trailIntensity: 0.32,
  },
  tablet: {
    autoPlaySpeed: 0.0027,
    playbackSmoothing: 0.09,
    maxDpr: 2.25,
    driftIntensity: 0.72,
    trailIntensity: 0.58,
  },
  desktop: {
    driftIntensity: 0.82,
    trailIntensity: 0.72,
  },
} as const;

export const getCinematicFrameUrl = (index: number): string => {
  const { basePath, prefix, padLength, extension } = CINEMATIC_FRAMES;
  const num = String(Math.max(1, Math.min(index, CINEMATIC_FRAMES.count))).padStart(padLength, '0');
  return `${basePath}/${prefix}${num}.${extension}`;
};

export const getCinematicCanvasDpr = (profile?: 'mobile' | 'tablet' | 'desktop'): number => {
  if (typeof window === 'undefined') return CINEMATIC_FRAMES.maxDprMobile;
  const width = window.innerWidth;
  const resolved =
    profile ??
    (width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop');
  const tier =
    resolved === 'mobile'
      ? CINEMATIC_FRAMES.mobile
      : resolved === 'tablet'
        ? CINEMATIC_FRAMES.tablet
        : undefined;
  const cap = tier?.maxDpr ?? (resolved === 'mobile' ? CINEMATIC_FRAMES.maxDprMobile : CINEMATIC_FRAMES.maxDpr);
  return Math.min(window.devicePixelRatio || 1, cap);
};
