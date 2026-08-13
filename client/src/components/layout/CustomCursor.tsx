import { useEffect, useRef, useState } from 'react';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useUIStore((s) => s.reducedMotion);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const innerPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer || reducedMotion) return;

    document.body.style.cursor = 'none';

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      outerPos.current.x = lerp(outerPos.current.x, mousePos.current.x, 0.08);
      outerPos.current.y = lerp(outerPos.current.y, mousePos.current.y, 0.08);
      innerPos.current.x = lerp(innerPos.current.x, mousePos.current.x, 0.35);
      innerPos.current.y = lerp(innerPos.current.y, mousePos.current.y, 0.35);

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${innerPos.current.x}px, ${innerPos.current.y}px, 0) translate(-50%, -50%)`;
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

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="hover"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
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
    <>
      <div
        ref={outerRef}
        className={cn(
          'pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-gold transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
          isHovering ? 'h-14 w-14 bg-gold/10' : 'h-9 w-9 bg-transparent'
        )}
        style={{ willChange: 'transform' }}
      />
      <div
        ref={innerRef}
        className={cn(
          'pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-gold transition-all duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
          isHovering ? 'h-2 w-2' : 'h-1.5 w-1.5'
        )}
        style={{ willChange: 'transform' }}
      />
    </>
  );
}

export default CustomCursor;
