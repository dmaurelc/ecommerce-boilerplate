import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CouponsService } from './coupons.service';

@ApiTags('coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cupones' })
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':code')
  @ApiOperation({ summary: 'Obtener cupón por código' })
  findByCode(@Param('code') code: string) {
    return this.couponsService.findByCode(code);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validar cupón' })
  validate(@Body() data: { code: string; cartTotal: number }) {
    return this.couponsService.validate(data.code, data.cartTotal);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nuevo cupón' })
  create(@Body() data: any) {
    return this.couponsService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar cupón' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.couponsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar cupón' })
  delete(@Param('id') id: string) {
    return this.couponsService.delete(id);
  }
}
