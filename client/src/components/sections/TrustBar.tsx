import React from 'react';
import { Shield, Gem, Award, Sparkles, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

const trustItems: Array<{
  label: string;
  icon: React.ComponentType<any>;
}> = [
  { label: 'BIS HALLMARKED GOLD', icon: Shield },
  { label: 'CERTIFIED DIAMONDS', icon: Gem },
  { label: '22K & 18K GOLD', icon: Award },
  { label: 'AUTHENTIC CRAFTSMANSHIP', icon: Sparkles },
  { label: 'TRUSTED JEWELLERY SHOWROOM', icon: Compass },
];

const ICON_CLASS =
  'w-[18px] h-[18px] sm:w-[19px] sm:h-[19px] md:w-[20px] md:h-[20px] text-gold-400/90 shrink-0';
const ICON_STROKE = 1.5;

export const TrustBar: React.FC = () => {
  return (
    <section
      aria-label="Trust markers — BIS hallmark, certified diamonds, purity and craftsmanship"
      className="relative border-y border-gold-400/[0.14] bg-background-secondary/40"
    >
      <div className="container py-3.5 sm:py-5 md:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-3.5 gap-x-2.5 sm:gap-x-4 md:gap-x-6 md:gap-y-0">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            const last = idx === trustItems.length - 1;
            return (
              <div
                key={item.label}
                className={cn(
                  'relative flex items-center justify-center gap-2 sm:gap-3 py-1 sm:py-1.5 md:py-2 min-h-[44px]',
                  last && 'col-span-2 sm:col-span-1',
                  !last &&
                    'md:after:content-[""] md:after:absolute md:after:top-1/2 md:after:right-0 md:after:-translate-y-1/2 md:after:w-px md:after:h-8 md:after:bg-gold-400/[0.16]'
                )}
              >
                <div className="flex items-center justify-center shrink-0">
                  <Icon className={ICON_CLASS} strokeWidth={ICON_STROKE} />
                </div>
                <span className="font-medium tracking-[0.14em] sm:tracking-[0.18em] text-[10px] sm:text-[11px] md:text-[12px] uppercase text-cream/90 text-center leading-snug">
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
