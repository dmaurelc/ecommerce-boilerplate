import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from '@ecommerce/database';
import { Product, ProductStatus } from '@ecommerce/shared';

interface FindAllParams {
  skip?: number;
  take?: number;
  categoryId?: string;
  status?: ProductStatus;
  search?: string;
}

@Injectable()
export class ProductsService {
  async findAll(params?: FindAllParams): Promise<Product[]> {
    const { skip = 0, take = 20, categoryId, status, search } = params || {};

    // Convert string parameters to integers for Prisma
    const takeNum = typeof take === 'string' ? parseInt(take, 10) : take;
    const skipNum = typeof skip === 'string' ? parseInt(skip, 10) : skip;

    const where: any = {
      status: status || ProductStatus.ACTIVE,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      skip: skipNum,
      take: takeNum,
      orderBy: { createdAt: 'desc' },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
        images: {
          select: { id: true, url: true, altText: true, position: true },
          orderBy: { position: 'asc' },
        },
        variants: {
          select: { id: true, name: true, price: true, sku: true, stock: true, options: true },
        },
      },
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: Number(p.price),
      compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
      sku: p.sku,
      barcode: p.barcode,
      stock: p.stock,
      status: p.status,
      categoryId: p.categoryId,
      images: p.images?.map((img) => ({
        id: img.id,
        url: img.url,
        altText: img.altText,
        position: img.position,
      })) || [],
      variants: p.variants?.map((v) => ({
        id: v.id,
        productId: p.id,
        name: v.name,
        price: Number(v.price),
        sku: v.sku,
        stock: v.stock,
        options: v.options as any,
      })) || [],
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    })) as Product[];
  }

  async findById(id: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { position: 'asc' } },
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      sku: product.sku,
      barcode: product.barcode,
      stock: product.stock,
      status: product.status,
      categoryId: product.categoryId,
      images: product.images?.map((img) => ({
        id: img.id,
        url: img.url,
        altText: img.altText,
        position: img.position,
      })) || [],
      variants: product.variants?.map((v) => ({
        id: v.id,
        productId: product.id,
        name: v.name,
        price: Number(v.price),
        sku: v.sku,
        stock: v.stock,
        options: v.options as any,
      })) || [],
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    } as Product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: { orderBy: { position: 'asc' } },
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      sku: product.sku,
      barcode: product.barcode,
      stock: product.stock,
      status: product.status,
      categoryId: product.categoryId,
      images: product.images?.map((img) => ({
        id: img.id,
        url: img.url,
        altText: img.altText,
        position: img.position,
      })) || [],
      variants: product.variants?.map((v) => ({
        id: v.id,
        productId: product.id,
        name: v.name,
        price: Number(v.price),
        sku: v.sku,
        stock: v.stock,
        options: v.options as any,
      })) || [],
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    } as Product;
  }

  async search(query: string): Promise<Product[]> {
    return this.findAll({ search: query });
  }
}
