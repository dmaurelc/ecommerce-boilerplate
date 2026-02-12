import { Injectable } from '@nestjs/common';
import { PaymentStrategy, PaymentData, PaymentResult, RefundResult, PaymentStatus } from './payment.strategy.interface';

@Injectable()
export class MercadoPagoStrategy implements PaymentStrategy {
  name = 'mercadopago';

  async processPayment(data: PaymentData): Promise<PaymentResult> {
    try {
      // Implementación con mercadopago SDK
      // const response = await this.mercadoPago.payment.create({...});

      return {
        success: true,
        transactionId: 'mp-' + data.orderId,
        paymentUrl: 'https://www.mercadopago.cl',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async refundPayment(transactionId: string, _amount?: number): Promise<RefundResult> {
    try {
      // Implementación de reembolso con MercadoPago SDK
      return {
        success: true,
        refundId: 'mp-refund-' + transactionId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async getStatus(_transactionId: string): Promise<PaymentStatus> {
    // Consultar estado de transacción en MercadoPago
    return PaymentStatus.PENDING;
  }
}
