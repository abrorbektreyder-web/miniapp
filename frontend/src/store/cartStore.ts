import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '../types/index';
import { useTelegram } from '../hooks/useTelegram';

interface CartStore {
  items: CartItem[];
  totalAmount: number;
  
  // Actions
  addItem: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeItem: (productId: number, size?: string, color?: string) => void;
  updateQuantity: (productId: number, size: string | undefined, color: string | undefined, quantity: number) => void;
  incrementQuantity: (productId: number, size: string | undefined, color: string | undefined) => void;
  decrementQuantity: (productId: number, size: string | undefined, color: string | undefined) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

function getItemKey(item: CartItem): string {
  return `${item.product.id}-${item.size || ''}-${item.color || ''}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalAmount: 0,

      addItem: (product, size, color, quantity = 1) => {
        const telegram = useTelegram();
        const hapticImpact = telegram.hapticImpact;
        
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.size === size &&
              item.color === color
          );

          if (existingItemIndex > -1) {
            // Update existing item quantity
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          } else {
            // Add new item
            return {
              items: [
                ...state.items,
                {
                  product,
                  size,
                  color,
                  quantity,
                },
              ],
            };
          }
        });

        get().calculateTotal();
        hapticImpact?.('medium');
      },

      removeItem: (productId, size, color) => {
        const telegram = useTelegram();
        const hapticImpact = telegram.hapticImpact;
        
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.size === size &&
                item.color === color
              )
          ),
        }));

        get().calculateTotal();
        hapticImpact?.('light');
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.size === size &&
            item.color === color
              ? { ...item, quantity }
              : item
          ),
        }));

        get().calculateTotal();
      },

      incrementQuantity: (productId, size, color) => {
        const telegram = useTelegram();
        const hapticImpact = telegram.hapticImpact;
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.size === size &&
            item.color === color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));

        get().calculateTotal();
        hapticImpact?.('light');
      },

      decrementQuantity: (productId, size, color) => {
        const telegram = useTelegram();
        const hapticImpact = telegram.hapticImpact;
        
        set((state) => {
          const item = state.items.find(
            (i) =>
              i.product.id === productId &&
              i.size === size &&
              i.color === color
          );

          if (item && item.quantity <= 1) {
            return state; // Don't decrement below 1, use removeItem instead
          }

          return {
            items: state.items.map((item) =>
              item.product.id === productId &&
              item.size === size &&
              item.color === color
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          };
        });

        get().calculateTotal();
        hapticImpact?.('light');
      },

      clearCart: () => {
        set({ items: [], totalAmount: 0 });
      },

      calculateTotal: () => {
        set((state) => ({
          totalAmount: state.items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          ),
        }));
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items, totalAmount: state.totalAmount }),
    }
  )
);

// Export hooks for easier usage
export function useCart() {
  const { items, totalAmount } = useCartStore();
  
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isEmpty = items.length === 0;

  return {
    items,
    totalAmount,
    itemCount,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  };
}
