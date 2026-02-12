export interface Cart {
  id: string;
  customerId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  image?: string;
}
