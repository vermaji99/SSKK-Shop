import * as React from 'react';
import { cn } from '@/lib/utils';
import { useDeviceProfile } from '@/hooks/useDeviceProfile';
import {
  getInteractionHint,
  resolveDevicePlayback,
  type FramePlayerSettings,
} from '@/lib/devicePlayback';
import {
  renderCinematicFrame,
  syncCanvasSize,
} from '@/lib/frameVideoRenderer';

export type { FramePlayerSettings } from '@/lib/devicePlayback';

interface HoverFramePlayerProps {
  getFrameUrl: (index: number) => string;
  getCanvasDpr: (profile?: 'mobile' | 'tablet' | 'desktop') => number;
  settings: FramePlayerSettings;
  className?: string;
  aspectRatio?: string;
  variant?: 'hero' | 'card';
  ariaLabel: string;
  showHint?: boolean;
  reducedMotion?: boolean;
  onProgress?: (progress: number) => void;
  onHoverChange?: (hovered: boolean) => void;
}

export const HoverFramePlayer: React.FC<HoverFramePlayerProps> = ({
  getFrameUrl,
  getCanvasDpr,
  settings,
  className,
  aspectRatio,
  variant = 'card',
  ariaLabel,
  showHint = true,
  reducedMotion = false,
  onProgress,
  onHoverChange,
}) => {
  const device = useDeviceProfile();
  const playback = React.useMemo(
    () => resolveDevicePlayback(settings, device.profile, device.isTouch),
    [settings, device.profile, device.isTouch]
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imagesRef = React.useRef<HTMLImageElement[]>([]);

  const targetRef = React.useRef(0);
  const displayRef = React.useRef(0);
  const displaySmoothRef = React.useRef(0);
  const velocityRef = React.useRef(0);
  const velocitySmoothRef = React.useRef(0);
  const isHoveredRef = React.useRef(false);
  const isPointerDownRef = React.useRef(false);
  const isInViewRef = React.useRef(false);
  const isScrubbingRef = React.useRef(false);
  const lastMoveRef = React.useRef(0);
  const rafRef = React.useRef(0);
  const lastUiUpdateRef = React.useRef(0);
  const playbackRef = React.useRef(playback);
  const lastFrameTimeRef = React.useRef<number | null>(null);

  const [loaded, setLoaded] = React.useState(false);
  const [loadProgress, setLoadProgress] = React.useState(0);
  const [isEngaged, setIsEngaged] = React.useState(false);
  const [uiProgress, setUiProgress] = React.useState(0);
  const [touchLocked, setTouchLocked] = React.useState(false);

  playbackRef.current = playback;

  const isTouchMode = device.isTouch || device.isCoarsePointer;

  const isActive = React.useCallback(() => {
    if (isTouchMode) {
      return isPointerDownRef.current || isInViewRef.current;
    }
    return isHoveredRef.current;
  }, [isTouchMode]);

  const syncEngagedState = React.useCallback(() => {
    const engaged = isActive();
    setIsEngaged(engaged);
    onHoverChange?.(engaged);
  }, [isActive, onHoverChange]);

  const getDpr = React.useCallback(
    () => getCanvasDpr(device.profile),
    [getCanvasDpr, device.profile]
  );

  const paint = React.useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !ctx) return;

    const metrics = syncCanvasSize(canvas, ctx, getDpr);
    if (!metrics) return;

    const heroBoost = variant === 'hero' ? 1.12 : 1;
    renderCinematicFrame(
      ctx,
      imagesRef.current,
      displaySmoothRef.current,
      velocitySmoothRef.current,
      metrics,
      {
        driftIntensity: playbackRef.current.driftIntensity * heroBoost,
        trailIntensity: playbackRef.current.trailIntensity * heroBoost,
      }
    );
  }, [getDpr, variant]);

  const emitProgress = React.useCallback(
    (value: number) => {
      const now = performance.now();
      if (now - lastUiUpdateRef.current > 36) {
        lastUiUpdateRef.current = now;
        setUiProgress(value);
        onProgress?.(value);
      }
    },
    [onProgress]
  );

  const scrubFromClientX = React.useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const x = (clientX - rect.left) / rect.width;
    targetRef.current = Math.max(0, Math.min(1, x));
    isScrubbingRef.current = true;
    lastMoveRef.current = performance.now();
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= playback.count; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.fetchPriority = i <= 4 ? 'high' : 'auto';
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (cancelled) return;
        loadedCount += 1;
        setLoadProgress(Math.round((loadedCount / playback.count) * 100));
        if (loadedCount === playback.count) {
          setLoaded(true);
          paint();
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [getFrameUrl, paint, playback.count]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !loaded || !isTouchMode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        syncEngagedState();
      },
      { threshold: [0, 0.35, 0.6, 1], rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded, isTouchMode, syncEngagedState]);

  React.useEffect(() => {
    if (!loaded) return;

    if (reducedMotion) {
      targetRef.current = 0.5;
      displayRef.current = 0.5;
      displaySmoothRef.current = 0.5;
      velocityRef.current = 0;
      velocitySmoothRef.current = 0;
      paint();
      emitProgress(0.5);
      return;
    }

    const NOMINAL_DT = 16.6667;

    const loop = (timestamp: number) => {
      const cfg = playbackRef.current;
      const now = performance.now();

      const lastTs = lastFrameTimeRef.current;
      const rawDt = lastTs == null ? NOMINAL_DT : timestamp - lastTs;
      lastFrameTimeRef.current = timestamp;
      const dt = Math.max(1, Math.min(48, rawDt));
      const dtFactor = dt / NOMINAL_DT;

      let target = targetRef.current;
      const active = isActive();

      if (active) {
        if (!isScrubbingRef.current || now - lastMoveRef.current > cfg.scrubIdleMs) {
          target += cfg.autoPlaySpeed * dtFactor;
          if (target > 1) target = target - 1;
          targetRef.current = target;
        }
      } else {
        const idleReturn = (cfg.idleReturnSpeed ?? 0.045) * dtFactor;
        targetRef.current += (0 - targetRef.current) * Math.min(1, idleReturn);
      }

      const smoothing = Math.min(1, cfg.playbackSmoothing * dtFactor * 1.25);
      const displayCurrent = displayRef.current;
      const displayNext = displayCurrent + (targetRef.current - displayCurrent) * smoothing;
      displayRef.current = displayNext;

      const smoothFactor = Math.min(1, 0.22 * dtFactor);
      displaySmoothRef.current += (displayNext - displaySmoothRef.current) * smoothFactor;

      const instVelocity = Math.abs(displayNext - displayCurrent);
      velocityRef.current = instVelocity;
      const velSmooth = Math.min(1, 0.18 * dtFactor);
      velocitySmoothRef.current += (instVelocity - velocitySmoothRef.current) * velSmooth;

      const effectiveDisplay = displaySmoothRef.current;
      const deltaToPaint = Math.abs(effectiveDisplay - displaySmoothRef.current);

      const snapThreshold = 0.00005;
      if (Math.abs(displaySmoothRef.current - targetRef.current) < snapThreshold &&
          velocitySmoothRef.current < 0.00001) {
        displaySmoothRef.current = targetRef.current;
        velocitySmoothRef.current = 0;
      }

      paint();
      emitProgress(effectiveDisplay);

      if (isScrubbingRef.current && now - lastMoveRef.current > cfg.scrubIdleMs + 120) {
        isScrubbingRef.current = false;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    lastFrameTimeRef.current = null;
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loaded, paint, emitProgress, reducedMotion, isActive]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !loaded) return;
    const ro = new ResizeObserver(() => paint());
    ro.observe(el);
    return () => ro.disconnect();
  }, [loaded, paint]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    isPointerDownRef.current = true;
    setTouchLocked(true);
    syncEngagedState();
    scrubFromClientX(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;

    if (isTouchMode) {
      if (!isPointerDownRef.current) return;
      scrubFromClientX(e.clientX);
      return;
    }

    if (!isHoveredRef.current) return;
    scrubFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = false;
    setTouchLocked(false);
    syncEngagedState();
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const isHero = variant === 'hero';
  const hint = getInteractionHint(isTouchMode, isEngaged);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-[#05020A] select-none',
        isHero
          ? 'absolute inset-0 w-full h-full touch-manipulation'
          : 'gold-border shadow-gold-glow-lg touch-manipulation rounded-sm sm:rounded-none',
        isTouchMode && isEngaged && 'ring-1 ring-inset ring-gold-400/25',
        !isTouchMode && 'cursor-crosshair',
        className
      )}
      style={{
        ...(aspectRatio ? { aspectRatio } : {}),
        ...(isHero ? { height: '100%', width: '100%', top: 0, left: 0, right: 0, bottom: 0 } : {}),
        touchAction: touchLocked ? 'none' : 'pan-y',
      }}
      onPointerEnter={() => {
        if (isTouchMode) return;
        isHoveredRef.current = true;
        syncEngagedState();
      }}
      onPointerLeave={() => {
        if (isTouchMode) return;
        isHoveredRef.current = false;
        isScrubbingRef.current = false;
        syncEngagedState();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="img"
      aria-label={ariaLabel}
      tabIndex={isTouchMode ? 0 : -1}
    >
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 z-20 bg-[#05020A] px-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border border-gold-400/40 border-t-gold-400 rounded-full animate-spin" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-cream/50 font-light text-center">
            Loading cinematic sequence {loadProgress}%
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          width: 'auto',
          height: 'auto',
          minWidth: '100%',
          minHeight: '100%',
          maxWidth: 'none',
          objectFit: 'cover',
          imageRendering: 'auto',
        }}
      />

      <div
        className={cn(
          'absolute inset-0 pointer-events-none',
          isHero
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_55%,#05020A_100%)] opacity-70 sm:opacity-75'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_48%,#05020A_95%)] opacity-65 sm:opacity-70'
        )}
      />
      {isHero && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#05020A]/40 via-transparent to-[#05020A]/55 sm:from-[#05020A]/35 sm:to-[#05020A]/50" />
      )}

      {showHint && !reducedMotion && hint && (
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 px-4 text-center max-w-[90%]',
            isHero ? 'bottom-6 sm:bottom-8' : 'bottom-3 sm:bottom-4',
            isEngaged ? 'opacity-0' : 'opacity-100'
          )}
        >
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-gold-400/60 font-light">
            {hint}
          </span>
        </div>
      )}

      {variant !== 'hero' && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06] pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-transparent via-gold-400/75 to-gold-300/90 transition-[width] duration-75 ease-out"
            style={{ width: `${Math.round(uiProgress * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default HoverFramePlayer;
