import React from 'react';
import { Shield, Gem, Award, Sparkles, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

const trustItems: Array<{
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}> = [
  { label: 'BIS Hallmarked', icon: Shield },
  { label: 'Certified Diamonds', icon: Gem },
  { label: '22K & 18K', icon: Award },
  { label: 'Authentic Craftsmanship', icon: Sparkles },
  { label: 'Custom Designs', icon: Compass },
];

const ICON_CLASS = 'w-5 h-5 md:w-[22px] md:h-[22px] text-gold-400';
const ICON_STROKE = 1.5;

export const TrustBar: React.FC = () => {
  return (
    <section
      aria-label="Trust markers — BIS hallmark, certified diamonds, purity and craftsmanship"
      className="relative border-y border-gold-400/15 bg-background-secondary/60"
    >
      <div className="container py-5 md:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-y-5 gap-x-4 md:gap-0">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === trustItems.length - 1;
            return (
              <div
                key={item.label}
                className={cn(
                  'relative flex items-center justify-center gap-2.5 md:gap-3 py-1',
                  'md:px-4 lg:px-2 xl:px-4',
                  !isLast && 'md:after:content-[""] md:after:absolute md:after:top-1/2 md:after:right-0 md:after:-translate-y-1/2 md:after:w-px md:after:h-8 md:after:bg-gold-400/20 md:after:hidden lg:after:block'
                )}
              >
                <div className="flex items-center justify-center shrink-0">
                  <Icon className={ICON_CLASS} strokeWidth={ICON_STROKE} />
                </div>
                <span className="font-medium tracking-[0.18em] text-[11px] sm:text-[12px] md:text-[13px] uppercase text-cream/85 whitespace-nowrap md:whitespace-normal md:text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
