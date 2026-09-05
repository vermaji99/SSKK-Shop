import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'featured' | 'bestseller' | 'new';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  featured:
    'gold-gradient text-purple-900 border border-gold-300/60 shadow-gold-glow',
  bestseller:
    'bg-purple-900/90 text-gold-300 border border-gold-400/50 backdrop-blur-sm',
  new:
    'bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 backdrop-blur-sm',
};

const Badge: React.FC<BadgeProps> = ({
  variant = 'new',
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-[10.5px] font-semibold uppercase tracking-[0.14em]',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export { Badge };
export default Badge;
