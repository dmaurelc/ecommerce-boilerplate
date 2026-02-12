import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear orden' })
  create(@Body() data: any) {
    return this.ordersService.create(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener orden por ID' })
  findById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Obtener órdenes de cliente' })
  findByCustomer(@Param('customerId') customerId: string) {
    return this.ordersService.findByCustomer(customerId);
  }
}
