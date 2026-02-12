import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TransbankStrategy } from './strategies/transbank.strategy';
import { MercadoPagoStrategy } from './strategies/mercadopago.strategy';
import { FlowStrategy } from './strategies/flow.strategy';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    TransbankStrategy,
    MercadoPagoStrategy,
    FlowStrategy,
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
