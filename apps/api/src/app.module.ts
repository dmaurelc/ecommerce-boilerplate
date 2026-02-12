import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { CustomersModule } from './modules/customers/customers.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { AttributesModule } from './modules/attributes/attributes.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { StatsModule } from './modules/stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    AuthModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    CustomersModule,
    CouponsModule,
    WebhooksModule,
    InventoryModule,
    CollectionsModule,
    AttributesModule,
    AnalyticsModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
