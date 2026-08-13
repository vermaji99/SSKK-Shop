import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../lib/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addToCart: (product, qty = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product._id === product._id
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product._id === product._id
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: qty }] };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product._id !== productId),
        }));
      },

      updateQuantity: (productId, qty) => {
        if (qty <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product._id === productId ? { ...i, quantity: qty } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          const price =
            (item.product as unknown as { discountPrice?: number }).discountPrice ||
            (item.product as unknown as { price: number }).price;
          return sum + price * item.quantity;
        }, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'sskk-cart',
    }
  )
);

export default useCartStore;
