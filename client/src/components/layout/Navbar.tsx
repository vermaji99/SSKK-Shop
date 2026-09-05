import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { BUSINESS, WHATSAPP_PREFILLS, buildWhatsAppUrl } from '@/config/business';

const navLinks = [
  { name: 'Home', label: 'HOME', path: '/' },
  { name: 'Jewellery', label: 'JEWELLERY', path: '/collections' },
  { name: 'Bridal', label: 'BRIDAL', path: '/collections/bridal' },
  { name: 'About', label: 'ABOUT', path: '/about' },
  { name: 'Our Story', label: 'OUR STORY', path: '/about#story' },
  { name: 'Visit Us', label: 'VISIT US', path: '/contact#visit' },
  { name: 'Contact', label: 'CONTACT', path: '/contact#enquiry' },
];

const HEADER_WHATSAPP_URL = buildWhatsAppUrl(WHATSAPP_PREFILLS.header);

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
  const { mobileMenuOpen, toggleMobileMenu, toggleSearch, setMobileMenuOpen, reducedMotion: reducedMotionStore } =
    useUIStore();
  const { openCart, getTotalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionStore || prefersReducedMotion;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = getTotalItems();
  const wishlistCount = wishlistItems.length;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isLinkActive = useMemo(() => {
    return (path: string): boolean => {
      if (path === '/') return location.pathname === '/';
      const [route, hash] = path.split('#');
      if (route && location.pathname !== route) return false;
      if (hash) return location.pathname === route && location.hash === `#${hash}`;
      if (route && route !== '/') return location.pathname.startsWith(route);
      return location.pathname === '/';
    };
  }, [location.pathname, location.hash]);

  return (
    <>
      <motion.header
        initial={reducedMotion ? { y: 0 } : { y: -100 }}
        animate={{ y: 0 }}
        transition={reducedMotion ? { duration: 0.05 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          scrolled
            ? 'glass border-b border-gold-400/[0.18] py-2 sm:py-2.5 shadow-[0_8px_32px_-14px_rgba(0,0,0,0.62)]'
            : 'bg-transparent py-3 sm:py-3.5 border-b border-transparent'
        )}
        style={{
          paddingTop: scrolled
            ? 'max(calc(env(safe-area-inset-top) + 0.5rem), 0.5rem)'
            : 'max(calc(env(safe-area-inset-top) + 0.75rem), 0.75rem)',
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

          <div className="hidden lg:flex items-center justify-center gap-7 xl:gap-9">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  data-cursor="hover"
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'nav-underline relative text-text/90 hover:text-gold transition-colors duration-300 ease-out text-[11.5px] md:text-[12.5px] uppercase tracking-[0.2em] md:tracking-[0.22em] font-medium py-1.5',
                    active && 'is-active text-gold'
                  )}
                >
                  <span className="relative inline-block">{link.label}</span>
                </Link>
              );
            })}
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

            <a
              href={HEADER_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp SSKK for jewellery enquiries"
              data-cursor="hover"
              className={cn(
                'hidden md:inline-flex touch-target items-center gap-1.5 px-3 md:px-3.5 py-2 rounded-full',
                'gold-gradient text-purple-900 font-semibold uppercase tracking-wider text-[10.5px] md:text-[11px]',
                'shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-500 ease-out',
                'hover:-translate-y-px active:translate-y-0 active:scale-[0.986]',
                'ring-1 ring-gold-400/30'
              )}
            >
              <MessageCircle size={15} strokeWidth={1.75} className="md:w-[16px] md:h-[16px]" />
              <span className="whitespace-nowrap">WhatsApp</span>
            </a>

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
            initial={reducedMotion ? { y: 0, opacity: 1 } : { y: '-100%', opacity: 0.92 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reducedMotion ? { y: '-100%', opacity: 1 } : { y: '-100%', opacity: 0.92 }}
            transition={reducedMotion
              ? { duration: 0.05 }
              : {
                  duration: 0.48,
                  ease: [0.77, 0, 0.175, 1],
                }
            }
            className="fixed inset-0 z-40 glass lg:hidden overflow-y-auto"
            style={{
              paddingTop: 'max(calc(env(safe-area-inset-top) + 5rem), 5rem)',
            }}
          >
            <div className="flex flex-col min-h-[calc(100dvh-5rem)] px-5 sm:px-6 pb-8">
              <nav className="flex flex-col gap-0.5">
                {navLinks.map((link, index) => {
                  const active = isLinkActive(link.path);
                  return (
                    <motion.div
                      key={link.name}
                      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: -16 }}
                      transition={reducedMotion
                        ? { duration: 0.05 }
                        : {
                            delay: 0.12 + index * 0.085,
                            duration: 0.46,
                            ease: [0.22, 1, 0.36, 1],
                          }
                      }
                    >
                      <Link
                        to={link.path}
                        onClick={closeMobileMenu}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'group font-serif text-[1.55rem] sm:text-2xl md:text-3xl hover:text-gold-gradient transition-colors duration-300 block py-3.5 sm:py-4 border-b border-gold-400/[0.11] min-h-[60px] flex items-center touch-target',
                          active ? 'text-gold-gradient' : 'text-cream/92'
                        )}
                      >
                        <span className="flex items-center justify-between w-full">
                          <span>{link.label}</span>
                          <span className="text-gold-400/60 text-base sm:text-lg transform -translate-x-3 group-hover:translate-x-0 transition-transform duration-400 ease-out opacity-0 group-hover:opacity-100">
                            →
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: -8 }}
                transition={reducedMotion
                  ? { duration: 0.05 }
                  : { delay: 0.68, duration: 0.52, ease: [0.22, 1, 0.36, 1] }
                }
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
