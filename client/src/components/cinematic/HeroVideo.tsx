import * as React from 'react';
import { cn } from '@/lib/utils';
import { useDeviceProfile } from '@/hooks/useDeviceProfile';

interface HeroVideoProps {
  className?: string;
  posterClassName?: string;
  reducedMotion?: boolean;
  hoverScrub?: boolean;
  hoverPlay?: boolean;
  onProgress?: (progress: number) => void;
  onReady?: (duration: number) => void;
  ariaLabel?: string;
  containerRef?: React.Ref<HTMLDivElement>;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

type FrameCallback = (now: number, meta: { mediaTime?: number; presentedFrames?: number }) => void;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const HeroVideo: React.FC<HeroVideoProps> = ({
  className,
  posterClassName,
  reducedMotion = false,
  hoverScrub = false,
  hoverPlay = false,
  onProgress,
  onReady,
  ariaLabel = 'Premium jewellery cinematic showcase',
  containerRef: containerRefProp,
}) => {
  const { isMobile, prefersHover } = useDeviceProfile();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const innerContainerRef = React.useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = React.useState(false);
  const [posterLoaded, setPosterLoaded] = React.useState(false);
  const [videoFallback, setVideoFallback] = React.useState(false);

  const durationRef = React.useRef(0);
  const lastEmittedProgressRef = React.useRef(-1);
  const targetMediaTimeRef = React.useRef(0);
  const smoothMediaTimeRef = React.useRef(0);
  const currentMediaTimeRef = React.useRef(0);
  const lastTargetTimeRef = React.useRef(0);
  const isScrubbingRef = React.useRef(false);
  const rafTickRef = React.useRef(0);
  const rvfcIdRef = React.useRef<number | null>(null);
  const idleTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const suppressEmissionRef = React.useRef(false);
  const latestPointerXRatioRef = React.useRef(0);
  const seekThrottleTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pendingSeekTimeRef = React.useRef<number | null>(null);
  const inFlightSeekRef = React.useRef(false);
  const lastRafTimestampRef = React.useRef<number | null>(null);
  const idleStartRampRef = React.useRef(0);
  const lastCommitTimeRef = React.useRef(0);
  const scrubLastSmoothRef = React.useRef<number | null>(null);

  const base = isMobile ? 'hero-mobile' : 'hero-desktop';
  const posterWebp = `/hero-video/${base}-poster.webp`;
  const posterJpg = `/hero-video/${base}-poster.jpg`;
  const webmSrc = `/hero-video/${base}.webm`;
  const mp4Src = `/hero-video/${base}.mp4`;
  const sourceMp4Fallback = `/hero-video/${base}-source.mp4`;
  const fallbackFrame = `/hero-frames/frame_006.jpg`;

  const isHoveredRef = React.useRef(false);
  const isPlayingRef = React.useRef(false);

  const containerRef = React.useMemo(
    () => mergeRefs(containerRefProp, innerContainerRef),
    [containerRefProp]
  );

  const emitProgress = React.useCallback(
    (t: number) => {
      if (suppressEmissionRef.current) return;
      const duration = durationRef.current || 1;
      const p = clamp(t / duration, 0, 1);
      if (Math.abs(p - lastEmittedProgressRef.current) > 0.0012) {
        lastEmittedProgressRef.current = p;
        onProgress?.(p);
      }
    },
    [onProgress]
  );

  const commitSeek = React.useCallback((time: number) => {
    const v = videoRef.current;
    if (!v) return;
    try {
      inFlightSeekRef.current = true;
      v.currentTime = time;
      currentMediaTimeRef.current = time;
    } catch {
      inFlightSeekRef.current = false;
    }
  }, []);

  const schedulePendingSeek = React.useCallback(() => {
    if (pendingSeekTimeRef.current == null) return;
    if (inFlightSeekRef.current) return;
    const t = pendingSeekTimeRef.current;
    pendingSeekTimeRef.current = null;
    commitSeek(t);
  }, [commitSeek]);

  const throttledSeek = React.useCallback(
    (time: number) => {
      pendingSeekTimeRef.current = time;
      if (inFlightSeekRef.current) return;

      const now = performance.now();
      const minInterval = 14;
      const elapsed = now - lastCommitTimeRef.current;

      if (seekThrottleTimerRef.current == null) {
        if (elapsed >= minInterval) {
          schedulePendingSeek();
          lastCommitTimeRef.current = now;
        } else {
          const delay = minInterval - elapsed;
          seekThrottleTimerRef.current = setTimeout(() => {
            seekThrottleTimerRef.current = undefined;
            schedulePendingSeek();
            lastCommitTimeRef.current = performance.now();
          }, delay);
        }
      }
    },
    [schedulePendingSeek]
  );

  const stopIdleTick = React.useCallback(() => {
    if (rafTickRef.current) {
      cancelAnimationFrame(rafTickRef.current);
      rafTickRef.current = 0;
    }
  }, []);

  const idleTick = React.useCallback((timestamp: number) => {
    const v = videoRef.current;
    if (!v || !durationRef.current || reducedMotion) return;
    if (isScrubbingRef.current) return;

    const NOMINAL_DT = 16.6667;
    const delta = lastRafTimestampRef.current == null ? NOMINAL_DT : Math.min(64, timestamp - lastRafTimestampRef.current);
    lastRafTimestampRef.current = timestamp;
    const dtFactor = delta / NOMINAL_DT;

    if (idleStartRampRef.current < 1) {
      idleStartRampRef.current = Math.min(1, idleStartRampRef.current + 0.04 * dtFactor);
    }
    const ramp = 0.25 + 0.75 * (idleStartRampRef.current * idleStartRampRef.current * (3 - 2 * idleStartRampRef.current));

    const baseStep = durationRef.current * 0.0021;
    const step = baseStep * (delta / NOMINAL_DT) * ramp;
    targetMediaTimeRef.current = clamp(targetMediaTimeRef.current + step, 0, durationRef.current);

    if (targetMediaTimeRef.current >= durationRef.current - 0.035) {
      targetMediaTimeRef.current = 0;
    }

    const smooth1 = Math.min(1, 0.26 * dtFactor);
    smoothMediaTimeRef.current += (targetMediaTimeRef.current - smoothMediaTimeRef.current) * smooth1;

    const smooth2 = Math.min(1, 0.34 * dtFactor);
    const outTime = currentMediaTimeRef.current + (smoothMediaTimeRef.current - currentMediaTimeRef.current) * smooth2;
    currentMediaTimeRef.current = outTime;

    throttledSeek(outTime);
    emitProgress(smoothMediaTimeRef.current);

    rafTickRef.current = requestAnimationFrame(idleTick);
  }, [reducedMotion, throttledSeek, emitProgress]);

  const scheduleIdle = React.useCallback(() => {
    if (reducedMotion) return;
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    isScrubbingRef.current = false;
    lastRafTimestampRef.current = null;
    idleStartRampRef.current = 0;
    scrubLastSmoothRef.current = null;
    idleTimeoutRef.current = setTimeout(() => {
      stopIdleTick();
      lastRafTimestampRef.current = null;
      rafTickRef.current = requestAnimationFrame(idleTick);
    }, 500);
  }, [reducedMotion, idleTick, stopIdleTick]);

  const scrubFromRatio = React.useCallback(
    (rawRatio: number) => {
      const v = videoRef.current;
      if (!v || !durationRef.current || reducedMotion) return;

      isScrubbingRef.current = true;
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      stopIdleTick();
      idleStartRampRef.current = 0;

      const eased = easeOutCubic(clamp(rawRatio, 0, 1));
      const target = eased * durationRef.current;
      targetMediaTimeRef.current = target;

      const MIN_STEP = durationRef.current * 0.0008;

      if (scrubLastSmoothRef.current == null) {
        scrubLastSmoothRef.current = currentMediaTimeRef.current;
      }

      const s1 = 0.55;
      const stage1 = scrubLastSmoothRef.current + (target - scrubLastSmoothRef.current) * s1;
      scrubLastSmoothRef.current = stage1;

      const s2 = 0.42;
      const smooth = currentMediaTimeRef.current + (stage1 - currentMediaTimeRef.current) * s2;

      if (Math.abs(smooth - currentMediaTimeRef.current) > MIN_STEP ||
          Math.abs(target - lastTargetTimeRef.current) > durationRef.current * 0.004) {
        lastTargetTimeRef.current = target;
        currentMediaTimeRef.current = smooth;
        throttledSeek(smooth);
      }

      smoothMediaTimeRef.current = stage1;
      emitProgress(stage1);
    },
    [reducedMotion, throttledSeek, stopIdleTick, emitProgress]
  );

  const handlePointerMove = React.useCallback(
    (clientX: number) => {
      const el = innerContainerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ratio = (clientX - rect.left) / Math.max(1, rect.width);
      latestPointerXRatioRef.current = clamp(ratio, 0, 1);
      scrubFromRatio(latestPointerXRatioRef.current);
    },
    [scrubFromRatio]
  );

  const playVideo = React.useCallback(async () => {
    const v = videoRef.current;
    if (!v || isPlayingRef.current) return;
    try {
      await v.play();
      isPlayingRef.current = true;
    } catch {
      isPlayingRef.current = false;
    }
  }, []);

  const pauseVideo = React.useCallback(() => {
    const v = videoRef.current;
    if (!v || !isPlayingRef.current) return;
    try {
      v.pause();
      isPlayingRef.current = false;
    } catch {
      isPlayingRef.current = false;
    }
  }, []);

  React.useEffect(() => {
    const el = innerContainerRef.current;
    if (!el) return;

    if (hoverPlay && !reducedMotion && prefersHover) {
      const onEnter = () => {
        isHoveredRef.current = true;
        stopIdleTick();
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        playVideo();
      };
      const onLeave = () => {
        isHoveredRef.current = false;
        pauseVideo();
        scheduleIdle();
      };

      el.addEventListener('pointerenter', onEnter);
      el.addEventListener('pointerleave', onLeave);

      return () => {
        el.removeEventListener('pointerenter', onEnter);
        el.removeEventListener('pointerleave', onLeave);
        pauseVideo();
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        stopIdleTick();
      };
    }

    if (!hoverScrub || reducedMotion || !prefersHover) {
      scheduleIdle();
      return;
    }

    const onMove = (e: PointerEvent) => handlePointerMove(e.clientX);
    const onEnter = () => {
      stopIdleTick();
      isScrubbingRef.current = true;
    };
    const onLeave = () => {
      scheduleIdle();
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    scheduleIdle();

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      stopIdleTick();
    };
  }, [hoverScrub, hoverPlay, reducedMotion, prefersHover, handlePointerMove, scheduleIdle, stopIdleTick, playVideo, pauseVideo]);

  React.useEffect(() => {
    let cancelled = false;
    const tryImage = (url: string, next?: string) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (!cancelled) setPosterLoaded(true);
      };
      img.onerror = () => {
        if (next && !cancelled) tryImage(next);
      };
      img.src = url;
    };
    tryImage(posterWebp, posterJpg);
    const t = setTimeout(() => {
      if (!cancelled) tryImage(fallbackFrame);
    }, 1200);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [posterWebp, posterJpg, fallbackFrame]);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onSeeked = () => {
      inFlightSeekRef.current = false;
      const v = videoRef.current;
      if (v && durationRef.current > 0) {
        const diff = Math.abs(currentMediaTimeRef.current - v.currentTime);
        if (diff > durationRef.current * 0.006) {
          currentMediaTimeRef.current = v.currentTime;
          smoothMediaTimeRef.current = v.currentTime;
          if (scrubLastSmoothRef.current != null) {
            scrubLastSmoothRef.current = v.currentTime;
          }
        }
      }
      if (pendingSeekTimeRef.current != null && seekThrottleTimerRef.current == null) {
        schedulePendingSeek();
      }
      emitProgress(currentMediaTimeRef.current);
    };
    const onWaiting = () => {
      suppressEmissionRef.current = true;
    };
    const onPlaying = () => {
      suppressEmissionRef.current = false;
    };
    const onCanPlay = () => {
      suppressEmissionRef.current = false;
    };
    let lastTimeUpdateEmit = 0;
    const onTimeUpdate = () => {
      const v = videoRef.current;
      if (!v || !hoverPlay) return;
      const now = performance.now();
      if (now - lastTimeUpdateEmit < 50) return;
      lastTimeUpdateEmit = now;
      emitProgress(v.currentTime);
    };

