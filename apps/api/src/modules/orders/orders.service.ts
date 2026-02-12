import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import prisma from '@ecommerce/database';
import { Order, OrderStatus, PaymentStatus } from '@ecommerce/shared';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  /**
   * Generate unique order number
   * Format: ORD-YYYY-XXXXXX
   */
  private generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    return `ORD-${year}-${random}`;
  }

  /**
   * Create a new order with items
   */
  async create(data: CreateOrderDto): Promise<Order> {
    const {
      customerId,
      items,
      shippingAddress,
      billingAddress,
      subtotal,
      tax,
      total,
      paymentMethod,
      notes,
    } = data;

    // For guest checkout, create a temporary customer or use a guest ID
    const finalCustomerId = customerId || await this.getOrCreateGuestCustomer(shippingAddress);

    // Validate products and variants exist
    const productIds = items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { variants: true },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('Some products were not found');
    }

    // Create order with transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber: this.generateOrderNumber(),
          customerId: finalCustomerId,
          subtotal,
          tax,
          total,
          currency: 'CLP',
          status: OrderStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
          paymentProvider: paymentMethod,
          shippingAddress: shippingAddress as any,
          billingAddress: (billingAddress || shippingAddress) as any,
          notes,
        },
      });

      // Create order items
      for (const item of items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            variantId: item.variantId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          },
        });
      }

      // Return order with items
      return tx.order.findUnique({
        where: { id: newOrder.id },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  images: {
                    select: { id: true, url: true, altText: true, position: true },
                    orderBy: { position: 'asc' },
                  },
                },
              },
              variant: {
                select: {
                  id: true,
                  name: true,
                  options: true,
                },
              },
            },
          },
          customer: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });
    });

    return this.mapToOrderType(order);
  }

  /**
   * Get or create a guest customer (for guest checkout)
   */
  private async getOrCreateGuestCustomer(address: any): Promise<string> {
    // For now, create a guest user with email from address
    // In a real implementation, you might want to create a proper guest account
    const guestEmail = `guest_${Date.now()}@temporary.com`;

    const guest = await prisma.user.upsert({
      where: { email: guestEmail },
      create: {
        email: guestEmail,
        name: `${address.firstName} ${address.lastName}`,
        role: 'CUSTOMER',
      },
      update: {},
    });

    return guest.id;
  }

  /**
   * Find order by ID with items
   */
  async findById(id: string): Promise<Order> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: {
                  select: { id: true, url: true, altText: true, position: true },
                  orderBy: { position: 'asc' },
                },
              },
            },
            variant: {
              select: {
                id: true,
                name: true,
                options: true,
              },
            },
          },
        },
        customer: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return this.mapToOrderType(order);
  }

  /**
   * Find all orders for a customer
   */
  async findByCustomer(customerId: string, status?: OrderStatus): Promise<Order[]> {
    const where: any = { customerId };

    if (status) {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: {
                  select: { id: true, url: true, altText: true },
                  take: 1,
                },
              },
            },
            variant: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        customer: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders.map(order => this.mapToOrderType(order));
  }

  /**
   * Update order status
   */
  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: {
                  select: { id: true, url: true, altText: true },
                  take: 1,
                },
              },
            },
          },
        },
        customer: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return this.mapToOrderType(order);
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus,
    paymentId?: string,
  ): Promise<Order> {
    const order = await prisma.order.update({
      where: { id },
      data: {
        paymentStatus,
        ...(paymentId && { paymentId }),
        ...(paymentStatus === PaymentStatus.PAID && { status: OrderStatus.CONFIRMED }),
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: {
                  select: { id: true, url: true, altText: true },
                  take: 1,
                },
              },
            },
          },
        },
        customer: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return this.mapToOrderType(order);
  }

  /**
   * Map Prisma order to shared Order type
   */
  private mapToOrderType(order: any): Order {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      customer: order.customer,
      items: order.items.map((item: any) => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        product: item.product,
        variantId: item.variantId,
        variant: item.variant,
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price),
        total: Number(item.total),
      })),
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      total: Number(order.total),
      currency: order.currency,
      status: order.status as OrderStatus,
      paymentStatus: order.paymentStatus as PaymentStatus,
      paymentProvider: order.paymentProvider,
      paymentId: order.paymentId,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      notes: order.notes,
      metadata: order.metadata,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
