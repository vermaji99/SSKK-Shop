import * as React from 'react';
import { motion } from 'framer-motion';
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

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-[#05020A] isolate select-none"
      aria-label="Hover-play cinematic frame sequence — jeweled bird pendant, 11 composed frames rendered full-bleed behind the text"
      style={{ minHeight: 'clamp(620px, 100svh, 1100px)' }}
    >
      <HoverFramePlayer
        getFrameUrl={getHeroFrameUrl}
        getCanvasDpr={getHeroCanvasDpr}
        settings={HERO_FRAMES}
        variant="hero"
        showHint={false}
        onProgress={setProgress}
        onHoverChange={setHovered}
        className="w-full h-full touch-manipulation"
        ariaLabel="Realtime hover-scrub cinematic 4K — 11 hero-frames full-bleed background"
      />

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,2,10,0.78) 0%, rgba(5,2,10,0.34) 24%, rgba(5,2,10,0.24) 48%, rgba(5,2,10,0.38) 70%, rgba(5,2,10,0.76) 88%, rgba(5,2,10,0.96) 100%), radial-gradient(ellipse 58% 48% at 50% 48%, rgba(5,2,10,0.20) 0%, rgba(5,2,10,0.60) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-75"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(5,2,10,0.86) 100%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 top-0 z-[2] h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 5%, rgba(212,175,55,0.44) 20%, rgba(244,215,123,0.88) 50%, rgba(212,175,55,0.44) 80%, transparent 95%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[2] h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 5%, rgba(212,175,55,0.44) 20%, rgba(244,215,123,0.88) 50%, rgba(212,175,55,0.44) 80%, transparent 95%)',
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-[2] mx-auto w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 sm:pb-24 pointer-events-none"
      >
        <PremiumReveal
          yOffset={32}
          duration={1.05}
          className="w-full max-w-4xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="heading-serif text-[clamp(2.1rem,6.4vw,5.4rem)] font-medium leading-[1.05] tracking-[-0.016em]"
            style={{
              color: 'rgba(252,240,206,0.96)',
              letterSpacing: '-0.016em',
              textShadow:
                '0 1px 0 rgba(255,255,255,0.06), 0 3px 40px rgba(5,2,10,0.96), 0 0 1px rgba(244,215,123,0.22)',
            }}
          >
            Eleven Composed Frames.
            <br />
            <span
              style={{
                color: 'rgba(244,215,123,0.88)',
                fontWeight: 400,
                textShadow:
                  '0 2px 44px rgba(5,2,10,0.96), 0 0 1px rgba(244,215,123,0.36), 0 0 22px rgba(212,175,55,0.18)',
              }}
            >
              One Continuous Journey.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 sm:mt-12 mx-auto max-w-xl"
          >
            <div className="relative mx-auto max-w-md sm:max-w-lg">
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
                        height: isCurrent ? '14px' : '9px',
                        background: isCurrent
                          ? 'rgba(255,244,202,0.98)'
                          : isPast
                            ? 'rgba(244,215,123,0.68)'
                            : 'rgba(212,175,55,0.18)',
                        boxShadow: isCurrent
                          ? '0 0 10px 2px rgba(244,215,123,0.78), 0 0 22px 4px rgba(212,175,55,0.36)'
                          : isPast
                            ? '0 0 8px 1px rgba(212,175,55,0.22)'
                            : 'none',
                        transition:
                          'width 120ms ease, height 120ms ease, background 120ms ease, box-shadow 200ms ease',
                      }}
                    />
                  );
                })}
              </div>
              <div
                className="relative h-px w-full overflow-hidden"
                style={{ background: 'rgba(212,175,55,0.14)' }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(212,175,55,0.22) 0%, rgba(244,215,123,0.82) 50%, rgba(255,246,208,0.98) 100%)',
                    boxShadow:
                      '0 0 12px 0 rgba(244,215,123,0.55), 0 0 24px -4px rgba(212,175,55,0.38)',
                  }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.04, ease: 'linear' }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className="uppercase text-[8px] sm:text-[8.5px] tracking-[0.30em] font-light"
                  style={{ color: 'rgba(240,210,120,0.50)' }}
                >
                  001
                </span>
                <span
                  className="uppercase text-[8px] sm:text-[8.5px] tracking-[0.30em] font-light"
                  style={{
                    color: hovered
                      ? 'rgba(252,232,156,0.88)'
                      : isTouch
                        ? 'rgba(242,214,130,0.64)'
                        : 'rgba(242,214,130,0.56)',
                    transition: 'color 160ms ease',
                  }}
                >
                  {hovered
                    ? 'Scrubbing — Frame ' + String(frameIdx).padStart(2, '0')
                    : isTouch
                      ? 'Tap & drag · Frame ' + String(frameIdx).padStart(2, '0')
                      : 'Hover to play · Frame ' + String(frameIdx).padStart(2, '0')}
                </span>
                <span
                  className="uppercase text-[8px] sm:text-[8.5px] tracking-[0.30em] font-light"
                  style={{ color: 'rgba(240,210,120,0.50)' }}
                >
                  {String(HERO_FRAMES.count).padStart(3, '0')}
                </span>
              </div>
            </div>
          </motion.div>
        </PremiumReveal>
      </div>
    </section>
  );
};

export { FrameSequenceShowcase };
export default FrameSequenceShowcase;
