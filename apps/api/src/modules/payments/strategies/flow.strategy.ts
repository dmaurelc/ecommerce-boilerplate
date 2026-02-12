import { Injectable } from '@nestjs/common';
import { PaymentStrategy, PaymentData, PaymentResult, RefundResult, PaymentStatus } from './payment.strategy.interface';

@Injectable()
export class FlowStrategy implements PaymentStrategy {
  name = 'flow';

  async processPayment(data: PaymentData): Promise<PaymentResult> {
    try {
      // Implementación con Flow API
      // const response = await axios.post(`${this._apiUrl}/payment/create`, {...});

      return {
        success: true,
        paymentUrl: 'https://sandbox.flow.cl/app/payment/null',
        token: 'flow-token-' + data.orderId,
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
      // Implementación de reembolso con Flow API
      return {
        success: true,
        refundId: 'flow-refund-' + transactionId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async getStatus(_transactionId: string): Promise<PaymentStatus> {
    // Consultar estado de transacción en Flow
    return PaymentStatus.PENDING;
  }
}
