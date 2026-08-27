import * as React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type SectionTitleAlign = 'left' | 'center';

interface SectionTitleProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: SectionTitleAlign;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  label,
  title,
  subtitle,
  align = 'center',
  className,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.18,
    triggerOnce: true,
    rootMargin: '-40px 0px',
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.16,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.78,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={cn(
        'w-full max-w-4xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      <motion.div variants={itemVariants}>
        <span
          className="inline-block eyebrow text-gold-400 mb-3 sm:mb-4"
          style={{ fontSize: 'clamp(0.6rem, 0.92vw, 0.72rem)', letterSpacing: '0.34em' }}
        >
          {label}
        </span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="heading-serif text-gold-gradient font-medium leading-[1.08]"
        style={{
          fontSize: 'clamp(1.9rem, 4.6vw, 3.6rem)',
          letterSpacing: '-0.012em',
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={cn(
            'mt-5 sm:mt-6 text-text-muted/92 leading-[1.62] font-light max-w-2xl',
            align === 'center' ? 'mx-auto' : 'mx-0',
            'text-[13.5px] sm:text-sm md:text-[15.5px]'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export { SectionTitle };
export default SectionTitle;
