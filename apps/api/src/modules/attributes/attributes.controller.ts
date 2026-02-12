import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AttributesService } from './attributes.service';

@ApiTags('attributes')
@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los atributos' })
  findAll() {
    return this.attributesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener atributo por ID' })
  findById(@Param('id') id: string) {
    return this.attributesService.findById(id);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Obtener atributos por producto' })
  findByProduct(@Param('productId') productId: string) {
    return this.attributesService.findByProduct(productId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nuevo atributo' })
  create(@Body() data: any) {
    return this.attributesService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar atributo' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.attributesService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar atributo' })
  delete(@Param('id') id: string) {
    return this.attributesService.delete(id);
  }
}
