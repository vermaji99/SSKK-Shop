import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { HoverFramePlayer } from '@/components/cinematic/HoverFramePlayer';
import { HERO_FRAMES, getHeroFrameUrl, getHeroCanvasDpr } from '@/config/heroFrames';
import { BUSINESS } from '@/config/business';
import { JEWELRY_IMAGES } from '@/config/assets';

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
            'linear-gradient(180deg, rgba(5,2,10,0.55) 0%, rgba(5,2,10,0.35) 25%, rgba(5,2,10,0.55) 55%, rgba(5,2,10,0.92) 85%, #05020A 100%), linear-gradient(90deg, rgba(5,2,10,0.85) 0%, rgba(5,2,10,0.45) 40%, rgba(5,2,10,0.15) 65%, rgba(5,2,10,0.5) 100%)',
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

      <div className="relative z-[2] container min-h-[100dvh] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[800px] flex flex-col justify-end pb-12 sm:pb-16 md:pb-20 lg:pb-24 pt-36 sm:pt-40 md:pt-44 lg:pt-48">
        <div className="max-w-3xl lg:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 sm:mb-6 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gold-400/25 bg-[#0a0416]/60 backdrop-blur-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" strokeWidth={1.75} />
            <span className="text-gold-200/90 uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-medium">
              {BUSINESS.city}, {BUSINESS.district} • {BUSINESS.state}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="heading-serif font-bold text-cream leading-[1.05]"
            style={{
              fontSize:
                'clamp(2.25rem, 6.2vw, 4.25rem)',
            }}
          >
            <span className="block">Timeless Gold.</span>
            <span className="block text-gold-gradient mt-1 sm:mt-2">
              Crafted for Generations.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 sm:mt-7 text-cream/80 font-light leading-relaxed max-w-2xl"
            style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
            }}
          >
            Discover beautifully crafted gold and diamond jewellery from{' '}
            <span className="text-gold-300 font-medium">{BUSINESS.name}</span>, Doharighat, Mau.
            Handpicked designs for weddings, celebrations, and heirloom moments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4"
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
            <Link
              to="/contact"
              className="group btn-secondary inline-flex items-center justify-center gap-2 sm:gap-2.5 py-3.5 sm:py-4 px-7 sm:px-9 min-h-[52px] sm:min-h-[56px] bg-background-tertiary/30 backdrop-blur-sm"
              aria-label="Visit our store in Doharighat"
            >
              <MapPin className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.75} />
              Visit Our Store
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 sm:mt-12 hidden sm:flex flex-wrap items-center gap-x-8 gap-y-3 text-cream/60 text-xs sm:text-[13px]"
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full gold-gradient" />
              <span>22K & 18K Gold</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full gold-gradient" />
              <span>Diamond & Bridal Collections</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full gold-gradient" />
              <span>Personalized Service</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full gold-gradient" />
              <span>Doharighat Showroom</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="h-px w-full bg-white/[0.06]">
          <div
            className="h-full bg-gradient-to-r from-transparent via-gold-400/70 to-gold-300/90 transition-[width] duration-75 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>

      <div
        className="absolute right-4 sm:right-8 md:right-14 bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 z-[2] hidden md:block"
        aria-hidden="true"
      >
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gold-400/10 blur-2xl" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border border-gold-400/30 overflow-hidden shadow-gold-glow bg-[#0a0416]">
            <img
              src={JEWELRY_IMAGES.bridalSet}
              alt="Premium bridal gold necklace set"
              className="w-full h-full object-cover opacity-95"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { CinematicHero };
export default CinematicHero;
