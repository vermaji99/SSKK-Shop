import * as React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Maximize2, Film, Disc3 } from 'lucide-react';
import { HoverFramePlayer } from '@/components/cinematic/HoverFramePlayer';
import { PremiumReveal } from '@/components/ui';
import { useDeviceProfile } from '@/hooks/useDeviceProfile';
import {
  HERO_FRAMES,
  getHeroFrameUrl,
  getHeroCanvasDpr,
} from '@/config/heroFrames';

const FrameSequenceShowcase: React.FC = () => {
  const [progress, setProgress] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const { isTouch } = useDeviceProfile();

  const frameIdx = React.useMemo(
    () => Math.max(1, Math.round(progress * (HERO_FRAMES.count - 1)) + 1),
    [progress]
  );

  const subtitle = isTouch
    ? 'Tap and drag across the frame to explore our jeweled bird pendant — the whole canvas animates behind you, as smooth as a cinematic replay.'
    : 'Move your cursor across the frame to scrub through our jeweled bird pendant — the entire section background animates behind the text, stitched together in realtime with 60fps crossfade for a playback indistinguishable from film.';

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-[#05020A] isolate select-none"
      aria-label="Hover-play cinematic frame sequence — jeweled bird pendant, 11 composed frames rendered full-bleed behind the text"
      style={{ minHeight: 'clamp(640px, 100svh, 1200px)' }}
    >
      <div className="absolute inset-0 z-0 w-full h-full">
        <HoverFramePlayer
          getFrameUrl={getHeroFrameUrl}
          getCanvasDpr={getHeroCanvasDpr}
          settings={HERO_FRAMES}
          variant="hero"
          showHint={false}
          onProgress={setProgress}
          onHoverChange={setHovered}
          className="w-full h-full touch-manipulation cursor-crosshair"
          ariaLabel="Realtime 4K hover-scrub cinematic — 11 hero-frames rendered full-bleed"
        />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,2,10,0.70) 0%, rgba(5,2,10,0.32) 22%, rgba(5,2,10,0.22) 42%, rgba(5,2,10,0.36) 62%, rgba(5,2,10,0.72) 82%, rgba(5,2,10,0.94) 94%, #05020A 100%), radial-gradient(ellipse 55% 45% at 50% 48%, rgba(5,2,10,0.18) 0%, rgba(5,2,10,0.56) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 52%, rgba(5,2,10,0.82) 100%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 top-0 z-[2] h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 4%, rgba(212,175,55,0.50) 18%, rgba(244,215,123,0.95) 50%, rgba(212,175,55,0.50) 82%, transparent 96%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[2] h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 4%, rgba(212,175,55,0.50) 18%, rgba(244,215,123,0.95) 50%, rgba(212,175,55,0.50) 82%, transparent 96%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 z-[3] pointer-events-none"
        animate={{
          opacity: hovered ? [0.6, 1, 0.6] : [0.4, 0.75, 0.4],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(18,8,38,0.72) 0%, rgba(10,4,22,0.82) 100%)',
            border: '1px solid rgba(212,175,55,0.28)',
            backdropFilter: 'blur(10px) saturate(1.25)',
            WebkitBackdropFilter: 'blur(10px) saturate(1.25)',
            boxShadow:
              '0 10px 40px -10px rgba(0,0,0,0.90), 0 0 0 1px rgba(255,255,255,0.04) inset',
          }}
        >
          <Disc3
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin"
            style={{
              color: '#F4D77B',
              animationDuration: '5.5s',
              filter: 'drop-shadow(0 0 6px rgba(244,215,123,0.75))',
            }}
          />
          <span
            className="uppercase text-[8.5px] sm:text-[9.5px] tracking-[0.38em] sm:tracking-[0.46em] font-medium"
            style={{ color: 'rgba(252,232,156,0.90)' }}
          >
            Live · Frame {String(frameIdx).padStart(2, '0')} / {String(HERO_FRAMES.count).padStart(2, '0')}
          </span>
          <Film
            className="w-3 h-3 sm:w-3.5 sm:h-3.5"
            style={{
              color: '#F4D77B',
              filter: 'drop-shadow(0 0 6px rgba(244,215,123,0.75))',
            }}
          />
        </div>
      </motion.div>

      <div className="relative z-[2] mx-auto w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-24 sm:pb-28">
        <PremiumReveal
          yOffset={40}
          duration={1.15}
          className="w-full max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 sm:mb-7"
          >
            <span
              className="inline-flex items-center gap-2.5 sm:gap-3 uppercase text-[10px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.48em] font-medium"
              style={{ color: 'rgba(244,215,123,0.80)' }}
            >
              <span
                className="inline-block w-10 sm:w-16 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)',
                }}
                aria-hidden="true"
              />
              Frame · by · Frame · Cinematic
              <span
                className="inline-block w-10 sm:w-16 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)',
                }}
                aria-hidden="true"
              />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="heading-serif text-[clamp(2.1rem,6.2vw,5.1rem)] font-medium leading-[1.04] tracking-[-0.016em]"
            style={{
              background:
                'linear-gradient(135deg, #FFF8E6 0%, #FBE7A6 16%, #F4D77B 36%, #E8C65A 56%, #D4AF37 74%, #C29A27 88%, #F8E2A0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              filter:
                'drop-shadow(0 4px 22px rgba(212,175,55,0.22))',
            }}
          >
            Eleven Composed Frames.
            <br />
            <span
              style={{
                color: 'rgba(252,238,204,0.92)',
                WebkitTextFillColor: 'rgba(252,238,204,0.92)',
                textShadow:
                  '0 2px 40px rgba(5,2,10,0.92), 0 0 1px rgba(244,215,123,0.25)',
              }}
            >
              One Continuous Journey.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: 'blur(9px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.95, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-7 mx-auto max-w-3xl body-serif text-[clamp(0.98rem,1.45vw,1.15rem)] leading-[1.78] font-light"
            style={{
              color: 'rgba(250,236,200,0.74)',
              textShadow: '0 2px 30px rgba(5,2,10,0.9)',
            }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 sm:mt-12 mx-auto max-w-3xl"
          >
            <div
              className="relative p-5 sm:p-7 rounded-[22px] sm:rounded-[28px]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(20,10,42,0.50) 0%, rgba(10,4,22,0.66) 100%)',
                border: '1px solid rgba(212,175,55,0.22)',
                backdropFilter: 'blur(14px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(14px) saturate(1.4)',
                boxShadow:
                  '0 24px 80px -30px rgba(0,0,0,0.92), 0 0 0 1px rgba(255,255,255,0.045) inset',
              }}
            >
              <div
                className="pointer-events-none absolute -inset-x-[1px] -top-[1px] h-px rounded-t-[28px]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(244,215,123,0.70) 50%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              <div className="flex items-center justify-between gap-3 sm:gap-6 mb-5 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span
                    className="relative inline-flex items-center justify-center w-2 h-2"
                    aria-hidden="true"
                  >
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'radial-gradient(circle at 35% 35%, #FFEEB0 0%, #F4D77B 50%, #C99A2B 100%)',
                        boxShadow:
                          '0 0 10px 2px rgba(244,215,123,0.85), 0 0 22px 4px rgba(212,175,55,0.42)',
                      }}
                    />
                  </span>
                  <span
                    className="uppercase text-[8.5px] sm:text-[9.5px] tracking-[0.34em] sm:tracking-[0.42em] font-medium"
                    style={{
                      color: hovered
                        ? 'rgba(252,232,156,0.96)'
                        : 'rgba(242,214,130,0.82)',
                    }}
                  >
                    {hovered ? 'Scrubbing — Realtime' : isTouch ? 'Tap & drag anywhere' : 'Hover anywhere'}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[9px] tracking-[0.30em] uppercase"
                  style={{ color: 'rgba(248,236,200,0.52)' }}
                >
                  <Sparkles className="w-3 h-3" style={{ color: 'rgba(244,215,123,0.55)' }} />
                  4K canvas · 60fps
                </div>
              </div>

              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 right-0 -translate-y-1/2 top-1/2 flex items-center justify-between pointer-events-none"
                  aria-hidden="true"
                >
                  {Array.from({ length: HERO_FRAMES.count }).map((_, i) => {
                    const isCurrent = i === frameIdx - 1;
                    const isPast = i < frameIdx - 1;
                    return (
                      <span
                        key={i}
                        className="block rounded-full"
                        style={{
                          width: isCurrent ? '3px' : '1px',
                          height: isCurrent ? '16px' : '10px',
                          background: isCurrent
                            ? 'rgba(255,245,208,0.98)'
                            : isPast
                              ? 'rgba(244,215,123,0.72)'
                              : 'rgba(212,175,55,0.18)',
                          boxShadow: isCurrent
                            ? '0 0 12px 2px rgba(244,215,123,0.85), 0 0 24px 6px rgba(212,175,55,0.40)'
                            : isPast
                              ? '0 0 8px 1px rgba(212,175,55,0.28)'
                              : 'none',
                          transition:
                            'width 140ms ease, height 140ms ease, background 140ms ease, box-shadow 220ms ease',
                        }}
                      />
                    );
                  })}
                </div>
                <div
                  className="relative h-[3px] w-full overflow-hidden rounded-full"
                  style={{ background: 'rgba(212,175,55,0.14)' }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(212,175,55,0.30) 0%, rgba(244,215,123,0.86) 45%, rgba(255,246,208,1) 55%, rgba(244,215,123,0.78) 100%)',
                      boxShadow:
                        '0 0 14px 0 rgba(244,215,123,0.65), 0 0 30px -4px rgba(212,175,55,0.45)',
                    }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.04, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute inset-y-0 rounded-full pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,251,228,0.78) 50%, rgba(255,255,255,0) 100%)',
                      width: '28%',
                      mixBlendMode: 'screen',
                      filter: 'blur(0.7px)',
                    }}
                    animate={{
                      left: [`${Math.max(0, progress * 100 - 30)}%`, `${Math.min(100, progress * 100 + 4)}%`, `${Math.max(0, progress * 100 - 30)}%`],
                    }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>

              <div className="mt-2.5 sm:mt-3 flex items-center justify-between">
                <span
                  className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.22em] sm:tracking-[0.28em] font-medium"
                  style={{ color: 'rgba(240,210,120,0.52)' }}
                >
                  001 — Setting
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3" style={{ color: 'rgba(244,215,123,0.48)' }} />
                  <span
                    className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.28em]"
                    style={{ color: 'rgba(248,236,200,0.48)' }}
                  >
                    {isTouch ? 'Auto‑plays while in view' : 'Idle → auto‑loop playback'}
                  </span>
                </div>
                <span
                  className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.22em] sm:tracking-[0.28em] font-medium"
                  style={{ color: 'rgba(240,210,120,0.52)' }}
                >
                  {String(HERO_FRAMES.count).padStart(3, '0')} — Polish
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ staggerChildren: 0.07, delayChildren: 0.55 }}
            className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mx-auto"
            style={{ maxWidth: 'min(100%, 860px)' }}
          >
            {[
              {
                value: `${HERO_FRAMES.count}`,
                label: 'Composed Frames',
                sub: 'Hand‑staged jewel lighting',
              },
              {
                value: '60fps',
                label: 'Realtime Crossfade',
                sub: 'smootherstep blend curves',
              },
              {
                value: '4K+',
                label: 'Canvas Rendering',
                sub: 'DPR‑aware HiDPI pipeline',
              },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="relative p-4.5 sm:p-5 rounded-2xl sm:rounded-[20px] text-center"
                style={{
                  padding: '1.15rem 1rem 1.15rem',
                  background:
                    'linear-gradient(180deg, rgba(22,10,44,0.55) 0%, rgba(10,4,22,0.62) 100%)',
                  border: '1px solid rgba(212,175,55,0.18)',
                  backdropFilter: 'blur(12px) saturate(1.3)',
                  WebkitBackdropFilter: 'blur(12px) saturate(1.3)',
                  boxShadow:
                    '0 18px 60px -30px rgba(0,0,0,0.88), 0 0 0 1px rgba(255,255,255,0.035) inset',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 mx-auto w-[58%] h-px rounded-t-[20px]"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(244,215,123,0.48), transparent)',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="heading-serif text-2xl sm:text-[1.85rem] font-semibold"
                  style={{
                    background:
                      'linear-gradient(135deg, #FFF8E2 0%, #F4D77B 55%, #C29A27 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                    letterSpacing: '-0.01em',
                    filter: 'drop-shadow(0 2px 10px rgba(212,175,55,0.18))',
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-1.5 uppercase text-[9.5px] sm:text-[10.5px] tracking-[0.24em] sm:tracking-[0.30em] font-medium"
                  style={{ color: 'rgba(244,215,123,0.76)' }}
                >
                  {s.label}
                </div>
                <div
                  className="mt-1 text-[10.5px] sm:text-[11px] font-light"
                  style={{ color: 'rgba(248,236,200,0.50)' }}
                >
                  {s.sub}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 sm:mt-11 mx-auto"
          >
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2 rounded-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(20,10,42,0.55) 0%, rgba(10,4,22,0.72) 100%)',
                border: '1px solid rgba(212,175,55,0.22)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <Maximize2
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                style={{
                  color: '#F4D77B',
                  filter: 'drop-shadow(0 0 6px rgba(244,215,123,0.6))',
                }}
              />
              <span
                className="uppercase text-[8.5px] sm:text-[9.5px] tracking-[0.34em] sm:tracking-[0.42em] font-medium"
                style={{ color: 'rgba(248,236,200,0.70)' }}
              >
                Full‑bleed · hero‑frames 001 → {String(HERO_FRAMES.count).padStart(3, '0')}
              </span>
            </div>
          </motion.div>
        </PremiumReveal>
      </div>
    </section>
  );
};

export { FrameSequenceShowcase };
export default FrameSequenceShowcase;
