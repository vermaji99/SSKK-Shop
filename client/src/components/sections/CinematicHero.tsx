import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { HeroVideo } from '@/components/cinematic/HeroVideo';

const CinematicHero: React.FC = () => {
  const reducedMotionStore = useUIStore((s) => s.reducedMotion);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionStore || prefersReducedMotion;

  return (
    <section
      className="relative w-full min-h-[100svh] h-auto sm:min-h-[640px] md:min-h-[720px] lg:min-h-[800px] bg-[#05020A] overflow-hidden isolate select-none"
      aria-label="Premium gold and diamond jewellery showcase"
    >
      <div className="absolute inset-0 z-0">
        <HeroVideo
          reducedMotion={reducedMotion}
          hoverPlay
          ariaLabel="Jewellery commercial cinematic showcase — hover to play, tap to play on mobile"
        />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,2,10,0.6) 0%, rgba(5,2,10,0.22) 28%, rgba(5,2,10,0.28) 52%, rgba(5,2,10,0.65) 78%, rgba(5,2,10,0.92) 94%, #05020A 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
};

export { CinematicHero };
export default CinematicHero;
