import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  SlidersHorizontal,
  X,
  ArrowUpDown,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { cn, formatCurrencyINR } from '@/lib/utils';
import type { Product, Category, ApiResponse } from '@/lib/types';
import { Button, ProductCard } from '@/components/ui';
import SEO from '@/components/common/SEO';
import ErrorState from '@/components/common/ErrorState';

const sortOptions = [
  { value: '-createdAt', label: 'Newest' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-featured', label: 'Featured' },
];

const Collections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const bestsellerParam = searchParams.get('bestseller') === 'true';
  const featuredParam = searchParams.get('featured') === 'true';
  const searchParam = searchParams.get('search') || searchParams.get('keyword') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPurity, setSelectedPurity] = useState<string>('');
  const [showBestseller, setShowBestseller] = useState(bestsellerParam);
  const [showFeatured, setShowFeatured] = useState(featuredParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [sort, setSort] = useState<string>('-createdAt');
  const [page, setPage] = useState<number>(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const limit = 12;

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Category[]>>('/categories');
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const categories = categoriesData?.data || [];

  useEffect(() => {
    if (!categoryParam || categories.length === 0) return;
    const match = categories.find(
      (cat) =>
        cat.slug === categoryParam.toLowerCase() ||
        cat.name.toLowerCase() === categoryParam.toLowerCase() ||
        cat._id === categoryParam
    );
    if (match) {
      setSelectedCategory(match._id);
    }
  }, [categoryParam, categories]);

  useEffect(() => {
    setShowBestseller(bestsellerParam);
    setShowFeatured(featuredParam);
    setSearchQuery(searchParam);
  }, [bestsellerParam, featuredParam, searchParam]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products', selectedCategory, selectedPurity, priceRange, sort, page, showBestseller, showFeatured, searchQuery],
    queryFn: async () => {
      const params: Record<string, unknown> = {
        page,
        limit,
        sort,
      };
      if (selectedCategory) params.category = selectedCategory;
      if (selectedPurity) params.goldPurity = selectedPurity;
      if (priceRange[0] > 0) params.minPrice = priceRange[0];
      if (priceRange[1] < 500000) params.maxPrice = priceRange[1];
      if (showBestseller) params.bestseller = true;
      if (showFeatured) params.featured = true;
      if (searchQuery.trim()) params.search = searchQuery.trim();

      const { data } = await api.get<ApiResponse<Product[]>>('/products', { params });
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });

  const products = data?.data || [];
  const totalPages = data?.pages || 1;
  const total = data?.total || 0;

  const applyFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setPage(1);
    setMobileFiltersOpen(false);
    try {
      refetch();
    } catch {
      toast.error('Failed to load products');
    }
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedPurity('');
    setShowBestseller(false);
    setShowFeatured(false);
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(500000);
    setPriceRange([0, 500000]);
    setSort('-createdAt');
    setPage(1);
    setMobileFiltersOpen(false);
    setSearchParams({});
    try {
      refetch();
    } catch {
      toast.error('Failed to load products');
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const FiltersSidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="heading-serif text-xl font-bold text-cream mb-4 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gold-400" />
          Filters
        </h3>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-300 mb-4">
          Category
        </h4>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={cn(
              'w-full text-left px-3 py-2 text-sm transition-all duration-200 border',
              !selectedCategory
                ? 'bg-gold-400/10 border-gold-400/50 text-gold-300'
                : 'border-transparent text-text-muted hover:text-text hover:bg-purple-700/30'
            )}
          >
            All Categories
          </button>
          {!categoriesLoading &&
            categories.map((cat: Category) => (
              <button
                key={cat._id}
                onClick={() => {
                  setSelectedCategory(cat._id);
                  setSearchParams({ category: cat.slug });
                  setPage(1);
                }}
                className={cn(
                  'w-full text-left px-3 py-2 text-sm transition-all duration-200 border',
                  selectedCategory === cat._id
                    ? 'bg-gold-400/10 border-gold-400/50 text-gold-300'
                    : 'border-transparent text-text-muted hover:text-text hover:bg-purple-700/30'
                )}
              >
                {cat.name}
              </button>
            ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-300 mb-4">
          Price Range (₹)
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min={0}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="Min"
            aria-label="Minimum price"
            className="px-3 py-2 text-sm bg-background-secondary/80 border border-purple-700/50 text-text focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400/40"
          />
          <input
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="Max"
            aria-label="Maximum price"
            className="px-3 py-2 text-sm bg-background-secondary/80 border border-purple-700/50 text-text focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400/40"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-300 mb-4">
          Collection Type
        </h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer text-sm text-text-muted hover:text-text">
            <input
              type="checkbox"
              checked={showFeatured}
              onChange={(e) => {
                setShowFeatured(e.target.checked);
                setPage(1);
              }}
              className="accent-gold-400 w-4 h-4"
            />
            Featured only
          </label>
          <label className="flex items-center gap-3 cursor-pointer text-sm text-text-muted hover:text-text">
            <input
              type="checkbox"
              checked={showBestseller}
              onChange={(e) => {
                setShowBestseller(e.target.checked);
                setPage(1);
              }}
              className="accent-gold-400 w-4 h-4"
            />
            Bestsellers only
          </label>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-300 mb-4">
          Gold Purity
        </h4>
        <div className="flex flex-wrap gap-2">
          {['', '18K', '22K', '24K'].map((purity) => (
            <button
              key={purity || 'all'}
              onClick={() => {
                setSelectedPurity(purity);
                setPage(1);
              }}
              className={cn(
                'px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all border',
                selectedPurity === purity
                  ? 'bg-gold/20 border-gold text-gold shadow-gold-glow'
                  : 'border-purple-700/50 text-text-muted hover:text-text hover:bg-purple-700/30'
              )}
            >
              {purity || 'All'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <Button onClick={applyFilters} size="sm" className="w-full">
          Apply Filters
        </Button>
        <Button variant="secondary" onClick={resetFilters} size="sm" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Jewelry Collections"
        description="Browse 22K gold rings, bridal sets, earrings, bangles, nath, chains, and diamond pendants at Shubham Swarn Kala Kendra, Doharighat, Mau, Uttar Pradesh."
        canonical={`${import.meta.env.VITE_SITE_URL || 'https://shubhamswarnkalakendra.com'}/collections`}
      />
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800/90 to-purple-900" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
          }}
        />
        <div className="relative container section-padding pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="flex items-center gap-2 text-sm text-text-muted mb-6" aria-label="Breadcrumb">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-gold-300 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <span className="text-gold-400">/</span>
              <span className="text-gold-300 font-medium">Collections</span>
            </nav>
            <h1 className="heading-serif font-bold text-gold-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Discover Our Exquisite Collections
            </h1>
            <p className="mt-6 text-text-muted text-base md:text-lg max-w-2xl leading-relaxed">
              Explore our handpicked curation of timeless jewelry pieces, each crafted
              with unmatched artistry and the finest materials.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="hidden lg:block lg:w-[280px] shrink-0">
            <div className="sticky top-32 glass p-6">
              <FiltersSidebar />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-purple-700/30">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline-gold"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
                <p className="text-text-muted text-sm">
                  Showing <span className="text-gold-300 font-medium">{products.length}</span>{' '}
                  of <span className="text-gold-300 font-medium">{total}</span> items
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ArrowUpDown className="w-4 h-4 text-text-muted hidden sm:block" />
                <label className="text-sm text-text-muted hidden sm:block">Sort by:</label>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="px-4 py-2 bg-background-secondary/80 border border-purple-700/50 text-text text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40 min-w-[180px]"
                  aria-label="Sort products"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-purple-900/30 border border-purple-700/30"
                    style={{ aspectRatio: '4/5' }}
                  />
                ))}
              </div>
            ) : isError ? (
              <ErrorState type="api-error" onRetry={() => refetch()} />
            ) : products.length === 0 ? (
              <ErrorState
                type={searchQuery ? 'no-search-results' : 'empty-collection'}
                message={
                  searchQuery
                    ? `No jewelry found for "${searchQuery}". Try different keywords or browse all collections.`
                    : undefined
                }
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  <AnimatePresence>
                    {products.map((product, idx) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {totalPages > 1 && (
                  <div className="mt-16 flex items-center justify-center gap-2 flex-wrap">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="px-3"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    {(renderPagination() || []).map((p, idx) =>
                      typeof p === 'number' ? (
                        <button
                          key={idx}
                          onClick={() => handlePageChange(p)}
                          className={cn(
                            'w-11 h-11 flex items-center justify-center text-sm font-medium transition-all duration-200 border',
                            p === page
                              ? 'gold-gradient text-purple-900 border-transparent font-semibold shadow-gold-glow'
                              : 'border-purple-700/50 text-text-muted hover:border-gold-400/50 hover:text-gold-300 bg-background-secondary/50'
                          )}
                          aria-label={`Go to page ${p}`}
                          aria-current={p === page ? 'page' : undefined}
                        >
                          {p}
                        </button>
                      ) : (
                        <span
                          key={idx}
                          className="w-11 h-11 flex items-center justify-center text-text-muted"
                        >
                          {p}
                        </span>
                      )
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className="px-3"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-background-tertiary border-r border-gold-400/20 overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="heading-serif text-xl font-bold text-cream">Filters</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-gold-300 transition-colors"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FiltersSidebar />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collections;
