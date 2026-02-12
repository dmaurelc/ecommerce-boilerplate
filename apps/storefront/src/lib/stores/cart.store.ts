import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Cart } from '@ecommerce/shared';
import { cart } from '@/lib/data-access';

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, variantId?: string, quantity?: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,

      fetchCart: async () => {
        set({ isLoading: true });
        try {
          const cartData = await cart.getCart();
          set({ cart: cartData });
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      addItem: async (productId, variantId, quantity = 1) => {
        set({ isLoading: true });
        try {
          const cartData = await cart.addItem(
            get()?.cart?.id || 'new',
            productId,
            variantId,
            quantity
          );
          set({ cart: cartData });
        } catch (error) {
          console.error('Error adding item to cart:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (itemId) => {
        set({ isLoading: true });
        try {
          const cartData = await cart.removeItem(get()?.cart?.id || '', itemId);
          set({ cart: cartData });
        } catch (error) {
          console.error('Error removing item from cart:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (itemId, quantity) => {
        set({ isLoading: true });
        try {
          const cartData = await cart.updateQuantity(get()?.cart?.id || '', itemId, quantity);
          set({ cart: cartData });
        } catch (error) {
          console.error('Error updating quantity:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: async () => {
        set({ isLoading: true });
        try {
          await cart.clearCart(get()?.cart?.id || '');
          set({ cart: null });
        } catch (error) {
          console.error('Error clearing cart:', error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
