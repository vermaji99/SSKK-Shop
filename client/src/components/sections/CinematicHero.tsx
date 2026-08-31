import * as React from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { HeroVideo } from '@/components/cinematic/HeroVideo';

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
      <div className="absolute inset-0 z-0 w-full h-full max-sm:h-screen max-sm:h-[100svh] max-sm:h-[100dvh] max-sm:min-h-[480px]">
        <HeroVideo
          reducedMotion={reducedMotion}
          hoverPlay
          onPlaybackEnded={handleFirstPlaybackComplete}
          restartToken={restartToken}
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
            className="absolute inset-0 z-[2] pointer-events-none flex items-center justify-center px-4 sm:px-6 max-sm:items-start max-sm:pt-[22vh] max-sm:pt-[22svh] max-sm:pt-[22dvh]"
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
                className="pointer-events-none absolute -inset-x-12 -inset-y-8 sm:-inset-x-24 sm:-inset-y-14 rounded-[48px]"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: exitBrand ? [0.5, 0] : [0, 0.82, 0.34, 0.62, 0.28],
                  scale: exitBrand ? [1, 1.04] : [0.97, 1.01, 0.995, 1.015, 1],
                }}
                transition={{
                  duration: exitBrand ? 0.95 : 4.6,
                  times: exitBrand ? [0, 1] : [0, 0.2, 0.46, 0.74, 1],
                  ease: 'easeOut',
                }}
                style={{
                  background:
                    'radial-gradient(ellipse 58% 50% at 50% 48%, rgba(255,243,202,0.22) 0%, rgba(250,226,148,0.15) 18%, rgba(244,215,123,0.12) 36%, rgba(212,175,55,0.07) 56%, rgba(178,140,35,0.03) 78%, transparent 100%), radial-gradient(ellipse 38% 32% at 50% 44%, rgba(255,251,232,0.16) 0%, transparent 65%)',
                  filter: 'blur(22px)',
                }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[22%] top-[36%] bottom-[30%] rounded-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: exitBrand ? [0.28, 0] : [0, 0.48, 0.14, 0.36, 0.1],
                }}
                transition={{
                  duration: exitBrand ? 0.7 : 4.2,
                  times: exitBrand ? [0, 1] : [0, 0.25, 0.5, 0.76, 1],
                  ease: 'easeOut',
                }}
                style={{
                  background:
                    'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(255,246,214,0.30) 0%, rgba(244,215,123,0.10) 45%, transparent 78%)',
                  filter: 'blur(14px)',
                  mixBlendMode: 'screen',
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
                      'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.35) 12%, rgba(244,215,123,0.75) 28%, rgba(255,243,200,0.98) 50%, rgba(244,215,123,0.75) 72%, rgba(212,175,55,0.35) 88%, transparent 100%)',
                    boxShadow:
                      '0 0 18px 0 rgba(244,215,123,0.28), 0 0 42px -6px rgba(212,175,55,0.18)',
                  }}
                />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-3 h-7"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{
                    opacity: exitBrand ? 0 : [0, 0.9, 0, 0.7, 0],
                    y: exitBrand ? 0 : [0, -12, -4, -14, 0],
                  }}
                  transition={{
                    delay: exitBrand ? 0 : reducedMotion ? 0 : 2.5,
                    duration: exitBrand ? 0.4 : 2.4,
                    ease: 'easeOut',
                    times: exitBrand ? [0, 1] : [0, 0.2, 0.45, 0.75, 1],
                  }}
                  style={{
                    background:
                      'radial-gradient(ellipse 48% 62% at 50% 50%, rgba(255,236,170,0.72) 0%, rgba(244,215,123,0.34) 38%, rgba(212,175,55,0.14) 68%, transparent 100%)',
                    filter: 'blur(5px)',
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
                  letterSpacing: 'clamp(0.3em, 0.55vw, 0.5em)',
                  textShadow: '0 0 18px rgba(244,215,123,0.12)',
                }}
              >
                <span className="inline-flex items-center gap-2.5 justify-center">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 35%, #FFF4C8 0%, #F4D77B 42%, #D4AF37 100%)',
                      boxShadow:
                        '0 0 10px 2px rgba(244,215,123,0.85), 0 0 24px 4px rgba(212,175,55,0.38)',
                    }}
                    aria-hidden="true"
                  />
                  Since 1985
                  <span style={{ color: 'rgba(228,196,102,0.78)' }}>&middot;</span>
                  Doharighat
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 35%, #FFF4C8 0%, #F4D77B 42%, #D4AF37 100%)',
                      boxShadow:
                        '0 0 10px 2px rgba(244,215,123,0.85), 0 0 24px 4px rgba(212,175,55,0.38)',
                    }}
                    aria-hidden="true"
                  />
                </span>
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export { CinematicHero };
export default CinematicHero;
