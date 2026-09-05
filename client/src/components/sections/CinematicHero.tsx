import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, RotateCcw, ArrowRight } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { HeroVideo } from '@/components/cinematic/HeroVideo';
import { Button } from '@/components/ui/Button';
import { BUSINESS } from '@/config/business';

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
      className="relative w-full hero-section-height bg-[#05020A] overflow-hidden isolate select-none"
      aria-label="Premium gold and diamond jewellery commercial showcase"
    >
      {/* Background Commercial Video */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <HeroVideo
          reducedMotion={reducedMotion}
          hoverPlay={false}
          loop={false}
          onPlaybackEnded={handleVideoEnded}
          restartToken={restartToken}
          ariaLabel="Jewellery commercial showcase — Shubham Swarn Kala Kendra"
          mp4SrcOverride="/Jewellery_commercial_for_SSKK_202608271422.mp4"
          sourceMp4FallbackOverride="/Jewellery_commercial_for_SSKK_202608271422_202608311433.mp4"
        />
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

      {/* Animated Text Content Reveal (Once Video Ends or User Skips) */}
      <AnimatePresence>
        {showContent && (
          <div className="absolute inset-0 z-[2] pointer-events-none">
            <div className="relative h-full w-full container flex items-start md:items-center justify-start pt-28 sm:pt-32 md:pt-20 pb-10 sm:pb-16 md:pb-12">
              <motion.div
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-none md:max-w-[75%] lg:max-w-[65%] xl:max-w-[58%] 2xl:max-w-[54%]"
                style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2rem)' }}
              >
                {/* Shop Name requested explicitly by user */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.7 }}
                  className="eyebrow inline-block mb-3 sm:mb-4 text-gold-400 font-semibold"
                  style={{ letterSpacing: '0.36em', fontSize: 'clamp(0.7rem, 0.9vw, 0.82rem)' }}
                >
                  SHUBHAM SWARN KALA KENDRA
                </motion.span>

                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    transformOrigin: 'left center',
                    height: '1.5px',
                    width: 'clamp(36px, 4.5vw, 52px)',
                    background:
                      'linear-gradient(90deg, rgba(212,175,55,0.9) 0%, rgba(212,175,55,0.2) 100%)',
                  }}
                  aria-hidden="true"
                />

                <h1
                  className="mt-4 sm:mt-5 whitespace-pre-line"
                  aria-label="Crafted in Gold. Designed for Your Forever."
                >
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42, duration: 0.8 }}
                    className="block font-serif hero-gold-text hero-gold-sheen"
                    style={{
                      fontWeight: 500,
                      lineHeight: 1.06,
                      letterSpacing: '-0.016em',
                      fontSize: 'clamp(1.85rem, 4.2vw, 3.65rem)',
                      textShadow:
                        '0 2px 20px rgba(5,2,10,0.9), 0 0 24px rgba(244,215,123,0.12)',
                    }}
                  >
                    Crafted in Gold.
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.8 }}
                    className="block font-serif hero-cream-text mt-1 sm:mt-1.5"
                    style={{
                      fontWeight: 500,
                      lineHeight: 1.06,
                      letterSpacing: '-0.014em',
                      fontSize: 'clamp(1.75rem, 3.9vw, 3.45rem)',
                    }}
                  >
                    Designed for Your Forever.
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="mt-4 sm:mt-5 max-w-lg text-cream/90 font-sans leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)',
                    letterSpacing: '0.005em',
                    textShadow: '0 1px 12px rgba(5,2,10,0.85)',
                  }}
                >
                  Timeless gold and diamond jewellery, thoughtfully crafted for life's most meaningful moments.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.82, duration: 0.8 }}
                  className="mt-3 sm:mt-4 flex items-center gap-2 text-cream/70"
                  style={{ fontSize: 'clamp(0.74rem, 0.9vw, 0.82rem)' }}
                >
                  <MapPin size={14} strokeWidth={1.5} className="text-gold-400 shrink-0" />
                  <span>
                    Showroom: Sabji Mandi Road &middot; {BUSINESS.city} &middot; {BUSINESS.district}, UP
                  </span>
                </motion.div>

                {/* Single-Line Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95, duration: 0.85 }}
                  className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 pointer-events-auto"
                >
                  <Button
                    asChild
                    variant="primary"
                    size="lg"
                    className="whitespace-nowrap px-7 py-3 text-xs tracking-[0.18em]"
                  >
                    <Link to="/collections" className="whitespace-nowrap">EXPLORE COLLECTION</Link>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="whitespace-nowrap px-7 py-3 text-xs tracking-[0.18em]"
                  >
                    <Link to="/contact#visit" className="whitespace-nowrap">BOOK SHOWROOM VISIT</Link>
                  </Button>

                  {/* Replay Video Action */}
                  <button
                    type="button"
                    onClick={handleReplay}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 border border-gold-400/30 hover:border-gold-400/60 text-gold-300 hover:text-gold text-xs uppercase tracking-[0.16em] transition-all bg-[#0B0515]/60 backdrop-blur-sm"
                    aria-label="Replay commercial video"
                  >
                    <RotateCcw size={13} /> Replay
                  </button>
                </motion.div>
              </motion.div>
            </div>
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
