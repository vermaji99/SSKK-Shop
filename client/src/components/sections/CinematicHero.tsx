import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, RotateCcw, ArrowRight } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { HeroVideo } from '@/components/cinematic/HeroVideo';
import { Button } from '@/components/ui/Button';
import { BUSINESS } from '@/config/business';
import { cn } from '@/lib/utils';

const CinematicHero: React.FC = () => {
  const reducedMotionStore = useUIStore((s) => s.reducedMotion);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionStore || prefersReducedMotion;

  const [videoFinished, setVideoFinished] = React.useState(false);
  const [userSkipped, setUserSkipped] = React.useState(false);
  const [restartToken, setRestartToken] = React.useState(0);

  const showContent = videoFinished || userSkipped || reducedMotion;

  const handleVideoEnded = React.useCallback(() => {
    setVideoFinished(true);
  }, []);

  const handleSkip = React.useCallback(() => {
    setUserSkipped(true);
  }, []);

  const handleReplay = React.useCallback(() => {
    setVideoFinished(false);
    setUserSkipped(false);
    setRestartToken((prev) => prev + 1);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full hero-section-height bg-[#07040B] overflow-hidden isolate select-none flex items-center justify-center"
      aria-label="Premium gold and diamond jewellery commercial showcase"
    >
      {/* Background Commercial Video Container - Smoothly Fades to Dark BG on Completion */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[#07040B]">
        <div
          className={cn(
            'w-full h-full transition-all duration-1000 ease-in-out',
            showContent ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          )}
        >
          <HeroVideo
            reducedMotion={reducedMotion}
            hoverPlay={false}
            loop={false}
            onPlaybackEnded={handleVideoEnded}
            restartToken={restartToken}
            ariaLabel="Jewellery commercial showcase — Shubham Swarn Kala Kendra"
            mp4SrcOverride="/Jewellery_commercial_for_SSKK_202608271422.mp4"
            mp4SrcMobileOverride="/Jewellery_commercial_for_SSKK_202608271422_202608311433.mp4"
            sourceMp4FallbackOverride="/Jewellery_commercial_for_SSKK_202608271422_202608311433.mp4"
          />
        </div>

        {/* Dark Luxury Gradient Overlay */}
        <div
          className={cn(
            'absolute inset-0 z-[1] transition-opacity duration-1000 ease-in-out pointer-events-none',
            showContent ? 'opacity-100' : 'opacity-40'
          )}
          style={{
            background: showContent
              ? 'radial-gradient(ellipse 85% 85% at 50% 45%, rgba(18, 9, 28, 0.96) 0%, rgba(7, 4, 11, 0.99) 70%, rgba(5, 2, 8, 1) 100%)'
              : 'linear-gradient(to bottom, rgba(5,2,10,0.2) 0%, rgba(5,2,10,0.55) 100%)',
          }}
        />

        {/* Subtle Ambient Gold Radial Lighting for Finished State */}
        {showContent && (
          <div
            className="absolute inset-0 z-[1] pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-1000"
            style={{
              background:
                'radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.22) 0%, rgba(212, 175, 55, 0.05) 45%, transparent 75%)',
            }}
          />
        )}
      </div>

      {/* While Video Is Playing: Sleek Commercial Indicator */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 right-6 sm:right-10 z-[10] flex items-center gap-3"
          >
            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#0B0515]/90 border border-gold-400/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-cream/90 font-medium">
                Playing Commercial
              </span>
            </div>

            <button
              type="button"
              onClick={handleSkip}
              className="flex items-center gap-1.5 px-4 py-2 bg-gold-400 text-purple-950 font-semibold text-[11px] uppercase tracking-[0.18em] hover:bg-gold-300 transition-colors shadow-lg"
            >
              Skip to Content <ArrowRight size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered Luxury Text & CTA Reveal (Appears on Dark Background Once Video Ends) */}
      <AnimatePresence>
        {showContent && (
          <div className="relative z-[2] pointer-events-none w-full container flex items-center justify-center pt-24 sm:pt-28 md:pt-16 pb-12 sm:pb-16 text-center">
            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-3xl xl:max-w-4xl mx-auto flex flex-col items-center text-center px-4"
              style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)' }}
            >
              {/* Shop Name Eyebrow */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="eyebrow inline-block mb-3 sm:mb-4 text-gold-400 font-semibold tracking-[0.34em]"
                style={{ fontSize: 'clamp(0.72rem, 0.95vw, 0.85rem)' }}
              >
                SHUBHAM SWARN KALA KENDRA
              </motion.span>

              {/* Centered Gold Accent Divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mb-4 sm:mb-5"
                style={{
                  transformOrigin: 'center center',
                  height: '1.5px',
                  width: 'clamp(40px, 5vw, 60px)',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.9) 50%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Centered Main Headline */}
              <h1
                className="max-w-2xl lg:max-w-3xl mx-auto whitespace-pre-line"
                aria-label="Crafted in Gold. Designed for Your Forever."
              >
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.8 }}
                  className="block font-serif hero-gold-text hero-gold-sheen"
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.08,
                    letterSpacing: '-0.015em',
                    fontSize: 'clamp(2rem, 4.5vw, 3.85rem)',
                    textShadow:
                      '0 4px 30px rgba(5,2,10,0.9), 0 0 30px rgba(244,215,123,0.15)',
                  }}
                >
                  Crafted in Gold.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.8 }}
                  className="block font-serif hero-cream-text mt-1.5 sm:mt-2"
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.08,
                    letterSpacing: '-0.012em',
                    fontSize: 'clamp(1.85rem, 4.2vw, 3.55rem)',
                  }}
                >
                  Designed for Your Forever.
                </motion.span>
              </h1>

              {/* Centered Subheadline Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-4 sm:mt-5 max-w-xl mx-auto text-cream/90 font-sans leading-relaxed"
                style={{
                  fontSize: 'clamp(0.95rem, 1.25vw, 1.08rem)',
                  letterSpacing: '0.005em',
                }}
              >
                Timeless BIS hallmarked gold and certified diamond jewellery, thoughtfully crafted for life's most meaningful moments.
              </motion.p>

              {/* Centered Location Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.82, duration: 0.8 }}
                className="mt-4 flex items-center justify-center gap-2 text-cream/75"
                style={{ fontSize: 'clamp(0.75rem, 0.95vw, 0.84rem)' }}
              >
                <MapPin size={14} strokeWidth={1.5} className="text-gold-400 shrink-0" />
                <span>
                  Showroom: Sabji Mandi Road &middot; {BUSINESS.city} &middot; {BUSINESS.district}, UP
                </span>
              </motion.div>

              {/* Centered Single-Line Action Bar */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.85 }}
                className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pointer-events-auto w-full max-w-md sm:max-w-none"
              >
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto whitespace-nowrap px-8 py-3.5 text-xs tracking-[0.2em] shadow-lg hover:shadow-gold-400/20"
                >
                  <Link to="/collections" className="whitespace-nowrap">EXPLORE COLLECTION</Link>
                </Button>

                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto whitespace-nowrap px-8 py-3.5 text-xs tracking-[0.2em]"
                >
                  <Link to="/contact#visit" className="whitespace-nowrap">BOOK SHOWROOM VISIT</Link>
                </Button>

                {/* Replay Video Button */}
                <button
                  type="button"
                  onClick={handleReplay}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-gold-400/30 hover:border-gold-400/70 text-gold-300 hover:text-gold text-xs uppercase tracking-[0.18em] transition-all bg-[#0B0515]/70 backdrop-blur-md"
                  aria-label="Replay commercial video"
                >
                  <RotateCcw size={13} /> Replay
                </button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[3] hidden md:flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-sans">
          Scroll to explore
        </span>
        <div className="w-5 h-8 border border-gold-400/40 rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-gold-400"
          />
        </div>
      </motion.div>
    </section>
  );
};

export { CinematicHero };
export default CinematicHero;

