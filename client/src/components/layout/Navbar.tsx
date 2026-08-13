import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
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
            : 'bg-transparent py-5 border-b border-transparent'
        )}
      >
        <nav className="container flex items-center justify-between">
          <Link
            to="/"
            className="flex-shrink-0"
            data-cursor="hover"
          >
            <h1 className="font-serif text-xl md:text-2xl text-gold-gradient tracking-wide">
              Shubham Swarn Kala Kendra
            </h1>
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                data-cursor="hover"
                className="relative text-text/90 hover:text-gold transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
              >
                <span className="relative inline-block">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full hover:w-full" />
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={toggleSearch}
              data-cursor="hover"
              className="p-2 text-text/90 hover:text-gold transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <Link
              to="/wishlist"
              data-cursor="hover"
              className="relative p-2 text-text/90 hover:text-gold transition-colors duration-300"
              aria-label="Wishlist"
            >
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-gold text-purple-900 text-[10px] font-bold">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              data-cursor="hover"
              className="relative p-2 text-text/90 hover:text-gold transition-colors duration-300"
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-gold text-purple-900 text-[10px] font-bold">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleMobileMenu}
              data-cursor="hover"
              className="lg:hidden p-2 text-text/90 hover:text-gold transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={1.5} />
              ) : (
                <Menu size={22} strokeWidth={1.5} />
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
            transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 glass lg:hidden"
          >
            <div className="flex flex-col h-full pt-28 px-6">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      onClick={closeMobileMenu}
                      className="font-serif text-3xl text-gold-gradient hover:text-gold transition-colors duration-300 block py-2"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-auto pb-10 border-t border-gold/20 pt-8"
              >
                <p className="text-text-muted text-sm mb-4">
                  Get in touch with us
                </p>
                <div className="space-y-2 text-text/80 text-sm">
                  <p>{BUSINESS.phonePrimaryFormatted}</p>
                  <p>{BUSINESS.phoneSecondaryFormatted}</p>
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
