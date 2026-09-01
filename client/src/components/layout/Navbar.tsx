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
  { name: 'Jewellery', path: '/collections' },
  { name: 'Bridal', path: '/collections/bridal' },
  { name: 'About', path: '/about' },
  { name: 'Visit Us', path: '/contact' },
];

const IconButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  badge?: number | string;
  asChild?: boolean;
  className?: string;
}> = ({ children, onClick, ariaLabel, badge, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'touch-target relative p-2 sm:p-2.5',
        'text-text/90 hover:text-gold transition-all duration-300 ease-out',
        'rounded-md hover:bg-gold-400/[0.06] active:bg-gold-400/10',
        className
      )}
      data-cursor="hover"
    >
      {children}
      {badge != null && badge !== 0 && (
        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 sm:h-[18px] sm:w-[18px] flex items-center justify-center rounded-full bg-gold-400 text-purple-900 text-[9px] sm:text-[10px] font-bold shadow-[0_2px_8px_-2px_rgba(212,175,55,0.6)] ring-1 ring-purple-900/40">
          {typeof badge === 'number' && badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { mobileMenuOpen, toggleMobileMenu, toggleSearch, setMobileMenuOpen } =
    useUIStore();
  const { openCart, getTotalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
          scrolled
            ? 'glass border-b border-gold-400/[0.28] py-2.5 sm:py-3 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]'
            : 'bg-transparent py-3.5 sm:py-4 sm:py-5 border-b border-transparent'
        )}
        style={{
          paddingTop: scrolled
            ? 'max(calc(env(safe-area-inset-top) + 0.625rem), 0.625rem)'
            : 'max(calc(env(safe-area-inset-top) + 0.875rem), 0.875rem)',
        }}
      >
        <nav className="container flex items-center justify-between gap-2 sm:gap-4">
          <Link
            to="/"
            className="flex-shrink-0 min-w-0 pr-1.5"
            data-cursor="hover"
            onClick={closeMobileMenu}
            aria-label="SSKK — Shubham Swarn Kala Kendra"
          >
            <h1 className="font-serif text-gold-gradient tracking-wide leading-tight whitespace-nowrap transition-transform duration-300 hover:scale-[1.01]">
              <span className="hidden sm:inline text-[1.05rem] md:text-xl lg:text-2xl">
                Shubham Swarn Kala Kendra
              </span>
              <span className="sm:hidden text-2xl font-semibold">SSKK</span>
            </h1>
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                data-cursor="hover"
                className="nav-underline relative text-text/90 hover:text-gold transition-colors duration-300 ease-out text-[12.5px] md:text-sm uppercase tracking-[0.18em] md:tracking-[0.22em] font-medium py-2"
              >
                <span className="relative inline-block">{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 shrink-0 pl-1">
            <IconButton ariaLabel="Search" onClick={toggleSearch}>
              <Search size={18} strokeWidth={1.5} className="sm:w-[19px] sm:h-[19px]" />
            </IconButton>

            <Link
              to="/wishlist"
              data-cursor="hover"
              onClick={closeMobileMenu}
              className={cn(
                'touch-target relative p-2 sm:p-2.5',
                'text-text/90 hover:text-gold transition-all duration-300 ease-out',
                'rounded-md hover:bg-gold-400/[0.06] active:bg-gold-400/10'
              )}
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.5} className="sm:w-[19px] sm:h-[19px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 sm:h-[18px] sm:w-[18px] flex items-center justify-center rounded-full bg-gold-400 text-purple-900 text-[9px] sm:text-[10px] font-bold shadow-[0_2px_8px_-2px_rgba(212,175,55,0.6)] ring-1 ring-purple-900/40">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            <IconButton ariaLabel="Cart" onClick={openCart} badge={cartCount}>
              <ShoppingBag size={18} strokeWidth={1.5} className="sm:w-[19px] sm:h-[19px]" />
            </IconButton>

            <div className="w-px h-5 mx-0.5 sm:mx-1 md:mx-2 bg-gold-400/[0.18] hidden sm:block" />

            <button
              type="button"
              onClick={toggleMobileMenu}
              data-cursor="hover"
              className={cn(
                'touch-target p-2 sm:p-2.5 text-text/90 hover:text-gold transition-all duration-300 ease-out',
                'border border-gold-400/[0.28] bg-gold-400/[0.05] hover:bg-gold-400/10 hover:border-gold-400/[0.58]',
                'rounded-md lg:hidden flex items-center justify-center shrink-0'
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

      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0.92 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0.92 }}
            transition={{
              duration: 0.48,
              ease: [0.77, 0, 0.175, 1],
            }}
            className="fixed inset-0 z-40 glass lg:hidden overflow-y-auto"
            style={{
              paddingTop: 'max(calc(env(safe-area-inset-top) + 5rem), 5rem)',
            }}
          >
            <div className="flex flex-col min-h-[calc(100dvh-5rem)] px-5 sm:px-6 pb-8">
              <nav className="flex flex-col gap-0.5">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{
                      delay: 0.12 + index * 0.085,
                      duration: 0.46,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={closeMobileMenu}
                      className="group font-serif text-[1.55rem] sm:text-2xl md:text-3xl text-cream/92 hover:text-gold-gradient transition-colors duration-300 block py-3.5 sm:py-4 border-b border-gold-400/[0.11] min-h-[56px] flex items-center"
                    >
                      <span className="flex items-center justify-between w-full">
                        <span>{link.name}</span>
                        <span className="text-gold-400/60 text-base sm:text-lg transform -translate-x-3 group-hover:translate-x-0 transition-transform duration-400 ease-out opacity-0 group-hover:opacity-100">
                          →
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: 0.68, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 sm:mt-8 grid grid-cols-3 gap-2.5 sm:gap-3"
              >
                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                  className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-3.5 sm:p-4 glass-soft hover:border-gold-400/[0.42] transition-all duration-300 min-h-[84px] active:scale-[0.98]"
                >
                  <Heart size={20} strokeWidth={1.5} className="text-gold-400" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-text-muted font-medium">
                    Wishlist
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    openCart();
                    closeMobileMenu();
                  }}
                  className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-3.5 sm:p-4 glass-soft hover:border-gold-400/[0.42] transition-all duration-300 min-h-[84px] active:scale-[0.98]"
                >
                  <ShoppingBag size={20} strokeWidth={1.5} className="text-gold-400" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-text-muted font-medium">
                    Cart
                  </span>
                </button>
                <a
                  href={`tel:+91${BUSINESS.phonePrimary}`}
                  className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-3.5 sm:p-4 glass-soft hover:border-gold-400/[0.42] transition-all duration-300 min-h-[84px] active:scale-[0.98]"
                >
                  <Phone size={20} strokeWidth={1.5} className="text-gold-400" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-text-muted font-medium">
                    Call
                  </span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.84, duration: 0.42 }}
                className="mt-auto pt-7 sm:pt-8 border-t border-gold-400/[0.18]"
              >
                <p className="text-text-muted text-[11px] sm:text-xs uppercase tracking-[0.22em] mb-3 sm:mb-3.5">
                  Contact
                </p>
                <div className="space-y-1.5 sm:space-y-2 text-text/82 text-[13px] sm:text-sm">
                  <a
                    href={`tel:+91${BUSINESS.phonePrimary}`}
                    className="block hover:text-gold transition-colors duration-200 min-h-[32px] flex items-center"
                  >
                    {BUSINESS.phonePrimaryFormatted}
                  </a>
                  <a
                    href={`tel:+91${BUSINESS.phoneSecondary}`}
                    className="block hover:text-gold transition-colors duration-200 min-h-[32px] flex items-center"
                  >
                    {BUSINESS.phoneSecondaryFormatted}
                  </a>
                  <p className="pt-1.5 sm:pt-2 text-text-muted text-[12px] sm:text-xs leading-relaxed">
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
