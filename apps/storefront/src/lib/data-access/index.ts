import { DataSource } from './types';
import { NestJSAdapter } from './nestjs.adapter';
import { ShopifyAdapter } from './shopify.adapter';

let dataSourceInstance: DataSource;

export function getDataAdapter(): DataSource {
  const source = process.env.DATA_SOURCE || 'nestjs';

  if (!dataSourceInstance) {
    switch (source) {
      case 'shopify':
        dataSourceInstance = new ShopifyAdapter();
        break;
      case 'nestjs':
      default:
        dataSourceInstance = new NestJSAdapter();
        break;
    }
  }

  return dataSourceInstance;
}

// Export convenience functions
export const dataAdapter = getDataAdapter();
export const products = dataAdapter.products;
export const cart = dataAdapter.cart;
export const orders = dataAdapter.orders;
export const users = dataAdapter.users;
