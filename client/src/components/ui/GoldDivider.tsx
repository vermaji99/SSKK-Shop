import * as React from 'react';
import { cn } from '@/lib/utils';

interface GoldDividerProps {
  className?: string;
  width?: number;
  thickness?: number;
}

const GoldDivider: React.FC<GoldDividerProps> = ({
  className,
  width = 80,
  thickness = 1,
}) => {
  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      aria-hidden="true"
    >
      <div
        className="gold-gradient"
        style={{
          width: `${width}px`,
          height: `${thickness}px`,
          maskImage:
            'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          opacity: 0.9,
        }}
      />
    </div>
  );
};

export { GoldDivider };
export default GoldDivider;
