import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CustomersService } from './customers.service';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener cliente por ID' })
  findById(@Param('id') id: string) {
    return this.customersService.findById(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Buscar cliente por email' })
  findByEmail(@Param('email') email: string) {
    return this.customersService.findByEmail(email);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nuevo cliente' })
  create(@Body() data: any) {
    return this.customersService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar cliente' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.customersService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar cliente' })
  delete(@Param('id') id: string) {
    return this.customersService.delete(id);
  }
}
