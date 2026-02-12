import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CollectionsService } from './collections.service';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las colecciones' })
  findAll() {
    return this.collectionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener colección por ID' })
  findById(@Param('id') id: string) {
    return this.collectionsService.findById(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Obtener colección por slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.collectionsService.findBySlug(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva colección' })
  create(@Body() data: any) {
    return this.collectionsService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar colección' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.collectionsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar colección' })
  delete(@Param('id') id: string) {
    return this.collectionsService.delete(id);
  }
}
