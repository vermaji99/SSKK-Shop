import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { HeroVideo } from '@/components/cinematic/HeroVideo';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/Button';
import { BUSINESS } from '@/config/business';

const HERO_MOBILE_BREAKPOINT = '(max-width: 639.98px)';
const HERO_MOBILE_MP4 =
  '/Jewellery_commercial_for_SSKK_202608271422_202608311433.mp4';
const HERO_DESKTOP_MP4 =
  '/Jewellery_commercial_for_SSKK_202608271422.mp4';

const BRAND_LINES = [
  { text: 'Shubham Swarn', tone: 'cream' },
  { text: 'Kala Kendra', tone: 'gold' },
];

const LETTER = {
  hidden: (i: number) => ({
    opacity: 0,
    y: '92%',
    rotateX: -62,
    filter: 'blur(16px)',
    transition: { duration: 0 },
  }),
  show: (i: number) => ({
    opacity: 1,
    y: '0%',
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.05,
      delay: i * 0.028,
      ease: [0.19, 1.05, 0.32, 1],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: '-70%',
    rotateX: 44,
    filter: 'blur(12px)',
    transition: {
      duration: 0.62,
      delay: i * 0.012,
      ease: [0.55, 0, 0.68, 0.06],
    },
  }),
};

const WORD = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.015,
      delayChildren: 0,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.01,
      staggerDirection: -1,
    },
  },
};

const LINE = {
  hidden: {},
  show: (lineIdx: number) => ({
    transition: {
      staggerChildren: 0.09,
      delayChildren: lineIdx * 0.22,
    },
  }),
  exit: (lineIdx: number) => ({
    transition: {
      staggerChildren: 0.05,
      delayChildren: lineIdx * 0.04,
      staggerDirection: -1,
    },
  }),
};

const BRAND_ANIMATION_TOTAL_MS = 5600;
const BRAND_EXIT_FADE_MS = 1100;

