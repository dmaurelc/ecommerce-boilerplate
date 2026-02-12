import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { PaymentData } from './strategies/payment.strategy.interface';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('process/:provider')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Procesar pago' })
  @ApiResponse({ status: 200, description: 'Pago procesado exitosamente' })
  async processPayment(
    @Param('provider') provider: string,
    @Body() data: PaymentData,
  ) {
    return await this.paymentsService.processPayment(provider, data);
  }

  @Post('refund/:provider')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reembolsar pago' })
  @ApiResponse({ status: 200, description: 'Reembolso procesado exitosamente' })
  async refundPayment(
    @Param('provider') provider: string,
    @Body('transactionId') transactionId: string,
    @Body('amount') amount?: number,
  ) {
    return await this.paymentsService.refundPayment(provider, transactionId, amount);
  }

  @Get('status/:provider/:transactionId')
  @ApiOperation({ summary: 'Obtener estado de transacción' })
  @ApiResponse({ status: 200, description: 'Estado de transacción' })
  async getStatus(
    @Param('provider') provider: string,
    @Param('transactionId') transactionId: string,
  ) {
    return await this.paymentsService.getStatus(provider, transactionId);
  }
}
