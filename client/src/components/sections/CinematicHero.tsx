import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, MapPin } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { HeroVideo } from '@/components/cinematic/HeroVideo';
import { Button } from '@/components/ui/Button';
import { BUSINESS, WHATSAPP_PREFILLS, buildWhatsAppUrl } from '@/config/business';

const HERO_WHATSAPP_URL = buildWhatsAppUrl(WHATSAPP_PREFILLS.hero);

const CinematicHero: React.FC = () => {
  const reducedMotionStore = useUIStore((s) => s.reducedMotion);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionStore || prefersReducedMotion;

  const base = reducedMotion ? 0.04 : 0.14;
  const d = (step: number) => (reducedMotion ? 0.04 : base + step);

  const fadeIn = (dy: number, step: number, extraDur?: number) => ({
    initial: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: dy },
    animate: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
    transition: reducedMotion
      ? { duration: 0.05 }
      : {
          delay: d(step),
          duration: extraDur ?? 0.95,
          ease: [0.22, 1, 0.36, 1],
        },
  });

  const blurReveal = (step: number) => ({
    initial: reducedMotion
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 0, y: 22, filter: 'blur(12px)' },
    animate: reducedMotion
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: reducedMotion
      ? { duration: 0.05 }
      : {
          delay: d(step),
          duration: 1.05,
          ease: [0.22, 1, 0.36, 1],
        },
  });

  return (
    <section
      id="hero"
      className="relative w-full hero-section-height bg-[#05020A] overflow-hidden isolate select-none"
      aria-label="Premium gold and diamond jewellery cinematic showcase"
    >
      <div className="absolute inset-0 z-0 w-full h-full">
        <HeroVideo
          reducedMotion={reducedMotion}
          hoverPlay={false}
          onPlaybackEnded={() => {}}
          restartToken={0}
          ariaLabel="Jewellery commercial showcase — Shubham Swarn Kala Kendra"
          mp4SrcOverride="/Jewellery_commercial_for_SSKK_202608271422.mp4"
          sourceMp4FallbackOverride="/Jewellery_commercial_for_SSKK_202608271422_202608311433.mp4"
        />
      </div>

      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="relative h-full w-full container flex items-start md:items-center justify-start pt-28 sm:pt-32 md:pt-20 pb-10 sm:pb-16 md:pb-12">
          <div
            className="w-full max-w-none md:max-w-[75%] lg:max-w-[65%] xl:max-w-[58%] 2xl:max-w-[54%]"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2rem)' }}
          >
            <motion.span
              {...fadeIn(10, 0)}
              className="eyebrow inline-block mb-3 sm:mb-4 text-gold-400"
              style={{ letterSpacing: '0.36em', fontSize: 'clamp(0.65rem, 0.85vw, 0.75rem)' }}
            >
              FINE JEWELLERY & BRIDAL HERITAGE
            </motion.span>

            <motion.div
              initial={reducedMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.9 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={reducedMotion
                ? { duration: 0.05 }
                : {
                    delay: d(0.16),
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }
              }
              style={{
                transformOrigin: 'left center',
                height: '1.5px',
                width: 'clamp(36px, 4.5vw, 52px)',
                background:
                  'linear-gradient(90deg, rgba(212,175,55,0.85) 0%, rgba(212,175,55,0.2) 100%)',
              }}
              aria-hidden="true"
            />

            <h1
              className="mt-4 sm:mt-5 whitespace-pre-line"
              aria-label="Crafted in Gold. Designed for Your Forever."
            >
              <motion.span
                {...blurReveal(0.32)}
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
                {...blurReveal(0.5)}
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
              {...fadeIn(10, 0.85, 0.88)}
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
              {...fadeIn(6, 1.05, 0.82)}
              className="mt-3 sm:mt-4 flex items-center gap-2 text-cream/70"
              style={{ fontSize: 'clamp(0.74rem, 0.9vw, 0.82rem)' }}
            >
              <MapPin size={14} strokeWidth={1.5} className="text-gold-400 shrink-0" />
              <span>
                Showroom: Sabji Mandi Road &middot; {BUSINESS.city} &middot; {BUSINESS.district}, UP
              </span>
            </motion.div>

            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reducedMotion
                ? { duration: 0.05 }
                : {
                    delay: d(1.22),
                    duration: 0.92,
                    ease: [0.22, 1, 0.36, 1],
                  }
              }
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
            </motion.div>
          </div>
        </div>
      </div>

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
