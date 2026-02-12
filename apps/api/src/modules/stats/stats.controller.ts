import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StatsService } from './stats.service';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('realtime')
  @ApiOperation({ summary: 'Estadísticas en tiempo real' })
  getRealTimeStats() {
    return this.statsService.getRealTimeStats();
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Métricas del dashboard' })
  getDashboardMetrics() {
    return this.statsService.getDashboardMetrics();
  }

  @Post('metrics/update')
  @ApiOperation({ summary: 'Actualizar métricas' })
  updateMetrics() {
    return this.statsService.updateMetrics();
  }
}
