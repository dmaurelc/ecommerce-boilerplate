import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@ecommerce/shared';

@Injectable()
export class CustomersService {
  async findAll(_params?: any): Promise<User[]> {
    // TODO: Implementar con Prisma
    return [];
  }

  async findById(_id: string): Promise<User> {
    // TODO: Implementar con Prisma
    throw new NotFoundException('Customer not found');
  }

  async findByEmail(_email: string): Promise<User> {
    // TODO: Implementar con Prisma
    throw new NotFoundException('Customer not found');
  }

  async create(_data: any): Promise<User> {
    // TODO: Implementar con Prisma
    return {} as User;
  }

  async update(_id: string, _data: any): Promise<User> {
    // TODO: Implementar con Prisma
    return {} as User;
  }

  async delete(_id: string): Promise<void> {
    // TODO: Implementar con Prisma
  }
}
