import type { DeviceProfile } from '@/hooks/useDeviceProfile';

export interface FramePlayerSettings {
  count: number;
  maxDpr: number;
  maxDprMobile: number;
  playbackSmoothing: number;
  autoPlaySpeed: number;
  idleReturnSpeed: number;
  scrubIdleMs?: number;
  mobile?: Partial<
    Pick<
      ResolvedPlayback,
      | 'autoPlaySpeed'
      | 'playbackSmoothing'
      | 'idleReturnSpeed'
      | 'scrubIdleMs'
      | 'maxDpr'
      | 'driftIntensity'
      | 'trailIntensity'
    >
  >;
  tablet?: Partial<
    Pick<
      ResolvedPlayback,
      | 'autoPlaySpeed'
      | 'playbackSmoothing'
      | 'idleReturnSpeed'
      | 'scrubIdleMs'
      | 'maxDpr'
      | 'driftIntensity'
      | 'trailIntensity'
    >
  >;
}

export interface DeviceRenderTuning {
  driftIntensity: number;
  trailIntensity: number;
  maxDpr: number;
}

export interface ResolvedPlayback extends FramePlayerSettings, DeviceRenderTuning {
  scrubIdleMs: number;
}

const DEFAULT_RENDER: Record<DeviceProfile, DeviceRenderTuning> = {
  mobile: { driftIntensity: 0.65, trailIntensity: 0.45, maxDpr: 2 },
  tablet: { driftIntensity: 0.9, trailIntensity: 0.75, maxDpr: 2.5 },
  desktop: { driftIntensity: 1, trailIntensity: 1, maxDpr: 3 },
};

export const resolveDevicePlayback = (
  config: FramePlayerSettings,
  profile: DeviceProfile,
  isTouch: boolean
): ResolvedPlayback => {
  const tierOverrides = profile === 'mobile' ? config.mobile : profile === 'tablet' ? config.tablet : undefined;
  const renderDefaults = DEFAULT_RENDER[profile];

  const maxDpr =
    tierOverrides?.maxDpr ??
    (profile === 'mobile' ? config.maxDprMobile : config.maxDpr);

  return {
    count: config.count,
    maxDpr,
    maxDprMobile: config.maxDprMobile,
    playbackSmoothing: tierOverrides?.playbackSmoothing ?? config.playbackSmoothing,
    autoPlaySpeed:
      tierOverrides?.autoPlaySpeed ??
      (isTouch && profile === 'mobile' ? config.autoPlaySpeed * 1.35 : config.autoPlaySpeed),
    idleReturnSpeed: tierOverrides?.idleReturnSpeed ?? config.idleReturnSpeed,
    scrubIdleMs: tierOverrides?.scrubIdleMs ?? config.scrubIdleMs ?? (isTouch ? 280 : 200),
    driftIntensity: tierOverrides?.driftIntensity ?? renderDefaults.driftIntensity,
    trailIntensity: tierOverrides?.trailIntensity ?? renderDefaults.trailIntensity,
  };
};

export const getInteractionHint = (isTouch: boolean, isEngaged: boolean): string => {
  if (isEngaged) return '';
  return isTouch ? 'Tap & drag to explore' : 'Hover to play';
};
