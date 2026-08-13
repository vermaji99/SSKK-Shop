import * as React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

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
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
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
        <span className="inline-block text-gold uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-4">
          {label}
        </span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="heading-serif text-gold-gradient font-bold leading-tight"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.75rem)',
          lineHeight: 1.1,
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={cn(
            'mt-6 text-text-muted text-base md:text-lg leading-relaxed max-w-2xl',
            align === 'center' ? 'mx-auto' : 'mx-0'
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
