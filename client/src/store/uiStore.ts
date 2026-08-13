import { create } from 'zustand';

export type SearchModalState = { isOpen: boolean };
export type MobileMenuState = { isOpen: boolean };

interface UIState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  wishlistOpen: boolean;
  pageTransitioning: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  heroScrollLocked: boolean;
  heroScrollProgress: number;

  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setWishlistOpen: (open: boolean) => void;
  toggleWishlist: () => void;
  setPageTransitioning: (v: boolean) => void;
  setReducedMotion: (v: boolean) => void;
  setIsMobile: (v: boolean) => void;
  setHeroScrollLocked: (v: boolean) => void;
  setHeroScrollProgress: (v: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  searchOpen: false,
  wishlistOpen: false,
  pageTransitioning: false,
  reducedMotion:
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  isMobile:
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  heroScrollLocked: false,
  heroScrollProgress: 0,

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  setSearchOpen: (open) => set({ searchOpen: open }),
  toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen })),
  setWishlistOpen: (open) => set({ wishlistOpen: open }),
  toggleWishlist: () => set((s) => ({ wishlistOpen: !s.wishlistOpen })),
  setPageTransitioning: (v) => set({ pageTransitioning: v }),
  setReducedMotion: (v) => set({ reducedMotion: v }),
  setIsMobile: (v) => set({ isMobile: v }),
  setHeroScrollLocked: (v) => set({ heroScrollLocked: v }),
  setHeroScrollProgress: (v) => set({ heroScrollProgress: v }),
}));

export default useUIStore;
