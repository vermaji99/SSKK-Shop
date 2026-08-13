import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Heart, ChevronLeft, ChevronRight, ShoppingCart, MessageCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { cn, formatCurrencyINR } from '@/lib/utils';
import type { Product, Category, ApiResponse } from '@/lib/types';
import { Button, ProductCard, GoldDivider, Badge } from '@/components/ui';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import InquiryModal from '@/components/common/InquiryModal';
import SEO from '@/components/common/SEO';
import ErrorState from '@/components/common/ErrorState';
import { BUSINESS } from '@/config/business';
import { absoluteUrl } from '@/config/seo';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [togglingWishlist, setTogglingWishlist] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);

  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Product>>(`/products/slug/${slug}`);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });

  const product = productData?.data;
  const categoryId =
    product && typeof product.category === 'object' && product.category !== null
      ? (product.category as Category)._id
      : typeof product?.category === 'string'
      ? (product.category as string)
      : '';

  const categoryName =
    product && typeof product.category === 'object' && product.category !== null
      ? (product.category as Category).name
      : '';

  const { data: relatedData } = useQuery({
    queryKey: ['related-products', categoryId, product?._id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Product[]>>('/products', {
        params: {
          category: categoryId,
          limit: 8,
          sort: '-featured',
        },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!categoryId && !!product?._id,
  });

  const relatedProducts =
    relatedData?.data?.filter((p) => p._id !== product?._id).slice(0, 4) || [];

  const images = product?.images || [];
  const displayPrice = product?.discountPrice ?? product?.price;
  const hasValidPrice = displayPrice != null && displayPrice > 0;
  const hasDiscount =
    product?.discountPrice != null &&
    product?.discountPrice > 0 &&
    product?.price != null &&
    product.discountPrice < product.price;

  const inWishlist = product ? isInWishlist(product._id) : false;

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      setAddingToCart(true);
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
      setTimeout(() => openCart(), 300);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!product) return;
    try {
      setTogglingWishlist(true);
      await toggleWishlist(product);
      toast.success(
        inWishlist
          ? 'Removed from wishlist'
          : 'Added to wishlist'
      );
    } catch (error) {
      toast.error('Failed to update wishlist');
    } finally {
      setTogglingWishlist(false);
    }
  };

  const productDetails: { label: string; value?: string | number | string[] }[] = [];
  if (product) {
    if (product.goldPurity) productDetails.push({ label: 'Gold Purity', value: product.goldPurity });
    if (product.weight) productDetails.push({ label: 'Weight', value: `${product.weight} g` });
    if (product.material) productDetails.push({ label: 'Material', value: product.material });
    if (product.gemstones && product.gemstones.length > 0) {
      productDetails.push({ label: 'Gemstones', value: product.gemstones });
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container section-padding pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-4">
              <div className="w-full aspect-square bg-purple-900/30 animate-pulse border border-purple-700/30" />
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-purple-900/30 animate-pulse border border-purple-700/30" />
                ))}
              </div>
            </div>
            <div className="space-y-6 pt-4">
              <div className="h-5 w-32 bg-purple-900/30 animate-pulse" />
              <div className="h-12 w-3/4 bg-purple-900/30 animate-pulse" />
              <div className="h-8 w-1/3 bg-purple-900/30 animate-pulse" />
              <div className="space-y-3 pt-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-4 bg-purple-900/30 animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <>
        <SEO title="Product Not Found" description="The requested jewelry piece could not be found." noIndex />
        <div className="min-h-screen bg-background pt-28">
          <ErrorState type="product-not-found" />
        </div>
      </>
    );
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.map((img) => absoluteUrl(img.url)),
    sku: product.slug,
    brand: { '@type': 'Brand', name: BUSINESS.name },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/product/${product.slug}`),
      priceCurrency: 'INR',
      price: product.discountPrice || product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'JewelryStore', name: BUSINESS.name },
    },
  };

  return (
    <>
      <SEO
        title={product.name}
        description={product.description?.slice(0, 160)}
        ogImage={product.images?.[0]?.url}
        ogType="product"
        canonical={absoluteUrl(`/product/${product.slug}`)}
        schema={productSchema}
      />
    <div className="min-h-screen bg-background">
      <section className="container section-padding pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-5"
          >
            <div className="relative bg-gradient-to-br from-background-tertiary to-purple-900/40 border border-purple-700/40 p-4 md:p-6 overflow-hidden">
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                {product.isFeatured && <Badge variant="featured">Featured</Badge>}
                {(product as unknown as { isBestseller?: boolean }).isBestseller && (
                  <Badge variant="bestseller">Bestseller</Badge>
                )}
                {product.isNewArrival && <Badge variant="new">New</Badge>}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full flex items-center justify-center"
                  style={{ aspectRatio: '4/5' }}
                >
                  {images.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setZoomOpen(true)}
                      className="w-full h-full cursor-zoom-in focus-visible:outline-gold-400"
                      aria-label={`Zoom ${product.name} image`}
                    >
                      <img
                        src={images[selectedImageIndex]?.url}
                        alt={`${product.name} - View ${selectedImageIndex + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-purple-900/30">
                      <ShoppingCart className="w-20 h-20 text-text-muted opacity-40" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background-tertiary/80 backdrop-blur-sm border border-gold-400/30 text-gold-300 hover:bg-gold-400/20 hover:border-gold-400 transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background-tertiary/80 backdrop-blur-sm border border-gold-400/30 text-gold-300 hover:bg-gold-400/20 hover:border-gold-400 transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={cn(
                      'relative aspect-square border overflow-hidden transition-all duration-300',
                      selectedImageIndex === idx
                        ? 'border-gold-400 ring-2 ring-gold-400/40 shadow-gold-glow scale-[1.02]'
                        : 'border-purple-700/40 hover:border-gold-400/50 opacity-70 hover:opacity-100'
                    )}
                    aria-label={`Select image ${idx + 1}`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col"
          >
            {categoryName && (
              <p className="text-gold-300/80 uppercase tracking-[0.25em] text-xs font-medium mb-4">
                {categoryName}
              </p>
            )}

            <h1 className="heading-serif font-bold text-cream leading-tight" style={{ fontSize: 'clamp(1.875rem, 4vw, 3.25rem)' }}>
              {product.name}
            </h1>

            <div className="mt-6 flex items-baseline gap-4 flex-wrap">
              {hasValidPrice ? (
                <>
                  <span
                    className="heading-serif font-bold text-gold-400 tracking-wide"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
                  >
                    {formatCurrencyINR(displayPrice!)}
                  </span>
                  {hasDiscount && product?.price != null && (
                    <span className="text-text-muted text-lg line-through opacity-70">
                      {formatCurrencyINR(product.price)}
                    </span>
                  )}
                </>
              ) : (
                <span className="heading-serif font-semibold text-gold-300 uppercase tracking-widest text-lg">
                  Contact for Price
                </span>
              )}
            </div>

            <GoldDivider className="my-8" width={120} thickness={2} />

            {product.description && (
              <p className="text-text-muted leading-relaxed text-base md:text-lg whitespace-pre-line">
                {product.description}
              </p>
            )}

            {productDetails.length > 0 && (
              <div className="mt-10 p-6 glass">
                <h3 className="heading-serif text-xl font-bold text-cream mb-6">
                  Product Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {productDetails.map((detail, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 mt-2 rounded-full gold-gradient shrink-0" />
                      <div>
                        <span className="text-gold-300/70 text-xs uppercase tracking-wider block mb-1">
                          {detail.label}
                        </span>
                        <span className="text-cream text-sm font-medium">
                          {Array.isArray(detail.value)
                            ? detail.value.join(', ')
                            : detail.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4">
              <Button
                onClick={() => setInquiryOpen(true)}
                size="lg"
                className="flex-1 bg-gradient-to-r from-gold-500 via-gold-400 to-amber-600 text-purple-950 hover:brightness-110 font-bold"
              >
                <MessageCircle className="w-5 h-5" />
                Enquire Now
              </Button>
              <a
                href={`tel:+91${BUSINESS.phonePrimary}`}
                className="flex-1 btn-secondary flex items-center justify-center gap-2 py-3 px-6 text-sm"
              >
                Call to Purchase
              </a>
              <Button
                variant="ghost"
                onClick={handleToggleWishlist}
                loading={togglingWishlist}
                size="lg"
                className={cn(
                  'sm:w-auto px-6 border',
                  inWishlist
                    ? 'bg-gold-400/10 border-gold-400/50 text-gold-300'
                    : 'border-purple-700/50 hover:border-gold-400/50'
                )}
              >
                {togglingWishlist ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Heart className={cn('w-5 h-5', inWishlist ? 'fill-current' : '')} />
                )}
                Wishlist
              </Button>
            </div>

            <InquiryModal
              isOpen={inquiryOpen}
              onClose={() => setInquiryOpen(false)}
              product={product}
            />
          </motion.div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="container section-padding pt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-14">
              <span className="inline-block text-gold uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-4">
                YOU MAY ALSO LIKE
              </span>
              <h2 className="heading-serif font-bold text-gold-gradient" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}>
                Explore Similar Pieces
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((prod, idx) => (
                <motion.div
                  key={prod._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ProductCard product={prod} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>

    <AnimatePresence>
      {zoomOpen && images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image zoom view"
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute top-6 right-6 text-gold-400 hover:text-gold-300 text-sm uppercase tracking-wider"
            aria-label="Close zoom"
          >
            Close
          </button>
          <img
            src={images[selectedImageIndex]?.url}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default ProductDetail;
