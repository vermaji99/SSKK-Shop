import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { BUSINESS } from '@/config/business';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Jewelry', path: '/jewelry' },
  { name: 'Collections', path: '/collections' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { mobileMenuOpen, toggleMobileMenu, toggleSearch, setMobileMenuOpen } =
    useUIStore();
  const { items: cartItems, openCart, getTotalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = getTotalItems();
  const wishlistCount = wishlistItems.length;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-gold/30 py-3 shadow-lg shadow-black/20'
            : 'bg-transparent py-4 sm:py-5 border-b border-transparent'
        )}
        style={{
          paddingTop: scrolled ? 'calc(env(safe-area-inset-top) + 0.75rem)' : 'calc(env(safe-area-inset-top) + 1rem)',
        }}
      >
        <nav className="container flex items-center justify-between gap-2 sm:gap-4">
          <Link
            to="/"
            className="flex-shrink-0 min-w-0 pr-2"
            data-cursor="hover"
            onClick={closeMobileMenu}
          >
            <h1 className="font-serif text-gold-gradient tracking-wide leading-tight whitespace-nowrap">
              <span className="hidden sm:inline text-xl md:text-2xl">
                Shubham Swarn Kala Kendra
              </span>
              <span className="sm:hidden text-2xl font-semibold">SSKK</span>
            </h1>
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                data-cursor="hover"
                className="group relative text-text/90 hover:text-gold transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
              >
                <span className="relative inline-block">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 shrink-0">
            <button
              onClick={toggleSearch}
              data-cursor="hover"
              className="p-1.5 sm:p-2 text-text/90 hover:text-gold transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <Link
              to="/wishlist"
              data-cursor="hover"
              className="relative p-1.5 sm:p-2 text-text/90 hover:text-gold transition-colors duration-300"
              aria-label="Wishlist"
              onClick={closeMobileMenu}
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center rounded-full bg-gold text-purple-900 text-[9px] sm:text-[10px] font-bold">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              data-cursor="hover"
              className="relative p-1.5 sm:p-2 text-text/90 hover:text-gold transition-colors duration-300"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center rounded-full bg-gold text-purple-900 text-[9px] sm:text-[10px] font-bold">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            <div className="w-px h-5 mx-1 sm:mx-2 bg-gold-400/20 hidden sm:block" />

            <button
              onClick={toggleMobileMenu}
              data-cursor="hover"
              className={cn(
                'p-2 sm:p-2.5 text-text/90 hover:text-gold transition-all duration-300 rounded-md',
                'border border-gold-400/30 bg-gold-400/5 hover:bg-gold-400/10 hover:border-gold-400/60',
                'lg:hidden flex items-center justify-center'
              )}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={20} strokeWidth={1.75} />
              ) : (
                <Menu size={20} strokeWidth={1.75} />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 glass lg:hidden"
            style={{ paddingTop: 'calc(env(safe-area-inset-top) + 5rem)' }}
          >
            <div className="flex flex-col h-full px-6 pb-8">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ delay: 0.12 + index * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={closeMobileMenu}
                      className="group font-serif text-2xl sm:text-3xl text-cream/90 hover:text-gold-gradient transition-colors duration-300 block py-3.5 border-b border-gold-400/10"
                    >
                      <span className="flex items-center justify-between">
                        <span>{link.name}</span>
                        <span className="text-gold-400/60 text-base transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                          →
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 grid grid-cols-3 gap-3"
              >
                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                  className="flex flex-col items-center justify-center gap-2 p-4 glass hover:border-gold-400/40 transition-all"
                >
                  <Heart size={20} strokeWidth={1.5} className="text-gold-400" />
                  <span className="text-[10px] uppercase tracking-wider text-text-muted">Wishlist</span>
                </Link>
                <button
                  onClick={() => { openCart(); closeMobileMenu(); }}
                  className="flex flex-col items-center justify-center gap-2 p-4 glass hover:border-gold-400/40 transition-all"
                >
                  <ShoppingBag size={20} strokeWidth={1.5} className="text-gold-400" />
                  <span className="text-[10px] uppercase tracking-wider text-text-muted">Cart</span>
                </button>
                <a
                  href={`tel:+91${BUSINESS.phonePrimary}`}
                  className="flex flex-col items-center justify-center gap-2 p-4 glass hover:border-gold-400/40 transition-all"
                >
                  <Phone size={20} strokeWidth={1.5} className="text-gold-400" />
                  <span className="text-[10px] uppercase tracking-wider text-text-muted">Call</span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.85, duration: 0.4 }}
                className="mt-auto pt-8 border-t border-gold/20"
              >
                <p className="text-text-muted text-xs uppercase tracking-[0.2em] mb-3">
                  Contact
                </p>
                <div className="space-y-1.5 text-text/80 text-sm">
                  <a href={`tel:+91${BUSINESS.phonePrimary}`} className="block hover:text-gold transition-colors">
                    {BUSINESS.phonePrimaryFormatted}
                  </a>
                  <a href={`tel:+91${BUSINESS.phoneSecondary}`} className="block hover:text-gold transition-colors">
                    {BUSINESS.phoneSecondaryFormatted}
                  </a>
                  <p className="pt-2 text-text-muted text-xs leading-relaxed">
                    {BUSINESS.address}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
