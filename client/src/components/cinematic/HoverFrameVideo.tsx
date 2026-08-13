import * as React from 'react';
import { HoverFramePlayer } from '@/components/cinematic/HoverFramePlayer';
import {
  CINEMATIC_FRAMES,
  getCinematicFrameUrl,
  getCinematicCanvasDpr,
} from '@/config/cinematicFrames';

interface HoverFrameVideoProps {
  className?: string;
  aspectRatio?: string;
}

export const HoverFrameVideo: React.FC<HoverFrameVideoProps> = ({
  className,
  aspectRatio = '4/5',
}) => (
  <HoverFramePlayer
    variant="card"
    className={className}
    aspectRatio={aspectRatio}
    getFrameUrl={getCinematicFrameUrl}
    getCanvasDpr={getCinematicCanvasDpr}
    settings={CINEMATIC_FRAMES}
    ariaLabel="Interactive cinematic jewelry showcase — hover or tap to play"
  />
);

export default HoverFrameVideo;
