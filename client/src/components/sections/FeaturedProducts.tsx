import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SectionTitle, ProductCard, Button } from '@/components/ui';
import api from '@/lib/api';
import type { Product, ApiResponse } from '@/lib/types';

const ProductSkeleton: React.FC = () => (
  <div className="w-full bg-gradient-to-b from-background-tertiary to-purple-900/40 border border-purple-700/30 overflow-hidden">
    <div className="w-full aspect-[4/5] bg-purple-900/30 animate-pulse" />
    <div className="p-5 md:p-6 space-y-3">
      <div className="h-3 w-20 bg-purple-800/50 animate-pulse rounded-sm" />
      <div className="h-5 w-full bg-purple-800/40 animate-pulse rounded-sm" />
      <div className="h-5 w-3/4 bg-purple-800/40 animate-pulse rounded-sm" />
      <div className="h-6 w-28 bg-purple-800/40 animate-pulse rounded-sm mt-4" />
    </div>
  </div>
);

const FeaturedProducts: React.FC = () => {
  const {
    data: featuredResponse,
    isLoading: featuredLoading,
  } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Product[]>>('/products', {
        params: { featured: true, limit: 8 },
      });
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const featuredProducts = featuredResponse?.data ?? [];

  const {
    data: allProductsResponse,
    isLoading: allLoading,
  } = useQuery({
    queryKey: ['products', 'all-homepage'],
    queryFn: async () => {
      if (featuredProducts.length >= 4) return { data: [] as Product[], success: true };
      const res = await api.get<ApiResponse<Product[]>>('/products', {
        params: { limit: 8, sort: '-featured' },
      });
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: featuredProducts.length < 4,
  });

  const allProducts = allProductsResponse?.data ?? [];

  const displayProducts = React.useMemo(() => {
    const seen = new Set<string>();
    const result: Product[] = [];
    for (const p of featuredProducts) {
      if (!seen.has(p._id)) {
        seen.add(p._id);
        result.push(p);
      }
    }
    for (const p of allProducts) {
      if (!seen.has(p._id) && result.length < 8) {
        seen.add(p._id);
        result.push(p);
      }
    }
    return result.slice(0, 8);
  }, [featuredProducts, allProducts]);

  const isLoading = featuredLoading || (allLoading && featuredProducts.length < 4);
  const hasProducts = displayProducts.length > 0;

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="absolute bottom-1/4 left-0 w-[35vw] h-[35vw] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />

      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 sm:gap-6 mb-10 sm:mb-12 md:mb-14">
          <SectionTitle
            label="Featured"
            title="Featured Jewellery"
            subtitle="Handpicked pieces that define luxury — our most cherished designs crafted with exceptional artistry and attention to detail by master artisans."
            align="left"
            className="mb-0"
          />
          <Link
            to="/collections"
            className="group inline-flex items-center gap-2 text-gold-400 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold shrink-0 self-start md:self-end"
            aria-label="View all jewellery collections"
          >
            View All Jewellery
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : hasProducts ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {displayProducts.map((product: Product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.04,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-6 text-center border border-purple-700/40 bg-background-tertiary/50"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-6 flex items-center justify-center border border-gold-400/40 rounded-full">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-gold-400" strokeWidth={1.5} />
              </div>
              <h3 className="heading-serif text-xl sm:text-2xl md:text-3xl font-bold text-cream mb-3">
                Explore Our Jewellery Collection
              </h3>
              <p className="text-text-muted text-sm sm:text-base max-w-lg mb-7 sm:mb-8">
                Browse our complete catalogue of beautifully crafted gold and diamond pieces. Each design is hand-finished by our master artisans in Doharighat.
              </p>
              <Button asChild variant="primary">
                <Link to="/collections">
                  Browse All Jewellery
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export { FeaturedProducts };
export default FeaturedProducts;
