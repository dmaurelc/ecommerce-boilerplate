import { Controller, Get, Post, Param, Body, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus, PaymentStatus } from '@ecommerce/shared';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva orden' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente', type: Object })
  @ApiResponse({ status: 400, description: 'Bad Request - Datos inválidos' })
  async create(@Body() data: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener orden por ID' })
  @ApiResponse({ status: 200, description: 'Orden encontrada', type: Object })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  async findById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findById(id);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Obtener órdenes de un cliente' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes', type: [Object] })
  async findByCustomer(
    @Param('customerId') customerId: string,
    @Query('status') status?: OrderStatus,
  ): Promise<Order[]> {
    return this.ordersService.findByCustomer(customerId, status);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar estado de una orden' })
  @ApiResponse({ status: 200, description: 'Estado actualizado', type: Object })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ): Promise<Order> {
    return this.ordersService.updateStatus(id, status);
  }

  @Patch(':id/payment-status')
  @ApiOperation({ summary: 'Actualizar estado de pago de una orden' })
  @ApiResponse({ status: 200, description: 'Estado de pago actualizado', type: Object })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body('paymentStatus') paymentStatus: PaymentStatus,
    @Body('paymentId') paymentId?: string,
  ): Promise<Order> {
    return this.ordersService.updatePaymentStatus(id, paymentStatus, paymentId);
  }
}
