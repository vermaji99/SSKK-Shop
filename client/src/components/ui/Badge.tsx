import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'featured' | 'bestseller' | 'new';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  featured: '',
  bestseller: '',
  new: '',
};

const Badge: React.FC<BadgeProps> = ({
  variant = 'new',
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-background-tertiary/80 backdrop-blur-sm border border-gold-400/30 text-gold-gradient',
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
