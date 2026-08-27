import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, MoveRight } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { HeroVideo } from '@/components/cinematic/HeroVideo';
import { useDeviceProfile } from '@/hooks/useDeviceProfile';
import { BUSINESS } from '@/config/business';

const CinematicHero: React.FC = () => {
  const reducedMotionStore = useUIStore((s) => s.reducedMotion);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionStore || prefersReducedMotion;
  const { prefersHover } = useDeviceProfile();
  const [progress, setProgress] = React.useState(0);

  const showHoverHint = prefersHover && !reducedMotion;

  return (
    <section
      className="relative w-full min-h-[100svh] h-auto sm:min-h-[640px] md:min-h-[720px] lg:min-h-[800px] bg-[#05020A] overflow-hidden isolate select-none"
      aria-label="Premium gold and diamond jewellery showcase"
    >
      <div className="absolute inset-0 z-0">
        <HeroVideo
          reducedMotion={reducedMotion}
          hoverScrub
          onProgress={setProgress}
          onReady={() => setProgress((p) => (p > 0 ? p : 0.02))}
          ariaLabel="Jewellery commercial cinematic showcase — move cursor to scrub"
        />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,2,10,0.55) 0%, rgba(5,2,10,0.22) 32%, rgba(5,2,10,0.38) 60%, rgba(5,2,10,0.86) 86%, #05020A 100%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute z-10 pointer-events-none left-4 sm:left-6 md:left-10 lg:left-14 right-4 top-[max(6.5rem,calc(env(safe-area-inset-top)+4.25rem))] sm:top-28 md:top-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 text-cream/50 uppercase tracking-[0.35em] sm:tracking-[0.45em] text-[8px] sm:text-[9px] md:text-[10px] font-light"
        >
          <Sparkles className="w-3 h-3 text-gold-400/80" strokeWidth={1.5} />
          <span>Shubham Swarn Kala Kendra</span>
        </motion.div>
      </div>

      <div className="relative z-[2] container min-h-[100svh] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[800px] flex flex-col justify-center items-center text-center pb-16 sm:pb-20 md:pb-24 lg:pb-28 pt-40 sm:pt-44 md:pt-48 lg:pt-52">
        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="heading-serif font-medium text-cream leading-[1.06]"
          style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 3.4rem)',
          }}
        >
          <span className="block tracking-tight">Timeless Gold.</span>
          <span
            className="block text-gold-gradient mt-1.5 tracking-tight"
            style={{ fontSize: 'clamp(2.05rem, 5.3vw, 3.9rem)' }}
          >
            Crafted for Generations.
          </span>
        </motion.h1>

        {showHoverHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 sm:mt-6 flex items-center gap-2 text-gold-400/75 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.28em] font-medium"
          >
            <MoveRight
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-[hero-hint_2.4s_ease-in-out_infinite]"
              strokeWidth={1.75}
            />
            <span>Move to explore</span>
            <MoveRight
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-[hero-hint_2.4s_ease-in-out_infinite_0.15s]"
              strokeWidth={1.75}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 sm:mt-8 md:mt-9"
        >
          <Link
            to="/collections"
            className="group btn-primary inline-flex items-center justify-center gap-2.5 py-3.5 px-7 sm:px-8 min-h-[48px] sm:min-h-[52px]"
            style={{ fontSize: 'clamp(0.625rem, 0.92vw, 0.78rem)', letterSpacing: '0.17em' }}
            aria-label="Explore jewellery collections"
          >
            <span className="tracking-widest">Explore Jewellery</span>
            <ArrowRight
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-600 ease-out group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none pb-[env(safe-area-inset-bottom)]"
        aria-hidden="true"
      >
        <div className="h-px w-full bg-white/[0.06]">
          <div
            className="h-full bg-gradient-to-r from-transparent via-gold-400/70 to-gold-300/90 transition-[width] duration-100 ease-out"
            style={{ width: `${Math.max(1, Math.round(progress * 100))}%` }}
          />
        </div>
      </div>

      <style>{`
        @keyframes hero-hint {
          0%, 100% { transform: translateX(0); opacity: 0.55; }
          50% { transform: translateX(6px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes hero-hint {
            0%, 100% { transform: translateX(0); opacity: 0.75; }
          }
        }
      `}</style>
    </section>
  );
};

export { CinematicHero };
export default CinematicHero;
