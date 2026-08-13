import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../lib/types';
import api from '../lib/api';

interface WishlistState {
  items: Product[];
  isLoading: boolean;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => Promise<void>;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      fetchWishlist: async () => {
        try {
          set({ isLoading: true });
          const { data } = await api.get('/wishlist');
          set({ items: data.data || [], isLoading: false });
        } catch {
          set({ isLoading: false });
        }
      },

      addToWishlist: async (productId) => {
        try {
          set({ isLoading: true });
          const { data } = await api.post('/wishlist', { productId });
          set({ items: data.data || [], isLoading: false });
        } catch (error: unknown) {
          set({ isLoading: false });
          const err = error as { response?: { data?: { message?: string } } };
          if (!err.response?.data?.message?.includes('already')) {
            throw error;
          }
        }
      },

      removeFromWishlist: async (productId) => {
        try {
          set({ isLoading: true });
          const { data } = await api.delete(`/wishlist/${productId}`);
          set({ items: data.data || [], isLoading: false });
        } catch {
          set({ isLoading: false });
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((p) => p._id === productId);
      },

      toggleWishlist: async (product) => {
        const inWishlist = get().isInWishlist(product._id);
        if (inWishlist) {
          await get().removeFromWishlist(product._id);
        } else {
          await get().addToWishlist(product._id);
        }
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: 'sskk-wishlist',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useWishlistStore;
