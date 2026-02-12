import { Injectable } from '@nestjs/common';
import { PaymentStrategy, PaymentData, PaymentResult, RefundResult, PaymentStatus } from './payment.strategy.interface';

@Injectable()
export class TransbankStrategy implements PaymentStrategy {
  name = 'transbank';

  async processPayment(_data: PaymentData): Promise<PaymentResult> {
    try {
      // Implementación con transbank-sdk
      // const response = await this.webpay.createTransaction(_data);

      return {
        success: true,
        token: 'sample-token',
        paymentUrl: 'https://webpay3gint.transbank.cl/webpayserver/initTransaction',
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
      // Implementación de reembolso con transbank-sdk
      return {
        success: true,
        refundId: 'refund-' + transactionId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async getStatus(_transactionId: string): Promise<PaymentStatus> {
    // Consultar estado de transacción en Transbank
    return PaymentStatus.PENDING;
  }
}
