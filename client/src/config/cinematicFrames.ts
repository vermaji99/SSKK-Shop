/** Hover-play cinematic jewelry frame sequence (17 frames) */
export const CINEMATIC_FRAMES = {
  basePath: '/Cinematic_jewelry_video_prompt_202608121432_frames',
  count: 17,
  padLength: 3,
  prefix: 'frame_',
  extension: 'jpg',
  maxDpr: 3,
  maxDprMobile: 2,
  playbackSmoothing: 0.095,
  autoPlaySpeed: 0.0026,
  idleReturnSpeed: 0.042,
  scrubIdleMs: 200,
  mobile: {
    autoPlaySpeed: 0.0034,
    playbackSmoothing: 0.12,
    idleReturnSpeed: 0.055,
    scrubIdleMs: 320,
    maxDpr: 1.75,
    driftIntensity: 0.55,
    trailIntensity: 0.35,
  },
  tablet: {
    autoPlaySpeed: 0.003,
    playbackSmoothing: 0.1,
    maxDpr: 2.25,
    driftIntensity: 0.8,
    trailIntensity: 0.65,
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
