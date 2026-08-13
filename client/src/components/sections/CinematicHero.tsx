import * as React from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { HoverFramePlayer } from '@/components/cinematic/HoverFramePlayer';
import { HERO_FRAMES, getHeroFrameUrl, getHeroCanvasDpr } from '@/config/heroFrames';

const CinematicHero: React.FC = () => {
  const reducedMotion = useUIStore((s) => s.reducedMotion);
  const [progress, setProgress] = React.useState(0);
  const [isEngaged, setIsEngaged] = React.useState(false);

  return (
    <section
      className="relative w-full min-h-[100dvh] h-[100svh] sm:h-screen bg-[#05020A] overflow-hidden"
      aria-label="Hero"
    >
      <HoverFramePlayer
        variant="hero"
        getFrameUrl={getHeroFrameUrl}
        getCanvasDpr={getHeroCanvasDpr}
        settings={HERO_FRAMES}
        reducedMotion={reducedMotion}
        onProgress={setProgress}
        onHoverChange={setIsEngaged}
        ariaLabel="Jeweled bird pendant cinematic reconstruction — hover or tap to play"
      />

      <motion.div
        animate={{ opacity: isEngaged ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-10 pointer-events-none left-4 sm:left-6 md:left-10 lg:left-14 right-4 top-[max(6.5rem,calc(env(safe-area-inset-top)+4.25rem))] sm:top-28 md:top-32"
      >
        <p className="text-cream/50 uppercase tracking-[0.35em] sm:tracking-[0.45em] text-[8px] sm:text-[9px] md:text-[10px] font-light">
          Shubham Swarn Kala Kendra
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="h-px w-full bg-white/[0.06]">
          <div
            className="h-full bg-gradient-to-r from-transparent via-gold-400/70 to-gold-300/90 transition-[width] duration-75 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export { CinematicHero };
export default CinematicHero;
