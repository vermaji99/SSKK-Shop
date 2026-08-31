import * as React from 'react';
import { HoverFramePlayer } from '@/components/cinematic/HoverFramePlayer';
import {
  HERO_FRAMES,
  getHeroFrameUrl,
  getHeroCanvasDpr,
} from '@/config/heroFrames';

const FrameSequenceShowcase: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#05020A] isolate select-none showcase-section-height"
      aria-label="Jewelry cinematic showcase — hover to explore jeweled bird pendant in motion"
    >
      <HoverFramePlayer
        getFrameUrl={getHeroFrameUrl}
        getCanvasDpr={getHeroCanvasDpr}
        settings={HERO_FRAMES}
        variant="hero"
        showHint
        className="w-full h-full touch-manipulation"
        ariaLabel="Realtime cinematic jewelry showcase — jeweled bird pendant in motion"
      />

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 52%, rgba(5,2,10,0.86) 100%), linear-gradient(180deg, rgba(5,2,10,0.76) 0%, rgba(5,2,10,0.20) 20%, rgba(5,2,10,0.18) 50%, rgba(5,2,10,0.22) 80%, rgba(5,2,10,0.94) 100%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 top-0 z-[2] h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 5%, rgba(212,175,55,0.46) 22%, rgba(244,215,123,0.90) 50%, rgba(212,175,55,0.46) 78%, transparent 95%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[2] h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 5%, rgba(212,175,55,0.46) 22%, rgba(244,215,123,0.90) 50%, rgba(212,175,55,0.46) 78%, transparent 95%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
};

export { FrameSequenceShowcase };
export default FrameSequenceShowcase;
