import * as React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clapperboard, Maximize2 } from 'lucide-react';
import { HoverFramePlayer } from '@/components/cinematic/HoverFramePlayer';
import { PremiumReveal } from '@/components/ui';
import {
  HERO_FRAMES,
  getHeroFrameUrl,
  getHeroCanvasDpr,
} from '@/config/heroFrames';

const FrameSequenceShowcase: React.FC = () => {
  const [progress, setProgress] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const frameIdx = React.useMemo(
    () => Math.round(progress * (HERO_FRAMES.count - 1)) + 1,
    [progress]
  );

  return (
    <section
      className="section-padding relative overflow-hidden bg-[#050210] border-y border-gold-500/10"
      aria-label="Realtime cinematic frame sequence — hover to explore our jeweled bird pendant"
    >
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120vw] h-[80vw] max-w-[1400px] max-h-[900px] rounded-full opacity-25 sm:opacity-30 blur-[120px] sm:blur-[160px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, #2D0B55 0%, rgba(212,175,55,0.12) 45%, transparent 78%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-60 bg-noise"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 5%, rgba(212,175,55,0.45) 20%, rgba(244,215,123,0.95) 50%, rgba(212,175,55,0.45) 80%, transparent 95%)',
        }}
        aria-hidden="true"
      />

      <div className="container relative px-4 sm:px-6 lg:px-8">
        <PremiumReveal yOffset={36} duration={1.05} className="mb-10 sm:mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-flex items-center gap-2.5 uppercase text-[10px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.46em] font-medium"
              style={{ color: 'rgba(240,210,120,0.8)' }}
            >
              <span
                className="inline-block w-10 sm:w-14 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)',
                }}
                aria-hidden="true"
              />
              Frame&nbsp;·&nbsp;by&nbsp;·&nbsp;Frame&nbsp;·&nbsp;Cinematic
              <span
                className="inline-block w-10 sm:w-14 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)',
                }}
                aria-hidden="true"
              />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 sm:mt-6 heading-serif text-[clamp(1.95rem,5.2vw,3.9rem)] font-medium leading-[1.05] tracking-[-0.014em]"
            style={{
              background:
                'linear-gradient(135deg, #FFF5DD 0%, #F8E2A0 22%, #F0C96A 48%, #E2B84D 70%, #C99A2B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              filter:
                'drop-shadow(0 3px 16px rgba(212,175,55,0.18))',
            }}
          >
            Eleven Composed Frames.
            <br />
            <span style={{ color: 'rgba(250,238,210,0.88)', WebkitTextFillColor: 'rgba(250,238,210,0.88)' }}>
              One Continuous Journey.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 sm:mt-6 mx-auto max-w-2xl body-serif text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed font-light"
            style={{ color: 'rgba(248,236,200,0.64)' }}
          >
            Hover across the frame to scrub through our jeweled bird pendant —
            a sequence of 11 hand-composed stills, stitched together in
            realtime with cinematic crossfade, motion-trail, and 4K canvas
            rendering for a playback as smooth as film.
          </motion.p>
        </PremiumReveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.978, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.05, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
          style={{
            maxWidth: 'min(100%, 1280px)',
          }}
        >
          <div
            className="absolute -inset-x-3 sm:-inset-x-5 -inset-y-4 sm:-inset-y-6 rounded-[36px] pointer-events-none opacity-90"
            style={{
              background:
                'linear-gradient(135deg, rgba(244,215,123,0.20) 0%, rgba(212,175,55,0.10) 18%, rgba(212,175,55,0.02) 40%, rgba(212,175,55,0.02) 62%, rgba(212,175,55,0.10) 82%, rgba(244,215,123,0.22) 100%)',
              filter: 'blur(1px)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute -inset-[1px] sm:-inset-[1.5px] rounded-[22px] sm:rounded-[28px] pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(244,215,123,0.70) 0%, rgba(212,175,55,0.36) 16%, rgba(212,175,55,0.12) 36%, rgba(212,175,55,0.10) 64%, rgba(212,175,55,0.38) 84%, rgba(244,215,123,0.70) 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-[1.5px] sm:inset-[2.5px] rounded-[21px] sm:rounded-[27px] pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.28) 100%), linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(5,2,10,0) 14%, rgba(5,2,10,0) 86%, rgba(0,0,0,0.18) 100%)',
            }}
            aria-hidden="true"
          />

          <div
            className="relative rounded-[20px] sm:rounded-[26px] overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95),0_0_0_1px_rgba(212,175,55,0.10)_inset]"
            style={{ transform: 'translateZ(0)' }}
          >
            <div
              className="absolute left-0 right-0 top-0 z-20 h-[28px] sm:h-[34px] flex items-center justify-between px-3 sm:px-4 bg-gradient-to-b from-[#050210]/88 via-[#050210]/50 to-transparent pointer-events-none"
              aria-hidden="true"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="inline-block w-[6px] h-[6px] rounded-full bg-[#FF5F57] shadow-[0_0_8px_rgba(255,95,87,0.55)]" />
                <span className="inline-block w-[6px] h-[6px] rounded-full bg-[#FEBC2E] shadow-[0_0_8px_rgba(254,188,46,0.5)]" />
                <span className="inline-block w-[6px] h-[6px] rounded-full bg-[#28C840] shadow-[0_0_8px_rgba(40,200,64,0.55)]" />
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: 'rgba(244,215,123,0.55)' }} />
                <span
                  className="uppercase text-[8.5px] sm:text-[9.5px] tracking-[0.32em] sm:tracking-[0.42em] font-medium"
                  style={{ color: 'rgba(244,215,123,0.62)' }}
                >
                  Frame {String(frameIdx).padStart(2, '0')} / {String(HERO_FRAMES.count).padStart(2, '0')}
                </span>
                <Clapperboard className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: 'rgba(244,215,123,0.55)' }} />
              </div>
            </div>

            <HoverFramePlayer
              getFrameUrl={getHeroFrameUrl}
              getCanvasDpr={getHeroCanvasDpr}
              settings={HERO_FRAMES}
              aspectRatio="21 / 9"
              variant="hero"
              showHint
              onProgress={setProgress}
              onHoverChange={setHovered}
              ariaLabel="Realtime hover-scrub cinematic of jeweled bird pendant — 11 frames, cinematic crossfade"
            />

            <div
              className="absolute left-0 right-0 bottom-0 z-20 h-[46px] sm:h-[56px] bg-gradient-to-t from-[#050210]/95 via-[#050210]/55 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            <div className="absolute left-3 sm:left-5 right-3 sm:right-5 bottom-3 sm:bottom-4 z-30 pointer-events-none">
              <div className="flex items-end justify-between gap-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <motion.div
                    animate={{
                      opacity: hovered ? 1 : 0.55,
                      scale: hovered ? 1 : 0.96,
                    }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-1.5"
                  >
                    <span
                      className="relative inline-block w-1.5 h-1.5 rounded-full"
                      style={{
                        background:
                          'radial-gradient(circle at 35% 35%, #FFE69A 0%, #F4D77B 45%, #C99A2B 100%)',
                        boxShadow:
                          '0 0 10px 2px rgba(244,215,123,0.8), 0 0 20px 4px rgba(212,175,55,0.35)',
                        animation: 'pulse 1.6s ease-in-out infinite',
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="uppercase text-[8.5px] sm:text-[9.5px] tracking-[0.32em] sm:tracking-[0.4em] font-medium"
                      style={{
                        color: hovered
                          ? 'rgba(252,230,150,0.92)'
                          : 'rgba(240,210,120,0.68)',
                      }}
                    >
                      LIVE · 4K CANVAS
                    </span>
                  </motion.div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: 'rgba(244,215,123,0.5)' }} />
                  <span
                    className="uppercase text-[9px] tracking-[0.36em] font-light"
                    style={{ color: 'rgba(248,236,200,0.5)' }}
                  >
                    Realtime crossfade · Motion trail · Drift
                  </span>
                </div>
              </div>

              <div className="mt-2.5 sm:mt-3 relative">
                <div
                  className="absolute inset-y-0 left-0 right-0 flex items-center justify-between"
                  aria-hidden="true"
                >
                  {Array.from({ length: HERO_FRAMES.count }).map((_, i) => (
                    <span
                      key={i}
                      className="block w-px h-1.5 rounded-full"
                      style={{
                        background:
                          i <= frameIdx - 1
                            ? 'rgba(250,222,140,0.78)'
                            : 'rgba(212,175,55,0.18)',
                        boxShadow:
                          i === frameIdx - 1
                            ? '0 0 8px 2px rgba(244,215,123,0.7)'
                            : 'none',
                        transition: 'background 120ms ease, box-shadow 180ms ease',
                      }}
                    />
                  ))}
                </div>
                <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-gold-400/12">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(212,175,55,0.2) 0%, rgba(244,215,123,0.92) 50%, rgba(255,245,200,0.98) 100%)',
                      boxShadow:
                        '0 0 12px 0 rgba(244,215,123,0.55), 0 0 24px -4px rgba(212,175,55,0.35)',
                    }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between">
                  <span
                    className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.22em]"
                    style={{ color: 'rgba(240,210,120,0.42)' }}
                  >
                    001 — Setting
                  </span>
                  <span
                    className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.22em]"
                    style={{ color: 'rgba(240,210,120,0.42)' }}
                  >
                    {String(HERO_FRAMES.count).padStart(3, '0')} — Polish
                  </span>
                </div>
              </div>
            </div>
          </div>

          <PremiumReveal
            variant="fade-up"
            delay={0.25}
            duration={0.9}
            yOffset={24}
            className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mx-auto"
            style={{ maxWidth: 'min(100%, 960px)' }}
          >
            {[
              {
                value: `${HERO_FRAMES.count}`,
                label: 'Composed Frames',
                sub: 'Hand-staged jewel lighting',
              },
              {
                value: '60fps',
                label: 'Realtime Crossfade',
                sub: 'smootherstep blend curves',
              },
              {
                value: '4K+',
                label: 'Canvas Rendering',
                sub: 'DPR-aware HiDPI pipeline',
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07 }}
                className="relative p-5 sm:p-6 rounded-2xl text-center"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(20,8,40,0.70) 0%, rgba(9,4,18,0.82) 100%)',
                  border: '1px solid rgba(212,175,55,0.16)',
                  boxShadow:
                    '0 18px 60px -32px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.025) inset',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 mx-auto w-[55%] h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(244,215,123,0.45), transparent)',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="heading-serif text-2xl sm:text-3xl font-semibold"
                  style={{
                    background:
                      'linear-gradient(135deg, #FFF7DD 0%, #F4D77B 55%, #C99A2B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-1.5 uppercase text-[9.5px] sm:text-[10.5px] tracking-[0.25em] sm:tracking-[0.3em] font-medium"
                  style={{ color: 'rgba(244,215,123,0.72)' }}
                >
                  {s.label}
                </div>
                <div
                  className="mt-1 text-[11px] sm:text-xs font-light"
                  style={{ color: 'rgba(248,236,200,0.46)' }}
                >
                  {s.sub}
                </div>
              </motion.div>
            ))}
          </PremiumReveal>
        </motion.div>
      </div>
    </section>
  );
};

export { FrameSequenceShowcase };
export default FrameSequenceShowcase;
