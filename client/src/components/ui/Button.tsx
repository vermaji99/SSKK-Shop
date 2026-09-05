import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline-gold';
type ButtonSize = 'sm' | 'md' | 'lg';

type AsChildProps = {
  asChild: true;
  children: React.ReactElement;
} & Omit<React.HTMLAttributes<HTMLElement>, 'children'>;

type DefaultProps = {
  asChild?: false;
  children?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export type ButtonProps = (AsChildProps | DefaultProps) & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'gold-gradient text-purple-900 font-semibold uppercase tracking-wider relative overflow-hidden hover:shadow-gold-glow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.986] transition-all duration-300 ease-out will-change-transform',
  secondary:
    'bg-transparent border border-gold/50 text-gold font-semibold uppercase tracking-wider hover:bg-gold hover:text-purple-900 hover:border-gold/92 hover:-translate-y-0.5 hover:shadow-gold-glow active:translate-y-0 active:scale-[0.986] transition-all duration-300 ease-out will-change-transform',
  ghost:
    'bg-transparent text-gold font-medium hover:bg-purple-700/40 transition-colors duration-300',
  'outline-gold':
    'bg-transparent border-2 border-gold-400/60 text-gold-300 hover:bg-gold-400/10 hover:border-gold-300 hover:shadow-gold-glow transition-all duration-300',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 md:px-5 py-2 text-[11px] md:text-xs tracking-[0.14em]',
  md: 'px-6 md:px-8 py-3 text-xs md:text-sm tracking-[0.14em] uppercase',
  lg: 'px-8 md:px-10 py-3.5 md:py-4 text-sm md:text-base tracking-[0.14em] uppercase',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      ...rest
    } = props;

    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2 rounded-none transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    const loadingContent = loading ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : null;

    if (props.asChild) {
      const { asChild: _asChild, children, ...childProps } = rest as AsChildProps;
      const child = React.Children.only(children);

      const mergedClassName = cn(
        baseClasses,
        child.props.className,
        loading && 'pointer-events-none'
      );

      const childChildren = (
        <>
          {loadingContent}
          {child.props.children}
        </>
      );

      return React.cloneElement(child, {
        ...childProps,
        ...child.props,
        className: mergedClassName,
        children: childChildren,
        'data-loading': loading || undefined,
      } as React.HTMLAttributes<HTMLElement>);
    }

    const {
      asChild: _asChild,
      disabled,
      children,
      onAnimationStart,
      onDrag,
      onDragEnd,
      onDragStart,
      ...buttonProps
    } = rest as DefaultProps;

    const MotionButton = motion.button;

    return (
      <MotionButton
        className={baseClasses}
        ref={ref}
        disabled={disabled || loading}
        whileHover={!disabled && !loading ? { y: -2 } : undefined}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        {...(buttonProps as unknown as HTMLMotionProps<'button'>)}
      >
        {loadingContent}
        {children}
      </MotionButton>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export default Button;
