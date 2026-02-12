import { Product, Order, Cart, User } from '@ecommerce/shared';

export interface IProductsRepository {
  findAll(params?: any): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findBySlug(slug: string): Promise<Product | null>;
  search(query: string): Promise<Product[]>;
  getCategories(): Promise<Array<{ id: string; name: string; slug: string }>>;
}

export interface ICartRepository {
  getCart(cartId?: string): Promise<Cart>;
  addItem(cartId: string, productId: string, variantId?: string, quantity?: number): Promise<Cart>;
  removeItem(cartId: string, itemId: string): Promise<Cart>;
  updateQuantity(cartId: string, itemId: string, quantity: number): Promise<Cart>;
  clearCart(cartId: string): Promise<void>;
}

export interface IOrdersRepository {
  createOrder(data: CreateOrderData): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
  getOrdersByCustomer(customerId: string): Promise<Order[]>;
}

export interface IUsersRepository {
  getProfile(userId: string): Promise<User | null>;
  updateProfile(userId: string, data: Partial<User>): Promise<User>;
}

export interface CreateOrderData {
  customerId: string;
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
  }>;
  shippingAddress: any;
  billingAddress: any;
}

export interface DataSource {
  products: IProductsRepository;
  cart: ICartRepository;
  orders: IOrdersRepository;
  users: IUsersRepository;
}
