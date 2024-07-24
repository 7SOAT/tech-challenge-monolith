import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigSQL } from "./config/typeorm.config";
import { ProductModule } from "./modules/product/product.module";
import { CustomerModule } from "./modules/customer/customer.module";
import { OrderModule } from "./modules/order/order.module";
import { HealthModule } from "./config/health/health.module";
import { WebhookModule } from "./modules/webhook/webhook.module";
import { HttpModule } from "@nestjs/axios";
import { ProvidersModule } from "Adapters/Driven/Providers/providers.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmConfigSQL,
    }),
    HttpModule,
    ProvidersModule,
    HealthModule,
    ProductModule,
    CustomerModule,
    OrderModule,
    WebhookModule,
  ],
  controllers: [],
})
export class AppModule {}
