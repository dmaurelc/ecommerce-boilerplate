import { Injectable, BadRequestException } from '@nestjs/common';
import { TransbankStrategy } from './strategies/transbank.strategy';
import { MercadoPagoStrategy } from './strategies/mercadopago.strategy';
import { FlowStrategy } from './strategies/flow.strategy';
import { PaymentStrategy, PaymentData } from './strategies/payment.strategy.interface';

@Injectable()
export class PaymentsService {
  private strategies: Map<string, PaymentStrategy>;

  constructor(
    private transbankStrategy: TransbankStrategy,
    private mercadopagoStrategy: MercadoPagoStrategy,
    private flowStrategy: FlowStrategy,
  ) {
    this.strategies = new Map([
      ['transbank', this.transbankStrategy],
      ['mercadopago', this.mercadopagoStrategy],
      ['flow', this.flowStrategy],
    ]);
  }

  getStrategy(provider: string): PaymentStrategy {
    const strategy = this.strategies.get(provider);
    if (!strategy) {
      throw new BadRequestException(`Proveedor de pago '${provider}' no soportado`);
    }
    return strategy;
  }

  async processPayment(provider: string, data: PaymentData) {
    const strategy = this.getStrategy(provider);
    return await strategy.processPayment(data);
  }

  async refundPayment(provider: string, transactionId: string, amount?: number) {
    const strategy = this.getStrategy(provider);
    return await strategy.refundPayment(transactionId, amount);
  }

  async getStatus(provider: string, transactionId: string) {
    const strategy = this.getStrategy(provider);
    return await strategy.getStatus(transactionId);
  }
}
