import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type RevealVariant = 'fade-up' | 'fade' | 'scale-in' | 'fade-left' | 'fade-right';

interface PremiumRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  yOffset?: number;
  viewportMargin?: string;
  triggerOnce?: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export function PremiumReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.9,
  yOffset = 28,
  viewportMargin = '-10%',
  triggerOnce = true,
  className,
  ...rest
}: PremiumRevealProps) {
  const variants: Record<RevealVariant, HTMLMotionProps<'div'>['variants']> = {
    'fade-up': {
      hidden: { opacity: 0, y: yOffset },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
      },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: duration * 0.8, delay, ease: [0.22, 1, 0.36, 1] },
      },
    },
    'scale-in': {
      hidden: { opacity: 0, scale: 0.985 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
      },
    },
    'fade-left': {
      hidden: { opacity: 0, x: yOffset * 0.9 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
      },
    },
    'fade-right': {
      hidden: { opacity: 0, x: -yOffset * 0.9 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: viewportMargin }}
      variants={variants[variant]}
      className={cn(className)}
      {...(rest as unknown as HTMLMotionProps<'div'>)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  variant?: 'fade-up' | 'fade';
  triggerOnce?: boolean;
  yOffset?: number;
  viewportMargin?: string;
  itemClassName?: string;
}

export function StaggerReveal({
  children,
  className,
  staggerChildren = 0.1,
  delayChildren = 0,
  variant = 'fade-up',
  triggerOnce = true,
  yOffset = 24,
  viewportMargin = '-10%',
  itemClassName,
}: StaggerRevealProps) {
  const childArray = React.Children.toArray(children);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      ...(variant === 'fade-up' ? { y: yOffset } : {}),
    },
    visible: {
      opacity: 1,
      ...(variant === 'fade-up' ? { y: 0 } : {}),
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: viewportMargin }}
      className={className}
    >
      {childArray.map((child, i) => (
        <motion.div key={i} variants={item} className={itemClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default PremiumReveal;
