import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todo el inventario' })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Obtener stock por producto' })
  findByProduct(@Param('productId') productId: string) {
    return this.inventoryService.findByProduct(productId);
  }

  @Get('location/:locationId')
  @ApiOperation({ summary: 'Obtener stock por ubicación' })
  findByLocation(@Param('locationId') locationId: string) {
    return this.inventoryService.findByLocation(locationId);
  }

  @Post('adjust')
  @ApiOperation({ summary: 'Ajustar stock' })
  adjustStock(@Body() data: { itemId: string; quantity: number }) {
    return this.inventoryService.adjustStock(data.itemId, data.quantity);
  }

  @Post('reserve')
  @ApiOperation({ summary: 'Reservar stock para pedido' })
  reserveStock(@Body() data: { items: Array<{ itemId: string; quantity: number }> }) {
    return this.inventoryService.reserveStock(data.items);
  }

  @Post('release/:orderId')
  @ApiOperation({ summary: 'Liberar reserva de stock' })
  releaseReservation(@Param('orderId') orderId: string) {
    return this.inventoryService.releaseReservation(orderId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear item de inventario' })
  create(@Body() data: any) {
    return this.inventoryService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar item de inventario' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.inventoryService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar item de inventario' })
  delete(@Param('id') id: string) {
    return this.inventoryService.delete(id);
  }
}
