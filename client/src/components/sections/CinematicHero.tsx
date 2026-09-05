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
          hoverPlay
          onPlaybackEnded={() => {}}
          restartToken={0}
          ariaLabel="Jewellery cinematic showcase — hover desktop to play, tap on mobile"
          webmSrcOverride={null}
          mp4SrcOverride={null}
          sourceMp4FallbackOverride={null}
        />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 65% 62% at 50% 46%, transparent 0%, rgba(5,2,10,0.58) 56%, rgba(5,2,10,0.94) 100%), ' +
            'linear-gradient(90deg, rgba(5,2,10,0.55) 0%, rgba(5,2,10,0.22) 38%, rgba(5,2,10,0.0) 58%, rgba(5,2,10,0.14) 78%, rgba(5,2,10,0.62) 100%)',
        }}
      />

      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="relative h-full w-full container flex items-start md:items-center justify-start pt-28 sm:pt-32 md:pt-20 pb-10 sm:pb-16 md:pb-12">
          <div
            className="w-full max-w-none md:max-w-[78%] lg:max-w-[72%] xl:max-w-[68%] 2xl:max-w-[62%]"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2.5rem)' }}
          >
            <motion.span
              {...fadeIn(10, 0)}
              className="eyebrow inline-block mb-5 sm:mb-6"
              style={{ letterSpacing: '0.32em' }}
            >
              {BUSINESS.name.toUpperCase()}
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
                width: 'clamp(44px, 6vw, 62px)',
                background:
                  'linear-gradient(90deg, rgba(212,175,55,0.62) 0%, rgba(212,175,55,0.32) 100%)',
              }}
              aria-hidden="true"
            />

            <h1
              className="mt-5 sm:mt-7 whitespace-pre-line"
              aria-label="Crafted in Gold. Designed for Your Forever."
            >
              <motion.span
                {...blurReveal(0.32)}
                className="block font-serif hero-gold-text hero-gold-sheen"
                style={{
                  fontWeight: 500,
                  lineHeight: 1.02,
                  letterSpacing: '-0.018em',
                  fontSize: 'clamp(2.1rem, 5.8vw, 5rem)',
                  textShadow:
                    '0 1px 22px rgba(5,2,10,0.86), 0 0 26px rgba(244,215,123,0.07)',
                }}
              >
                Crafted in Gold.
              </motion.span>
              <motion.span
                {...blurReveal(0.5)}
                className="block font-serif hero-cream-text mt-1 sm:mt-1.5"
                style={{
                  fontWeight: 500,
                  lineHeight: 1.04,
                  letterSpacing: '-0.016em',
                  fontSize: 'clamp(2rem, 5.55vw, 4.85rem)',
                }}
              >
                Designed for Your Forever.
              </motion.span>
            </h1>

            <motion.p
              {...fadeIn(10, 0.85, 0.88)}
              className="mt-6 sm:mt-8 max-w-2xl lg:max-w-[560px] xl:max-w-[620px] text-cream/80 font-sans leading-relaxed"
              style={{
                fontSize: 'clamp(0.95rem, 1.38vw, 1.12rem)',
                letterSpacing: '0.004em',
              }}
            >
              Timeless jewellery crafted with precision, passion and trusted craftsmanship in Doharighat, Mau.
            </motion.p>

            <motion.div
              {...fadeIn(6, 1.05, 0.82)}
              className="mt-4 sm:mt-5 flex items-center gap-2 text-cream/55"
              style={{ fontSize: 'clamp(0.76rem, 1vw, 0.86rem)' }}
            >
              <MapPin size={14} strokeWidth={1.5} className="text-gold-400/80 shrink-0" />
              <span>
                Sabji Mandi Road &middot; {BUSINESS.city} &middot; {BUSINESS.district}, UP
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
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-start gap-3 sm:gap-4 max-w-[760px]"
            >
              <Button
                asChild
                variant="primary"
                size="lg"
                className="w-full sm:w-auto sm:min-w-[220px]"
              >
                <Link to="/collections">EXPLORE JEWELLERY</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto sm:min-w-[256px]"
              >
                <Link to="/contact#visit">BOOK A SHOWROOM VISIT</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto sm:min-w-[204px] border border-gold-400/[0.32] hover:border-gold-400/[0.64] hover:bg-gold-400/[0.07]"
              >
                <a
                  href={HERO_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp SSKK about jewellery collections"
                >
                  <MessageCircle size={16} strokeWidth={1.75} />
                  WHATSAPP US
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CinematicHero };
export default CinematicHero;
