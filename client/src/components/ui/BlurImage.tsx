import * as React from 'react';
import { cn } from '@/lib/utils';

interface BlurImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError' | 'fetchPriority'> {
  src: string;
  alt: string;
  blurDataUrl?: string;
  aspectRatio?: string;
  wrapperClassName?: string;
  imgClassName?: string;
  skeletonClassName?: string;
  onLoad?: () => void;
  onError?: (error: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  priority?: 'high' | 'auto' | 'low';
  zoomHover?: boolean;
}

export const BlurImage: React.FC<BlurImageProps> = ({
  src,
  alt,
  blurDataUrl,
  aspectRatio,
  wrapperClassName,
  imgClassName,
  skeletonClassName,
  className,
  onLoad,
  onError,
  priority = 'auto',
  zoomHover = true,
  loading: _loading,
  ...rest
}) => {
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  const [useFallback, setUseFallback] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const actualSrc = useFallback && blurDataUrl ? blurDataUrl : src;
  const loaded = status === 'loaded';

  const handleLoad = React.useCallback(() => {
    setStatus('loaded');
    onLoad?.();
  }, [onLoad]);

  const handleError = React.useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (!useFallback && blurDataUrl) {
        setUseFallback(true);
        return;
      }
      setStatus('error');
      onError?.(e);
    },
    [onError, useFallback, blurDataUrl]
  );

  React.useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (priority === 'high' && 'fetchPriority' in el) {
      try {
        (el as unknown as { fetchPriority: string }).fetchPriority = 'high';
      } catch {
      }
    }
  }, [priority]);

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-background-tertiary/40',
        zoomHover && 'group/img',
        wrapperClassName,
        className
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {status !== 'loaded' && (
        <div
          className={cn(
            'absolute inset-0 animate-pulse bg-gradient-to-br from-purple-900/40 via-background-secondary to-purple-800/30',
            skeletonClassName
          )}
          aria-hidden="true"
        />
      )}

      {blurDataUrl && (
        <img
          src={blurDataUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out',
            loaded ? 'opacity-0 scale-100 blur-2xl' : 'opacity-100 scale-105 blur-lg'
          )}
        />
      )}

      <img
        ref={imgRef}
        src={actualSrc}
        alt={alt}
        loading={priority === 'high' ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
        className={cn(
          'relative w-full h-full object-cover transition-all duration-700 ease-out will-change-transform select-none',
          zoomHover && 'group-hover/img:scale-[1.04]',
          loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[1.06]',
          status === 'error' && blurDataUrl ? 'opacity-0' : '',
          imgClassName
        )}
        style={{ transform: loaded ? 'translateZ(0) scale(1)' : undefined }}
      />

      {zoomHover && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 ease-out"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default BlurImage;
