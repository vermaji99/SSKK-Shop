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

const EmptyState: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="col-span-full flex flex-col items-center justify-center py-20 px-6 text-center border border-purple-700/40 bg-background-tertiary/50"
  >
    <div className="w-16 h-16 mb-6 flex items-center justify-center border border-gold-400/40 rounded-full">
      <Sparkles className="w-7 h-7 text-gold-400" strokeWidth={1.5} />
    </div>
    <h3 className="heading-serif text-2xl md:text-3xl font-bold text-cream mb-3">
      Featured Collection Coming Soon
    </h3>
    <p className="text-text-muted text-base max-w-lg mb-8">
      Our artisans are crafting exquisite pieces to be featured here. Explore our full collection in the meantime.
    </p>
    <Button asChild variant="primary">
      <Link to="/collections">
        Browse All Collections
        <ArrowRight className="w-4 h-4" />
      </Link>
    </Button>
  </motion.div>
);

const FeaturedProducts: React.FC = () => {
  const {
    data: response,
    isLoading,
    isError,
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

  const products =
    response?.data ??
    (isError || !response?.success ? [] : []);

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="absolute bottom-1/4 left-0 w-[35vw] h-[35vw] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />

      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
          <SectionTitle
            label="Featured"
            title="Featured Creations"
            subtitle="Handpicked pieces that define luxury — our most cherished designs crafted with exceptional artistry."
            align="left"
            className="mb-0"
          />
          <Link
            to="/collections"
            className="group inline-flex items-center gap-2 text-gold-400 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold shrink-0 self-start md:self-end"
          >
            View All
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((product: Product) => (
              <ProductCard
                key={product._id}
                product={product}
                className=""
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1">
            <EmptyState />
          </div>
        )}
      </div>
    </section>
  );
};

export { FeaturedProducts };
export default FeaturedProducts;
