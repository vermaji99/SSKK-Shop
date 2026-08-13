import * as React from 'react';

export type DeviceProfile = 'mobile' | 'tablet' | 'desktop';

export interface DeviceProfileState {
  profile: DeviceProfile;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  isCoarsePointer: boolean;
  width: number;
  height: number;
}

const getTouchCapable = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const getCoarsePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

const resolveProfile = (width: number): DeviceProfile => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const readProfile = (): DeviceProfileState => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const height = typeof window !== 'undefined' ? window.innerHeight : 768;
  const profile = resolveProfile(width);

  return {
    profile,
    isMobile: profile === 'mobile',
    isTablet: profile === 'tablet',
    isDesktop: profile === 'desktop',
    isTouch: getTouchCapable(),
    isCoarsePointer: getCoarsePointer(),
    width,
    height,
  };
};

export const useDeviceProfile = (): DeviceProfileState => {
  const [state, setState] = React.useState<DeviceProfileState>(() => readProfile());

  React.useEffect(() => {
    const update = () => setState(readProfile());

    update();
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update);

    const coarseMq = window.matchMedia('(pointer: coarse)');
    coarseMq.addEventListener('change', update);

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      coarseMq.removeEventListener('change', update);
    };
  }, []);

  return state;
};

export default useDeviceProfile;
