import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { HoverFramePlayer } from '@/components/cinematic/HoverFramePlayer';
import { HERO_FRAMES, getHeroFrameUrl, getHeroCanvasDpr } from '@/config/heroFrames';
import { BUSINESS } from '@/config/business';

const CinematicHero: React.FC = () => {
  const reducedMotionStore = useUIStore((s) => s.reducedMotion);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionStore || prefersReducedMotion;
  const [progress, setProgress] = React.useState(0);
  const [isEngaged, setIsEngaged] = React.useState(false);

  return (
    <section
      className="relative w-full min-h-[100dvh] h-auto sm:min-h-[640px] md:min-h-[720px] lg:min-h-[800px] bg-[#05020A] overflow-hidden"
      aria-label="Premium gold and diamond jewellery showcase"
    >
      <div className="absolute inset-0 z-0">
        <HoverFramePlayer
          variant="hero"
          getFrameUrl={getHeroFrameUrl}
          getCanvasDpr={getHeroCanvasDpr}
          settings={HERO_FRAMES}
          reducedMotion={reducedMotion}
          onProgress={setProgress}
          onHoverChange={setIsEngaged}
          ariaLabel="Jewelled bird pendant cinematic showcase"
        />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,2,10,0.5) 0%, rgba(5,2,10,0.25) 35%, rgba(5,2,10,0.4) 60%, rgba(5,2,10,0.85) 85%, #05020A 100%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        animate={{ opacity: isEngaged ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-10 pointer-events-none left-4 sm:left-6 md:left-10 lg:left-14 right-4 top-[max(6.5rem,calc(env(safe-area-inset-top)+4.25rem))] sm:top-28 md:top-32"
      >
        <div className="flex items-center gap-2 text-cream/50 uppercase tracking-[0.35em] sm:tracking-[0.45em] text-[8px] sm:text-[9px] md:text-[10px] font-light">
          <Sparkles className="w-3 h-3 text-gold-400/80" strokeWidth={1.5} />
          <span>Shubham Swarn Kala Kendra</span>
        </div>
      </motion.div>

      <div className="relative z-[2] container min-h-[100dvh] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[800px] flex flex-col justify-center items-center text-center pb-16 sm:pb-20 md:pb-24 lg:pb-28 pt-40 sm:pt-44 md:pt-48 lg:pt-52">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: isEngaged ? 0.6 : 1, y: isEngaged ? -12 : 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="heading-serif font-bold text-cream leading-[1.05]"
          style={{
            fontSize:
              'clamp(2.5rem, 7vw, 5rem)',
          }}
        >
          <span className="block">Timeless Gold.</span>
          <span className="block text-gold-gradient mt-1 sm:mt-2">
            Crafted for Generations.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isEngaged ? 0.5 : 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <Link
            to="/collections"
            className="group btn-primary inline-flex items-center justify-center gap-2 sm:gap-2.5 py-3.5 sm:py-4 px-7 sm:px-9 min-h-[52px] sm:min-h-[56px]"
            aria-label="Explore jewellery collections"
          >
            Explore Jewellery
            <ArrowRight
              className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </motion.div>
      </div>

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
