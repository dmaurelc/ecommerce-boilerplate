import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@ecommerce/shared';

interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  image: string | null;
  quantity: number;
  price: number;
  total: number;
  variantName?: string;
}

interface CartData {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  updatedAt: Date;
}

interface CartStore {
  cart: CartData | null;
  isLoading: boolean;
  isOpen: boolean;
  addItem: (product: Product, variantId?: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (open: boolean) => void;
  getItemQuantity: (productId: string, variantId?: string) => number;
}

const TAX_RATE = 0.19; // 19% IVA in Chile

function generateItemId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        id: 'local-cart',
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        currency: 'CLP',
        updatedAt: new Date(),
      },
      isLoading: false,
      isOpen: false,

      addItem: (product, variantId, quantity = 1) => {
        set({ isLoading: true });

        const state = get();
        const cart = state.cart!;

        // Find variant if specified
        const variant = variantId
          ? product.variants?.find((v) => v.id === variantId)
          : null;

        const price = variant ? variant.price : product.price;
        const variantName = variant ? variant.name : undefined;
        const firstImage = product.images && product.images.length > 0
          ? product.images[0].url
          : null;

        // Check if item already exists
        const existingItemIndex = cart.items.findIndex(
          (item) => item.productId === product.id && item.variantId === variantId
        );

        let newItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          newItems = cart.items.map((item, index) => {
            if (index === existingItemIndex) {
              const newQuantity = item.quantity + quantity;
              return {
                ...item,
                quantity: newQuantity,
                total: item.price * newQuantity,
              };
            }
            return item;
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: generateItemId(),
            productId: product.id,
            variantId,
            name: product.name,
            slug: product.slug,
            image: firstImage,
            quantity,
            price,
            total: price * quantity,
            variantName,
          };
          newItems = [...cart.items, newItem];
        }

        // Calculate totals
        const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
        const tax = Math.round(subtotal * TAX_RATE);
        const total = subtotal + tax;

        const newCart: CartData = {
          id: cart.id,
          items: newItems,
          subtotal,
          tax,
          total,
          currency: 'CLP',
          updatedAt: new Date(),
        };

        set({ cart: newCart, isLoading: false, isOpen: true });

        console.log('✅ Item added to cart:', {
          product: product.name,
          variant: variantName,
          quantity,
          cartItems: newItems.length,
        });
      },

      removeItem: (itemId) => {
        set({ isLoading: true });

        const state = get();
        const cart = state.cart!;
        const newItems = cart.items.filter((item) => item.id !== itemId);

        const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
        const tax = Math.round(subtotal * TAX_RATE);
        const total = subtotal + tax;

        const newCart: CartData = {
          id: cart.id,
          items: newItems,
          subtotal,
          tax,
          total,
          currency: 'CLP',
          updatedAt: new Date(),
        };

        set({ cart: newCart, isLoading: false });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) return;

        set({ isLoading: true });

        const state = get();
        const cart = state.cart!;
        const newItems = cart.items.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity,
              total: item.price * quantity,
            };
          }
          return item;
        });

        const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
        const tax = Math.round(subtotal * TAX_RATE);
        const total = subtotal + tax;

        const newCart: CartData = {
          id: cart.id,
          items: newItems,
          subtotal,
          tax,
          total,
          currency: 'CLP',
          updatedAt: new Date(),
        };

        set({ cart: newCart, isLoading: false });
      },

      clearCart: () => {
        set({
          cart: {
            id: 'local-cart',
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            currency: 'CLP',
            updatedAt: new Date(),
          },
        });
      },

      setIsOpen: (open) => {
        set({ isOpen: open });
      },

      getItemQuantity: (productId, variantId) => {
        const state = get();
        const item = state.cart?.items.find(
          (i) => i.productId === productId && i.variantId === variantId
        );
        return item?.quantity || 0;
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
