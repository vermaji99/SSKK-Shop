import { useEffect, useRef, useState } from 'react';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const haloRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useUIStore((s) => s.reducedMotion);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const haloPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer || reducedMotion) return;

    // Ensure native cursor remains 100% visible across the site
    document.body.style.cursor = '';

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      // 0.22 factor provides smooth, ultra-responsive tracking with zero lag
      haloPos.current.x = lerp(haloPos.current.x, mousePos.current.x, 0.22);
      haloPos.current.y = lerp(haloPos.current.y, mousePos.current.y, 0.22);

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${haloPos.current.x}px, ${haloPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor="hover"], .cursor-pointer, .cursor-hoverable'
      );

      setIsHovering(Boolean(isInteractive));
    };

    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = '';
    };
  }, [reducedMotion, isVisible]);

  if (typeof window !== 'undefined') {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer || reducedMotion) return null;
  }

  return (
    <div
      ref={haloRef}
      className={cn(
        'pointer-events-none fixed top-0 left-0 z-[99999] rounded-full transition-all duration-200 ease-out will-change-transform',
        isVisible ? 'opacity-100' : 'opacity-0',
        isHovering
          ? 'h-12 w-12 border-2 border-gold-400 bg-gold-400/15 shadow-[0_0_25px_rgba(212,175,55,0.4)] scale-110'
          : 'h-8 w-8 border border-gold-400/60 bg-gold-400/5 shadow-[0_0_15px_rgba(212,175,55,0.2)]',
        isMouseDown && 'scale-90 opacity-80 border-gold'
      )}
      style={{ willChange: 'transform' }}
    />
  );
}

export default CustomCursor;

