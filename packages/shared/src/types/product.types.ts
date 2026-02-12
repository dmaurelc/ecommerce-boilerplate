export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  barcode?: string;
  images: ProductImage[];
  category?: Category;
  variants: ProductVariant[];
  stock: number;
  status: ProductStatus;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  position: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
  options: VariantOption[];
}

export interface VariantOption {
  name: string;
  value: string;
}

export enum ProductStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

// Prisma enum values
export type PrismaProductStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
