import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useUIStore } from '@/store/uiStore';

gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useUIStore((s) => s.reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      return;
    }

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      infinite: false,
    });

    setLenisInstance(lenis);
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onRefresh);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      setLenisInstance(null);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  );
}

export default LenisProvider;
