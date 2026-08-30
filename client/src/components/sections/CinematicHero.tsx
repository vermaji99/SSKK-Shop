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
    y: '88%',
    rotateX: -70,
    filter: 'blur(14px)',
    transition: { duration: 0 },
  }),
  show: (i: number) => ({
    opacity: 1,
    y: '0%',
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.95,
      delay: i * 0.035,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const WORD = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};

const LINE = {
  hidden: {},
  show: (lineIdx: number) => ({
    transition: {
      staggerChildren: 0.12,
      delayChildren: lineIdx * 0.38,
    },
  }),
};

const CinematicHero: React.FC = () => {
  const reducedMotionStore = useUIStore((s) => s.reducedMotion);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionStore || prefersReducedMotion;
  const [revealBrand, setRevealBrand] = React.useState(false);

  const handleFirstPlaybackComplete = React.useCallback(() => {
    setRevealBrand(true);
  }, []);

  const lettersKey = React.useCallback((idx: number) => idx, []);

  return (
    <section
      className="relative w-full min-h-[100svh] h-auto sm:min-h-[640px] md:min-h-[720px] lg:min-h-[800px] bg-[#05020A] overflow-hidden isolate select-none"
      aria-label="Premium gold and diamond jewellery showcase"
    >
      <div className="absolute inset-0 z-0">
        <HeroVideo
          reducedMotion={reducedMotion}
          hoverPlay
          onFirstPlaybackComplete={handleFirstPlaybackComplete}
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

      <AnimatePresence>
        {revealBrand && (
          <motion.div
            key="hero-brand"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[2] pointer-events-none flex items-center justify-center px-4 sm:px-6"
            style={{ perspective: '1400px' }}
            aria-hidden={!revealBrand}
          >
            <motion.div
              className="relative text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -inset-y-6 sm:-inset-x-20 sm:-inset-y-10 rounded-[40px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.55, 0.22, 0.42, 0.18] }}
                transition={{
                  duration: 3.2,
                  times: [0, 0.22, 0.5, 0.78, 1],
                  ease: 'easeOut',
                }}
                style={{
                  background:
                    'radial-gradient(ellipse 62% 52% at 50% 48%, rgba(244,215,123,0.16) 0%, rgba(212,175,55,0.10) 35%, rgba(212,175,55,0.04) 62%, transparent 100%)',
                  filter: 'blur(18px)',
                }}
              />

              <div className="relative space-y-1">
                {BRAND_LINES.map((line, lineIdx) => (
                <motion.div
                  key={line.text}
                  variants={LINE}
                  custom={lineIdx}
                  className="relative overflow-visible"
                  style={{
                    lineHeight: 1.02,
                  }}
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
                          style={{
                            width: 'clamp(0.3em, 0.65vw, 0.48em)',
                          }}
                          aria-hidden="true"
                        />
                      )}
                      <motion.span
                        key={`w-${lineIdx}-${wordIdx}`}
                        className="inline-flex"
                        variants={WORD}
                      >
                        {Array.from(word).map((ch, chIdx) => {
                          const globalIdx =
                            lineIdx * 100 + wordIdx * 20 + chIdx;
                          return (
                            <motion.span
                              key={`c-${lineIdx}-${wordIdx}-${chIdx}-${lettersKey(globalIdx)}`}
                              custom={globalIdx}
                              variants={LETTER}
                              className={`inline-block font-serif font-medium tracking-tight ${
                                line.tone === 'gold'
                                  ? 'text-gold-gradient hero-letter-sheen'
                                  : 'text-cream'
                              }`}
                              style={{
                                fontSize:
                                  lineIdx === 0
                                    ? 'clamp(1.95rem, 7.6vw, 5.4rem)'
                                    : 'clamp(2.15rem, 8.5vw, 5.9rem)',
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
              ))}
              </div>

              <motion.div
                className="relative mx-auto mt-6 sm:mt-8"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: reducedMotion ? 0 : 1.35,
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: '50% 50%',
                }}
              >
                <div
                  className="mx-auto h-px"
                  style={{
                    width: 'clamp(120px, 28vw, 300px)',
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.55) 15%, rgba(244,215,123,0.96) 50%, rgba(212,175,55,0.55) 85%, transparent 100%)',
                  }}
                />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-3 h-6"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: [0, 1, 0], y: [0, -10, 0] }}
                  transition={{
                    delay: reducedMotion ? 0 : 2.1,
                    duration: 1.4,
                    ease: 'easeOut',
                  }}
                  style={{
                    background:
                      'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(244,215,123,0.62) 0%, rgba(212,175,55,0.22) 45%, transparent 100%)',
                    filter: 'blur(4px)',
                  }}
                />
              </motion.div>

              <motion.p
                className="mt-6 sm:mt-7 uppercase text-[10.5px] sm:text-[11.5px] text-cream/58"
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: reducedMotion ? 0 : 1.6,
                  duration: 0.95,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  letterSpacing: 'clamp(0.28em, 0.52vw, 0.46em)',
                }}
              >
                <span className="inline-flex items-center gap-2 justify-center">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-gold-400/90 shadow-[0_0_10px_2px_rgba(244,215,123,0.85)]"
                    aria-hidden="true"
                  />
                  Since 1985
                  <span className="text-gold-400/70">&middot;</span>
                  Doharighat
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-400/90 shadow-[0_0_10px_2px_rgba(244,215,123,0.85)]" aria-hidden="true" />
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
