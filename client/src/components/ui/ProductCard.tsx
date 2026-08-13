import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import { cn, formatCurrencyINR } from '@/lib/utils';
import { useWishlistStore } from '@/store/wishlistStore';
import type { Product } from '@/lib/types';
import { Badge } from './Badge';
import { DEFAULT_PRODUCT_IMAGE } from '@/config/assets';

interface ProductCardProps {
  product: Product;
  className?: string;
  onEnquire?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, onEnquire }) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [isHovered, setIsHovered] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const inWishlist = isInWishlist(product._id);
  const firstImage = product.images?.[0];
  const imageUrl =
    typeof firstImage === 'string'
      ? firstImage
      : firstImage?.url || DEFAULT_PRODUCT_IMAGE;
  const categoryName =
    typeof product.category === 'string' ? product.category : product.category?.name || '';

  const displayPrice =
    (product as unknown as { discountPrice?: number }).discountPrice ?? product.price;

  const hasValidPrice = displayPrice != null && displayPrice > 0;

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleWishlist(product);
    } catch {
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'group relative w-full bg-gradient-to-b from-background-tertiary to-purple-900/40 border border-purple-700/30 transition-all duration-500 ease-out',
        'hover:-translate-y-2 hover:border-gold-400/50 hover:shadow-gold-glow-lg',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/product/${product.slug}`}
        className="block w-full h-full"
      >
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/5' }}>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-purple-900/30 animate-pulse" />
          )}
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={cn(
              'w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105',
              !imageLoaded && 'opacity-0'
            )}
          />

          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.isFeatured && <Badge variant="featured">Featured</Badge>}
            {(product as unknown as { isBestseller?: boolean }).isBestseller && (
              <Badge variant="bestseller">Bestseller</Badge>
            )}
            {product.isNewArrival && <Badge variant="new">New</Badge>}
          </div>

          <AnimatePresence>
            {isHovered && (
              <>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  onClick={handleWishlistToggle}
                  className={cn(
                    'absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center backdrop-blur-md rounded-sm border transition-colors duration-200',
                    inWishlist
                      ? 'bg-gold-400/90 border-gold-300 text-purple-900'
                      : 'bg-background-tertiary/80 border-gold-400/40 text-gold-300 hover:bg-gold-400/20 hover:border-gold-400'
                  )}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={cn('w-5 h-5 transition-all', inWishlist ? 'fill-current' : '')}
                  />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
                >
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-background-tertiary/90 backdrop-blur-md border border-gold-400/40 text-gold-300 text-xs uppercase tracking-widest font-semibold hover:bg-gold-400/20 hover:border-gold-400 transition-all duration-200">
                    <Eye className="w-4 h-4" />
                    Quick View
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {!isHovered && (
            <button
              onClick={handleWishlistToggle}
              className={cn(
                'absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center backdrop-blur-md rounded-sm border transition-all duration-300 opacity-0 group-hover:opacity-100',
                inWishlist
                  ? 'bg-gold-400/90 border-gold-300 text-purple-900 opacity-100'
                  : 'bg-background-tertiary/80 border-gold-400/40 text-gold-300 hover:bg-gold-400/20'
              )}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={cn('w-4 h-4', inWishlist ? 'fill-current' : '')}
              />
            </button>
          )}
        </div>

        <div className="relative p-5 md:p-6 flex flex-col gap-2" style={{ minHeight: '30%' }}>
          {categoryName && (
            <p className="text-text-muted uppercase tracking-[0.2em] text-[11px] font-medium">
              {categoryName}
            </p>
          )}

          <h3 className="heading-serif font-bold text-cream text-lg md:text-xl leading-snug line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>

          <div className="mt-2 flex items-baseline gap-2">
            {hasValidPrice ? (
              <>
                <span className="text-gold-400 font-semibold text-lg heading-serif tracking-wide">
                  {formatCurrencyINR(displayPrice)}
                </span>
                {displayPrice !== product.price && product.price > 0 && (
                  <span className="text-text-muted text-sm line-through">
                    {formatCurrencyINR(product.price)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-gold-300 font-medium text-sm uppercase tracking-wider">
                Contact for Price
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export { ProductCard };
export default ProductCard;
