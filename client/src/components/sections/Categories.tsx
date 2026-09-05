import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui';
import { BlurImage } from '@/components/ui/BlurImage';
import { cn } from '@/lib/utils';
import { VISUAL_COLLECTIONS, CATEGORY_IMAGE_BY_SLUG, JEWELRY_IMAGES } from '@/config/assets';
import { useUIStore } from '@/store/uiStore';

type GridSpec = {
  slug: string;
  span: {
    base: string;
    sm?: string;
    md: string;
    lg: string;
  };
  aspect: {
    base: string;
    md?: string;
    lg?: string;
  };
  featured?: boolean;
};

const CATEGORY_ITEMS = [
  {
    slug: 'rings',
    name: 'Rings',
    description: 'Timeless silhouettes crafted in 22K gold and certified diamonds.',
    image: JEWELRY_IMAGES.ring,
  },
  {
    slug: 'earrings',
    name: 'Earrings',
    description: 'From heritage jhumkas to delicate solitaire diamond studs.',
    image: JEWELRY_IMAGES.jhumka,
  },
  {
    slug: 'necklaces',
    name: 'Necklaces',
    description: 'Royal chokers, harams and contemporary gold neckwear.',
    image: JEWELRY_IMAGES.necklace,
  },
  {
    slug: 'bangles',
    name: 'Bangles',
    description: 'Intricately engraved 22K gold kadas and handcrafted bangles.',
    image: JEWELRY_IMAGES.bangle,
  },
  {
    slug: 'chains',
    name: 'Chains',
    description: 'Solid gold rope, link and curb chains with satin sheen.',
    image: JEWELRY_IMAGES.chain,
  },
  {
    slug: 'bridal',
    name: 'Bridal Jewellery',
    description: 'Grand bridal sets created for your most unforgettable day.',
    image: JEWELRY_IMAGES.bridalSet,
  },
  {
    slug: 'diamonds',
    name: 'Diamond Jewellery',
    description: 'Brilliant VVS diamonds set in hallmarked 18K gold.',
    image: JEWELRY_IMAGES.pendant,
  },
  {
    slug: 'custom',
    name: 'Custom Jewellery',
    description: 'Bespoke designs brought to life by master goldsmiths.',
    image: JEWELRY_IMAGES.showcase,
  },
];

const CategoryTile: React.FC<{
  item: (typeof CATEGORY_ITEMS)[number];
  index: number;
}> = ({ item, index }) => {
  const reducedMotionStore = useUIStore((s) => s.reducedMotion);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionStore || prefersReducedMotion;
  const { ref, inView } = useInView({
    threshold: 0.12,
    triggerOnce: true,
    rootMargin: '-20px 0px',
  });

  const to = item.slug === 'custom' ? '/contact#custom' : `/collections/${item.slug}`;

  return (
    <motion.article
      ref={ref}
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={inView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={
        reducedMotion
          ? { duration: 0.05 }
          : {
              delay: Math.min(index * 0.06, 0.42),
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      className="group relative w-full"
    >
      <Link
        to={to}
        className={cn(
          'relative block w-full overflow-hidden bg-[#0A0414] border border-gold-400/[0.14]',
          'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'hover:border-gold-400/[0.48] hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.92),0_0_32px_-12px_rgba(212,175,55,0.18)]'
        )}
        aria-label={`Explore ${item.name} collection`}
      >
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <BlurImage
            src={item.image}
            alt={item.name}
            priority="auto"
            zoomHover
            wrapperClassName="h-full w-full"
          />

          <div
            className="absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(5,2,10,0.0) 0%, rgba(5,2,10,0.35) 45%, rgba(5,2,10,0.94) 100%)',
            }}
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
            style={{
              background:
                'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 lg:p-7 pointer-events-none">
          <div className="pointer-events-auto">
            <h3
              className="heading-serif font-medium text-cream leading-[1.08] mb-2 relative inline-block text-xl sm:text-2xl md:text-2xl"
            >
              {item.name.toUpperCase()}
              <span
                className="absolute -bottom-1 left-0 h-[1.5px] gold-gradient transition-[width] duration-[500ms] ease-out group-hover:w-full"
                style={{ width: '0px' }}
              />
            </h3>

            <p className="text-cream/75 text-xs sm:text-sm leading-relaxed mb-3.5 font-sans line-clamp-2">
              {item.description}
            </p>

            <span
              className="inline-flex items-center gap-2 text-gold-400 uppercase font-semibold text-[11px] tracking-[0.2em] group-hover:text-gold-300 transition-colors"
            >
              Explore Collection
              <ArrowRight
                size={14}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const Categories: React.FC = () => {
  return (
    <section
      id="categories"
      className="section-padding relative overflow-hidden bg-background-secondary/50"
      aria-label="Explore SSKK Jewellery Collections"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-full opacity-[0.06] blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />

      <div className="container relative">
        <SectionTitle
          label="Our Collections"
          title="Explore Jewellery Collections"
          subtitle="Handcrafted gold and diamond jewellery created for celebrations, traditions and forever moments."
          align="center"
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 md:gap-7">
          {CATEGORY_ITEMS.map((item, i) => (
            <CategoryTile key={item.slug} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Categories };
export default Categories;