    v.addEventListener('seeked', onSeeked);
    v.addEventListener('waiting', onWaiting);
    v.addEventListener('playing', onPlaying);
    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      v.removeEventListener('seeked', onSeeked);
      v.removeEventListener('waiting', onWaiting);
      v.removeEventListener('playing', onPlaying);
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('timeupdate', onTimeUpdate);
      const rvfc = v as unknown as { cancelVideoFrameCallback?: (id: number) => void };
      if (rvfcIdRef.current != null && rvfc.cancelVideoFrameCallback) {
        rvfc.cancelVideoFrameCallback(rvfcIdRef.current);
        rvfcIdRef.current = null;
      }
    };
  }, [emitProgress, schedulePendingSeek, hoverPlay]);

  const handleLoadedMeta = React.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    durationRef.current = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : 5;
    targetMediaTimeRef.current = durationRef.current * 0.02;
    lastTargetTimeRef.current = targetMediaTimeRef.current;
    currentMediaTimeRef.current = targetMediaTimeRef.current;
    smoothMediaTimeRef.current = targetMediaTimeRef.current;
    scrubLastSmoothRef.current = targetMediaTimeRef.current;
    idleStartRampRef.current = 0;
    try {
      v.currentTime = targetMediaTimeRef.current;
      inFlightSeekRef.current = true;
    } catch {
      inFlightSeekRef.current = false;
    }
  }, []);

  const handleCanPlay = React.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setVideoReady((cur) => {
      const rvfc = v as unknown as { requestVideoFrameCallback?: (cb: FrameCallback) => number };
      if (!cur && rvfc.requestVideoFrameCallback && !reducedMotion && !hoverPlay) {
        try {
          const cb: FrameCallback = () => {
            emitProgress(currentMediaTimeRef.current);
            rvfcIdRef.current = rvfc.requestVideoFrameCallback?.(cb) ?? null;
          };
          rvfcIdRef.current = rvfc.requestVideoFrameCallback(cb) ?? null;
        } catch {
          rvfcIdRef.current = null;
        }
      }
      return true;
    });
    onReady?.(durationRef.current || 0);
    if (!hoverPlay || !prefersHover) {
      scheduleIdle();
    }
  }, [onReady, scheduleIdle, emitProgress, reducedMotion, hoverPlay, prefersHover]);

  const handleVideoError = React.useCallback(() => {
    setVideoFallback(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 w-full h-full overflow-hidden bg-[#05020A]',
        hoverScrub && prefersHover && !reducedMotion ? 'touch-none cursor-ew-resize' : '',
        className
      )}
      role="img"
      aria-label={ariaLabel}
    >
      <picture className="absolute inset-0 w-full h-full block">
        <source srcSet={posterWebp} type="image/webp" />
        <img
          src={posterJpg}
          alt=""
          aria-hidden="true"
          decoding="async"
          loading="eager"
          className={cn(
            'absolute inset-0 w-full h-full object-cover will-change-transform transition-opacity duration-700 ease-out select-none pointer-events-none',
            videoReady ? 'opacity-0' : 'opacity-100',
            posterClassName
          )}
        />
      </picture>

      {!posterLoaded && (
        <div className="absolute inset-0 bg-[#05020A] flex items-center justify-center z-10">
          <div className="w-10 h-10 border border-gold-400/30 border-t-gold-400/80 rounded-full animate-spin" />
        </div>
      )}

      {!videoFallback && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay={false}
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onLoadedMetadata={handleLoadedMeta}
          onCanPlayThrough={handleCanPlay}
          onLoadedData={handleCanPlay}
          onError={handleVideoError}
          className={cn(
            'absolute inset-0 w-full h-full object-cover will-change-transform transition-opacity duration-700 ease-out select-none pointer-events-none',
            videoReady && !reducedMotion ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transform: 'translateZ(0)', imageRendering: 'auto' }}
          aria-hidden="true"
        >
          {!reducedMotion && (
            <>
              <source src={webmSrc} type="video/webm; codecs=vp9" />
              <source src={mp4Src} type="video/mp4; codecs=avc1.64002a" />
              <source src={sourceMp4Fallback} type="video/mp4" />
            </>
          )}
        </video>
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 60% at 50% 48%, transparent 0%, rgba(5,2,10,0.52) 55%, rgba(5,2,10,0.9) 100%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
};

function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined | null>
): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') {
        ref(value);
      } else {
        try {
          (ref as React.MutableRefObject<T | null>).current = value;
        } catch {
        }
      }
    }
  };
}

export default HeroVideo;
