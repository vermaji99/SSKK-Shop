import LenisProvider from './LenisProvider';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import CustomCursor from './CustomCursor';
import { LuxuryPreloader } from './LuxuryPreloader';
import { FloatingContact } from './FloatingContact';
import { SearchOverlay } from '@/components/common/SearchOverlay';
import { useCartStore } from '@/store/cartStore';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrencyINR } from '@/lib/utils';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui';

interface LayoutProps {
  children: ReactNode;
}

function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeFromCart, getSubtotal, getTotalItems } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-background-secondary to-background z-[101] border-l border-gold/20 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-purple-700/30">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h3 className="heading-serif text-2xl text-cream">Your Selection</h3>
                <span className="px-2 py-0.5 text-xs bg-gold/20 text-gold rounded-full">
                  {getTotalItems()}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-purple-700/40 text-text-muted hover:text-gold transition-colors"
                aria-label="Close selection"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-purple-700 mb-4" />
                  <h4 className="heading-serif text-xl text-cream mb-2">Your selection is empty</h4>
                  <p className="text-text-muted text-sm mb-6">
                    Discover our exquisite collection and save your favorite pieces.
                  </p>
                  <Link to="/collections" onClick={closeCart}>
                    <Button variant="secondary" size="sm">
                      Browse Collection
                    </Button>
                  </Link>
                </div>
              ) : (
                items.map((item) => {
                  const displayPrice =
                    (item.product as unknown as { discountPrice?: number }).discountPrice ??
                    item.product.price;
                  const imageUrl = item.product.images?.[0]?.url || '';
                  return (
                    <motion.div
                      key={item.product._id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-3 bg-background-tertiary/60 border border-purple-700/20"
                    >
                      <Link
                        to={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="shrink-0 w-20 h-20 overflow-hidden bg-purple-900/30"
                      >
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt={item.product.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </Link>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <Link
                            to={`/product/${item.product.slug}`}
                            onClick={closeCart}
                            className="heading-serif text-cream text-base font-semibold line-clamp-1 hover:text-gold transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1 text-gold font-semibold text-sm">
                            {formatCurrencyINR(displayPrice)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-purple-700/40">
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                              className="p-1.5 hover:bg-purple-700/40 text-text-muted hover:text-gold transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-cream text-sm tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                              className="p-1.5 hover:bg-purple-700/40 text-text-muted hover:text-gold transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product._id)}
                            className="p-1.5 text-text-muted hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-purple-700/30 p-6 space-y-4">
                <div className="flex items-center justify-between text-cream">
                  <span className="text-text-muted uppercase tracking-wider text-xs">Estimated Total</span>
                  <span className="heading-serif text-2xl text-gold-gradient font-bold">
                    {formatCurrencyINR(getSubtotal())}
                  </span>
                </div>
                <p className="text-xs text-text-muted">
                  Connect with our showroom to confirm gold weight & instant booking.
                </p>
                <Link to="/contact" onClick={closeCart}>
                  <Button className="w-full" size="lg">
                    Enquire / Visit Showroom
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  className="w-full"
                  size="md"
                  onClick={closeCart}
                  asChild
                >
                  <Link to="/collections">Continue Browsing</Link>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <LenisProvider>
      <LuxuryPreloader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <CartDrawer />
      <SearchOverlay />
      <FloatingContact />
      <main className="min-h-screen bg-background text-text">
        {children}
      </main>
      <Footer />
    </LenisProvider>
  );
}

export default Layout;
