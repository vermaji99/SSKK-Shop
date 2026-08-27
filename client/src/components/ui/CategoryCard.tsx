import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlurImage } from './BlurImage';

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
    threshold: 0.12,
    triggerOnce: true,
    rootMargin: '-30px 0px',
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.76,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('group relative w-full h-full', className)}
    >
      <Link
        to={`/collections/${slug.toLowerCase()}`}
        className={cn(
          'relative block w-full h-full overflow-hidden bg-background-tertiary border border-transparent transition-all duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-gold-400/50 group-hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85),0_0_40px_-10px_rgba(212,175,55,0.18)]',
          featured ? 'aspect-[3/4] sm:aspect-[4/5]' : 'aspect-[4/5] sm:aspect-[1/1.1]'
        )}
        aria-label={`Explore ${name} collection`}
      >
        <div className="absolute inset-0">
          <BlurImage
            src={imageUrl}
            alt={name}
            priority="auto"
            zoomHover
            wrapperClassName="h-full"
          />
        </div>

        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-600 ease-out',
            'bg-gradient-to-t from-background via-background/65 to-transparent',
            'group-hover:from-background group-hover:via-background/72'
          )}
          style={{ opacity: 0.88 }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-out"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-7 lg:p-8">
          <motion.div
            className="flex flex-col items-start"
            initial={false}
            animate={{ y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="heading-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-cream mb-2.5 sm:mb-3 relative inline-block tracking-tight">
              {name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] gold-gradient transition-all duration-550 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:w-full" />
            </h3>
            <span
              className="text-gold-300 uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[10px] sm:text-xs font-medium flex items-center gap-2 opacity-82 group-hover:opacity-100 transition-opacity duration-300"
            >
              Explore Collection
              <ArrowRight
                className="w-3 h-3 transition-transform duration-400 ease-out group-hover:translate-x-1"
                strokeWidth={2}
              />
            </span>
          </motion.div>
        </div>

        {featured && (
          <div className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4">
            <span className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.22em] font-bold text-purple-900 gold-gradient shadow-[0_4px_16px_-4px_rgba(212,175,55,0.45)]">
              Featured
            </span>
          </div>
        )}
      </Link>
    </motion.article>
  );
};

export { CategoryCard };
export default CategoryCard;
