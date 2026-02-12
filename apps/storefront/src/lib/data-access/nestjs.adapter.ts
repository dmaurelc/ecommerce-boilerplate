import axios from 'axios';
import type { DataSource, IProductsRepository, ICartRepository, IOrdersRepository, IUsersRepository } from './types';
import { Product, Order, Cart, User } from '@ecommerce/shared';

const apiClient = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

class NestJSProductsRepository implements IProductsRepository {
  async findAll(params?: any): Promise<Product[]> {
    const { data } = await apiClient.get('/products', { params });
    return data;
  }

  async findById(id: string): Promise<Product | null> {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const { data } = await apiClient.get(`/products/slug/${slug}`);
    return data;
  }

  async search(query: string): Promise<Product[]> {
    const { data } = await apiClient.get('/products/search', { params: { q: query } });
    return data;
  }
}

class NestJSCartRepository implements ICartRepository {
  async getCart(cartId?: string): Promise<Cart> {
    const url = cartId ? `/cart/${cartId}` : '/cart';
    const { data } = await apiClient.get(url);
    return data;
  }

  async addItem(cartId: string, productId: string, variantId?: string, quantity = 1): Promise<Cart> {
    const { data } = await apiClient.post(`/cart/${cartId}/items`, {
      productId,
      variantId,
      quantity,
    });
    return data;
  }

  async removeItem(cartId: string, itemId: string): Promise<Cart> {
    const { data } = await apiClient.delete(`/cart/${cartId}/items/${itemId}`);
    return data;
  }

  async updateQuantity(cartId: string, itemId: string, quantity: number): Promise<Cart> {
    const { data } = await apiClient.patch(`/cart/${cartId}/items/${itemId}`, { quantity });
    return data;
  }

  async clearCart(cartId: string): Promise<void> {
    await apiClient.delete(`/cart/${cartId}`);
  }
}

class NestJSOrdersRepository implements IOrdersRepository {
  async createOrder(data: any): Promise<Order> {
    const { data: order } = await apiClient.post('/orders', data);
    return order;
  }

  async getOrderById(id: string): Promise<Order | null> {
    const { data } = await apiClient.get(`/orders/${id}`);
    return data;
  }

  async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    const { data } = await apiClient.get(`/orders?customerId=${customerId}`);
    return data;
  }
}

class NestJSUsersRepository implements IUsersRepository {
  async getProfile(userId: string): Promise<User | null> {
    const { data } = await apiClient.get(`/users/${userId}`);
    return data;
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    const { data: user } = await apiClient.patch(`/users/${userId}`, data);
    return user;
  }
}

export class NestJSAdapter implements DataSource {
  products = new NestJSProductsRepository();
  cart = new NestJSCartRepository();
  orders = new NestJSOrdersRepository();
  users = new NestJSUsersRepository();
}
