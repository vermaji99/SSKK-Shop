import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  name: string;
  slug: string;
  imageUrl: string;
  featured?: boolean;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  slug,
  imageUrl,
  featured = false,
  className,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn('group relative w-full h-full', className)}
    >
      <Link
        to={`/collections/${slug.toLowerCase()}`}
        className={cn(
          'relative block w-full overflow-hidden bg-background-tertiary border border-transparent transition-all duration-500 ease-out group-hover:border-gold-400/60 group-hover:shadow-gold-glow',
          featured ? 'aspect-[3/4]' : 'aspect-[4/5]'
        )}
        aria-label={`Explore ${name} collection`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-500',
            'bg-gradient-to-t from-background via-background/60 to-transparent',
            'group-hover:from-background group-hover:via-background/70'
          )}
          style={{
            opacity: 0.85,
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <motion.div
            className="flex flex-col items-start"
            initial={false}
            animate={{ y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <h3 className="heading-serif text-2xl md:text-3xl lg:text-4xl font-bold text-cream mb-3 relative inline-block">
              {name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] gold-gradient transition-all duration-500 ease-out group-hover:w-full" />
            </h3>
            <span className="text-gold-300 uppercase tracking-[0.25em] text-xs font-medium flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
              Explore Collection
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </motion.div>
        </div>

        {featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-purple-900 gold-gradient">
              Featured
            </span>
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export { CategoryCard };
export default CategoryCard;
