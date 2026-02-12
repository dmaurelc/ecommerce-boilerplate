import { Injectable } from '@nestjs/common';
import { Order } from '@ecommerce/shared';

@Injectable()
export class OrdersService {
  async create(_data: any): Promise<Order> {
    // TODO: Implementar con Prisma
    return {} as Order;
  }

  async findById(_id: string): Promise<Order> {
    // TODO: Implementar con Prisma
    return {} as Order;
  }

  async findByCustomer(_customerId: string): Promise<Order[]> {
    // TODO: Implementar con Prisma
    return [];
  }
}