const CinematicHero: React.FC = () => {
  const reducedMotionStore = useUIStore((s) => s.reducedMotion);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionStore || prefersReducedMotion;
  const isMobile = useMediaQuery(HERO_MOBILE_BREAKPOINT);
  const [revealBrand, setRevealBrand] = React.useState(false);
  const [exitBrand, setExitBrand] = React.useState(false);
  const [restartToken, setRestartToken] = React.useState<number>(0);

  const timersRef = React.useRef<{
    restart?: ReturnType<typeof setTimeout>;
    exit?: ReturnType<typeof setTimeout>;
    autoTrigger?: ReturnType<typeof setTimeout>;
    cycleLock?: boolean;
  }>({});

  const startBrandCycle = React.useCallback(() => {
    if (timersRef.current.cycleLock) return;
    timersRef.current.cycleLock = true;

    if (timersRef.current.autoTrigger) {
      clearTimeout(timersRef.current.autoTrigger);
      timersRef.current.autoTrigger = undefined;
    }
    if (timersRef.current.restart) clearTimeout(timersRef.current.restart);
    if (timersRef.current.exit) clearTimeout(timersRef.current.exit);

    setRevealBrand(true);
    setExitBrand(false);

    const total = reducedMotion ? 800 : BRAND_ANIMATION_TOTAL_MS;
    const exitStart = Math.max(200, total - BRAND_EXIT_FADE_MS);

    timersRef.current.exit = setTimeout(() => {
      setExitBrand(true);
    }, exitStart);

    timersRef.current.restart = setTimeout(() => {
      setRestartToken((n) => n + 1);
      setRevealBrand(false);
      setExitBrand(false);
      timersRef.current.cycleLock = false;
    }, total);
  }, [reducedMotion]);

  const handleFirstPlaybackComplete = React.useCallback(() => {
    startBrandCycle();
  }, [startBrandCycle]);

  React.useEffect(() => {
    const autoDelay = reducedMotion ? 900 : 2800;
    timersRef.current.autoTrigger = setTimeout(() => {
      startBrandCycle();
    }, autoDelay);

    return () => {
      if (timersRef.current.autoTrigger) clearTimeout(timersRef.current.autoTrigger);
      if (timersRef.current.restart) clearTimeout(timersRef.current.restart);
      if (timersRef.current.exit) clearTimeout(timersRef.current.exit);
    };
  }, [reducedMotion, startBrandCycle]);

  const lettersKey = React.useCallback((idx: number) => idx, []);

  return (
    <section
      className="relative w-full hero-section-height bg-[#05020A] overflow-hidden isolate select-none"
      aria-label="Premium gold and diamond jewellery showcase"
    >
      <div className="absolute inset-0 z-0 w-full h-full" style={{ height: '100%', width: '100%', top: 0, left: 0, right: 0, bottom: 0 }}>
        <HeroVideo
          reducedMotion={reducedMotion}
          hoverPlay
          onPlaybackEnded={handleFirstPlaybackComplete}
          restartToken={restartToken}
          ariaLabel="Jewellery commercial cinematic showcase — hover to play, tap to play on mobile"
          webmSrcOverride={null}
          mp4SrcOverride={isMobile ? HERO_MOBILE_MP4 : HERO_DESKTOP_MP4}
          sourceMp4FallbackOverride={isMobile ? HERO_MOBILE_MP4 : HERO_DESKTOP_MP4}
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

      <AnimatePresence mode="wait">
        {revealBrand && (
          <motion.div
            key="hero-brand"
            initial="hidden"
            animate={exitBrand ? 'exit' : 'show'}
            exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
            variants={{
              hidden: {},
              show: {},
              exit: {},
            }}
            className="absolute inset-0 z-[2] pointer-events-none flex items-center justify-center px-4 sm:px-6"
            style={{ perspective: '1400px' }}
            aria-hidden={!revealBrand}
          >
            <motion.div
              className="relative text-center"
              initial={{ opacity: 0, y: 10, scale: 0.992 }}
              animate={{
                opacity: exitBrand ? 0 : 1,
                y: exitBrand ? -18 : 0,
                scale: exitBrand ? 1.012 : 1,
                filter: exitBrand ? 'blur(8px)' : 'blur(0px)',
              }}
              transition={{ duration: exitBrand ? 0.9 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-12 -inset-y-8 sm:-inset-x-20 sm:-inset-y-12 rounded-[48px]"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: exitBrand ? [0.25, 0] : [0, 0.35, 0.16, 0.28, 0.12],
                  scale: exitBrand ? [1, 1.02] : [0.985, 1.005, 0.998, 1.008, 1],
                }}
                transition={{
                  duration: exitBrand ? 0.9 : 4.6,
                  times: exitBrand ? [0, 1] : [0, 0.22, 0.48, 0.76, 1],
                  ease: 'easeOut',
                }}
                style={{
                  background:
                    'radial-gradient(ellipse 55% 48% at 50% 48%, rgba(255,243,202,0.12) 0%, rgba(250,226,148,0.08) 22%, rgba(244,215,123,0.05) 44%, rgba(212,175,55,0.025) 66%, transparent 100%)',
                  filter: 'blur(18px)',
                }}
              />

              <div className="relative space-y-0.5 sm:space-y-1">
                {(() => {
                  let flatLetterIdx = 0;
                  return BRAND_LINES.map((line, lineIdx) => (
                    <motion.div
                      key={line.text}
                      variants={LINE}
                      custom={lineIdx}
                      className="relative overflow-visible"
                      style={{ lineHeight: 1.02 }}
                    >
                      <motion.div
                        variants={WORD}
                        className="inline-flex flex-wrap justify-center items-baseline"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {line.text.split(' ').map((word, wordIdx) => (
                          <React.Fragment key={`${lineIdx}-${wordIdx}`}>
                            {wordIdx > 0 && (
                              <span
                                className="inline-block"
                                style={{ width: 'clamp(0.35em, 0.7vw, 0.55em)' }}
                                aria-hidden="true"
                              />
                            )}
                            <motion.span
                              key={`w-${lineIdx}-${wordIdx}`}
                              className="inline-flex"
                              variants={WORD}
                            >
                              {Array.from(word).map((ch, chIdx) => {
                                const letterId = flatLetterIdx;
                                flatLetterIdx += 1;
                                return (
                                  <motion.span
                                    key={`c-${lineIdx}-${wordIdx}-${chIdx}-${lettersKey(letterId)}`}
                                    custom={letterId}
                                    variants={LETTER}
                                    className={`inline-block font-serif font-medium tracking-[-0.01em] ${
                                      line.tone === 'gold'
                                        ? 'hero-gold-text hero-gold-sheen'
                                        : 'hero-cream-text'
                                    }`}
                                    style={{
                                      fontSize:
                                        lineIdx === 0
                                          ? 'clamp(2.05rem, 8.1vw, 5.8rem)'
                                          : 'clamp(2.25rem, 9vw, 6.3rem)',
                                      transformOrigin: '50% 90%',
                                      backfaceVisibility: 'hidden',
                                    }}
                                  >
                                    {ch}
                                  </motion.span>
                                );
                              })}
                            </motion.span>
                          </React.Fragment>
                        ))}
                      </motion.div>
                    </motion.div>
                  ));
                })()}
              </div>

              <motion.div
                className="relative mx-auto mt-6 sm:mt-9"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: exitBrand ? 0 : 1,
                  opacity: exitBrand ? 0 : 1,
                }}
                transition={{
                  delay: exitBrand ? 0 : reducedMotion ? 0 : 1.75,
                  duration: exitBrand ? 0.55 : 1.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: '50% 50%' }}
              >
                <div
                  className="mx-auto h-px"
                  style={{
                    width: 'clamp(140px, 30vw, 320px)',
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.25) 14%, rgba(244,215,123,0.55) 30%, rgba(255,243,200,0.82) 50%, rgba(244,215,123,0.55) 70%, rgba(212,175,55,0.25) 86%, transparent 100%)',
                    boxShadow:
                      '0 0 10px rgba(244,215,123,0.15), 0 0 22px -4px rgba(212,175,55,0.08)',
                  }}
                />
              </motion.div>

              <motion.p
                className="mt-6 sm:mt-8 uppercase tracking-widest text-[10.5px] sm:text-[11.5px]"
                initial={{ opacity: 0, y: 10, filter: 'blur(7px)' }}
                animate={{
                  opacity: exitBrand ? 0 : 1,
                  y: exitBrand ? -6 : 0,
                  filter: exitBrand ? 'blur(5px)' : 'blur(0px)',
                  color: exitBrand ? 'rgba(250,238,202,0)' : 'rgba(250,238,202,0.7)',
                }}
                transition={{
                  delay: exitBrand ? 0.1 : reducedMotion ? 0 : 2.05,
                  duration: exitBrand ? 0.6 : 1.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  letterSpacing: 'clamp(0.28em, 0.5vw, 0.45em)',
                }}
              >
                <span className="inline-flex items-center gap-2.5 justify-center">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 35%, #FBE8B3 0%, #E7C65A 50%, #C9A227 100%)',
                      boxShadow:
                        '0 0 6px rgba(244,215,123,0.35), 0 0 14px rgba(212,175,55,0.16)',
                    }}
                    aria-hidden="true"
                  />
                  {BUSINESS.city}
                  <span style={{ color: 'rgba(228,196,102,0.65)' }}>&middot;</span>
                  {BUSINESS.district}
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 35%, #FBE8B3 0%, #E7C65A 50%, #C9A227 100%)',
                      boxShadow:
                        '0 0 6px rgba(244,215,123,0.35), 0 0 14px rgba(212,175,55,0.16)',
                    }}
                    aria-hidden="true"
                  />
                </span>
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: reducedMotion ? 0.15 : 0.5,
          duration: reducedMotion ? 0.4 : 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 z-[3] pointer-events-auto flex flex-col items-center justify-end px-4 sm:px-6 md:px-8 pb-10 sm:pb-16 md:pb-20"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2.5rem)' }}
      >
        <div className="w-full max-w-4xl text-center">
          <h1
            className="font-serif font-medium leading-[1.05] tracking-[-0.012em] hero-gold-text hero-gold-sheen"
            style={{
              fontSize: 'clamp(2rem, 5.4vw, 4.25rem)',
              textShadow: '0 1px 18px rgba(5,2,10,0.78), 0 0 28px rgba(244,215,123,0.06)',
            }}
          >
            Timeless Jewellery. Made for Your Most Precious Moments.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? 0.3 : 0.95,
              duration: reducedMotion ? 0.4 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-4 sm:mt-6 max-w-2xl font-sans text-cream/75 text-[13.5px] sm:text-[15px] md:text-[16.5px] leading-relaxed tracking-wide"
            style={{ letterSpacing: '0.01em' }}
          >
            <span className="text-cream/90 font-medium">{BUSINESS.name}</span>
            <span className="mx-2 text-gold-400/70">&middot;</span>
            Premium Gold &amp; Diamond Jewellery
            <span className="mx-2 text-gold-400/70">&middot;</span>
            {BUSINESS.city}, {BUSINESS.district}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? 0.45 : 1.35,
              duration: reducedMotion ? 0.4 : 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px]">
              <Link to="/collections">
                Explore Jewellery
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">
              <a
                href={BUSINESS.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Shubham Swarn Kala Kendra"
              >
                <MessageCircle className="h-4.5 w-4.5" strokeWidth={2} />
                WhatsApp Us
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export { CinematicHero };
export default CinematicHero;
