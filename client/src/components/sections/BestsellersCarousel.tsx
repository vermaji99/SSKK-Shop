import * as React from 'react';
import { useQueries } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SectionTitle, ProductCard } from '@/components/ui';
import api from '@/lib/api';
import type { Product, ApiResponse } from '@/lib/types';
import { cn } from '@/lib/utils';

const BestsellersCarousel: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const [bestsellersQuery, popularQuery] = useQueries({
    queries: [
      {
        queryKey: ['products', 'bestsellers'],
        queryFn: async () => {
          const res = await api.get<ApiResponse<Product[]>>('/products', {
            params: { bestseller: true, limit: 8 },
          });
          return res.data;
        },
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['products', 'popular-fallback'],
        queryFn: async () => {
          const res = await api.get<ApiResponse<Product[]>>('/products', {
            params: { limit: 8, sort: '-featured' },
          });
          return res.data;
        },
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  const bestsellerProducts = bestsellersQuery.data?.data ?? [];
  const hasRealBestsellers = bestsellerProducts.length > 0;
  const popularProducts = popularQuery.data?.data ?? [];

  const seen = new Set<string>();
  const merged: Product[] = [];
  for (const p of [...bestsellerProducts, ...popularProducts]) {
    if (seen.has(p._id)) continue;
    seen.add(p._id);
    merged.push(p);
    if (merged.length >= 8) break;
  }
  const products = merged;
  const isLoading = bestsellersQuery.isLoading || popularQuery.isLoading;

  const updateScrollButtons = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons, products.length]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-carousel-card]')?.clientWidth ?? 300;
    el.scrollBy({ left: dir === 'left' ? -cardWidth - 24 : cardWidth + 24, behavior: 'smooth' });
  };

  return (
    <section className="section-padding relative overflow-hidden bg-background-secondary/30">
      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionTitle
            label={hasRealBestsellers ? 'Most Loved' : 'Our Favorites'}
            title={hasRealBestsellers ? 'Bestselling Creations' : 'Popular Creations'}
            subtitle={
              hasRealBestsellers
                ? 'Cherished selections — our most sought-after gold and diamond pieces from Doharighat.'
                : 'A handpicked selection of signature gold and diamond jewellery from our Doharighat showroom.'
            }
            align="left"
            className="mb-0"
          />
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={cn(
                'w-11 h-11 flex items-center justify-center border border-gold-400/30 text-gold-300 transition-all',
                canScrollLeft ? 'hover:border-gold-400 hover:bg-gold-400/10' : 'opacity-30 cursor-not-allowed'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={cn(
                'w-11 h-11 flex items-center justify-center border border-gold-400/30 text-gold-300 transition-all',
                canScrollRight ? 'hover:border-gold-400 hover:bg-gold-400/10' : 'opacity-30 cursor-not-allowed'
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link
              to={hasRealBestsellers ? '/collections?bestseller=true' : '/collections'}
              className="hidden sm:inline-flex items-center gap-2 text-gold-400 uppercase tracking-[0.2em] text-xs font-semibold ml-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[78vw] sm:w-[45vw] md:w-[32vw] lg:w-[24vw] xl:w-[22vw] aspect-[4/5] bg-purple-900/30 animate-pulse border border-purple-700/30"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, idx) => (
              <motion.div
                key={product._id}
                data-carousel-card
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex-shrink-0 w-[78vw] sm:w-[45vw] md:w-[32vw] lg:w-[24vw] xl:w-[22vw] snap-start"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-text-muted py-16 font-serif">
            Explore our complete jewellery collection to discover signature pieces from Doharighat.
          </p>
        )}
      </div>
    </section>
  );
};

export { BestsellersCarousel };
export default BestsellersCarousel;
