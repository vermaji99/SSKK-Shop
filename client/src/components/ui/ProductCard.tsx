import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import { cn, formatCurrencyINR } from '@/lib/utils';
import { useWishlistStore } from '@/store/wishlistStore';
import type { Product } from '@/lib/types';
import { Badge } from './Badge';
import { BlurImage } from './BlurImage';
import { DEFAULT_PRODUCT_IMAGE } from '@/config/assets';

interface ProductCardProps {
  product: Product;
  className?: string;
  onEnquire?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, onEnquire }) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [isHovered, setIsHovered] = React.useState(false);

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
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative w-full flex flex-col bg-gradient-to-b from-background-tertiary/80 to-purple-900/30 border border-purple-700/30 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:-translate-y-[3px] hover:border-gold-400/45 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85),0_0_40px_-10px_rgba(212,175,55,0.12)]',
        className
      )}
    >
      <Link
        to={`/product/${product.slug}`}
        className="block w-full h-full flex flex-col"
        aria-label={`View ${product.name}`}
      >
        <div className="relative w-full shrink-0">
          <BlurImage
            src={imageUrl}
            alt={product.name}
            aspectRatio="4/5"
            priority="auto"
            zoomHover
            wrapperClassName="border-b border-purple-700/20"
          />

          <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 flex flex-col gap-1.5 z-10">
            {product.isFeatured && <Badge variant="featured">Featured</Badge>}
            {(product as unknown as { isBestseller?: boolean }).isBestseller && (
              <Badge variant="bestseller">Bestseller</Badge>
            )}
            {product.isNewArrival && <Badge variant="new">New</Badge>}
          </div>

          <AnimatePresence initial={false}>
            {isHovered && (
              <>
                <motion.button
                  initial={{ opacity: 0, scale: 0.82, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -2 }}
                  transition={{ duration: 0.28, delay: 0.03, ease: [0.22, 1, 0.36, 1] }}
                  onClick={handleWishlistToggle}
                  className={cn(
                    'absolute top-2.5 sm:top-3 right-2.5 sm:right-3 z-10 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center backdrop-blur-md border transition-all duration-300',
                    inWishlist
                      ? 'bg-gold-400/92 border-gold-300 text-purple-900 shadow-[0_6px_20px_-6px_rgba(212,175,55,0.55)]'
                      : 'bg-background-tertiary/82 border-gold-400/38 text-gold-300 hover:bg-gold-400/18 hover:border-gold-400/70'
                  )}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={cn('w-[18px] h-[18px] sm:w-5 sm:h-5 transition-transform duration-300 hover:scale-110', inWishlist ? 'fill-current' : '')}
                  />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.34, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-5 z-10 w-[calc(100%-1.75rem)] sm:w-auto"
                >
                  <div className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-background-tertiary/92 backdrop-blur-md border border-gold-400/42 text-gold-300 text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] font-semibold hover:bg-gold-400/22 hover:border-gold-400/75 transition-all duration-300">
                    <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
                'absolute top-2.5 sm:top-3 right-2.5 sm:right-3 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center backdrop-blur-md border transition-all duration-400 ease-out',
                inWishlist
                  ? 'bg-gold-400/92 border-gold-300 text-purple-900 opacity-100'
                  : 'bg-background-tertiary/82 border-gold-400/30 text-gold-300 hover:bg-gold-400/15 opacity-0 group-hover:opacity-100 translate-y-[-4px] group-hover:translate-y-0'
              )}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={cn('w-4 h-4 sm:w-[18px] sm:h-[18px]', inWishlist ? 'fill-current' : '')}
              />
            </button>
          )}
        </div>

        <div className="relative flex-1 flex flex-col p-4 sm:p-5 md:p-6 gap-2 min-h-[9.5rem]">
          {categoryName && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-text-muted uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-medium"
            >
              {categoryName}
            </motion.p>
          )}

          <h3
            className="heading-serif font-medium text-cream text-base sm:text-lg md:text-xl leading-[1.25] line-clamp-2 min-h-[2.75rem] sm:min-h-[3.1rem] transition-colors duration-300 group-hover:text-cream/95"
          >
            {product.name}
          </h3>

          <div className="mt-auto pt-3 flex items-baseline gap-2 sm:gap-2.5">
            {hasValidPrice ? (
              <>
                <span
                  className="text-gold-400 font-semibold text-base sm:text-lg md:text-[1.05rem] heading-serif tracking-wide"
                  style={{ letterSpacing: '0.01em' }}
                >
                  {formatCurrencyINR(displayPrice)}
                </span>
                {displayPrice !== product.price && product.price > 0 && (
                  <span className="text-text-muted/85 text-[11px] sm:text-xs line-through decoration-text-muted/50">
                    {formatCurrencyINR(product.price)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-gold-300 font-medium text-[11px] sm:text-xs uppercase tracking-[0.18em]">
                Contact for Price
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export { ProductCard };
export default ProductCard;
