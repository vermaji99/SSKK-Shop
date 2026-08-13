import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SectionTitle, CategoryCard } from '@/components/ui';
import api from '@/lib/api';
import type { ApiResponse, Category } from '@/lib/types';

import { DEFAULT_PRODUCT_IMAGE, CATEGORY_IMAGE_BY_SLUG } from '@/config/assets';

const FALLBACK_IMAGE = DEFAULT_PRODUCT_IMAGE;

const Categories: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Category[]>>('/categories');
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const categories = data?.data ?? [];

  return (
    <section className="section-padding relative overflow-hidden bg-background-secondary/40">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4B1F6F 0%, transparent 70%)' }}
      />

      <div className="container relative">
        <SectionTitle
          label="Categories"
          title="Explore Our Collections"
          subtitle="From timeless classics to contemporary masterpieces, discover jewelry curated for every occasion and celebration."
          className="mb-14 md:mb-16"
        />

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-purple-900/30 animate-pulse border border-purple-700/30"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                name={category.name}
                slug={category.slug}
                imageUrl={
                  category.image?.url ||
                  CATEGORY_IMAGE_BY_SLUG[category.slug] ||
                  FALLBACK_IMAGE
                }
                featured={category.featured}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export { Categories };
export default Categories;
