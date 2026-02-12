import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('sales')
  @ApiOperation({ summary: 'Reporte de ventas' })
  getSalesReport(@Query() params: any) {
    return this.analyticsService.getSalesReport(params);
  }

  @Get('traffic')
  @ApiOperation({ summary: 'Reporte de tráfico' })
  getTrafficReport(@Query() params: any) {
    return this.analyticsService.getTrafficReport(params);
  }

  @Get('orders/stats')
  @ApiOperation({ summary: 'Estadísticas de pedidos' })
  getOrdersStats(@Query() params: any) {
    return this.analyticsService.getOrdersStats(params);
  }

  @Get('products/stats')
  @ApiOperation({ summary: 'Estadísticas de productos' })
  getProductsStats(@Query() params: any) {
    return this.analyticsService.getProductsStats(params);
  }

  @Get('customers/stats')
  @ApiOperation({ summary: 'Estadísticas de clientes' })
  getCustomersStats(@Query() params: any) {
    return this.analyticsService.getCustomersStats(params);
  }
}
