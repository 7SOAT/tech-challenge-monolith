import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TypeOrmConfigSQL } from "./config/typeorm.config";
import { ProductModule } from "./modules/product/product.module";
import { CustomerModule } from "./modules/customer/customer.module";
import { OrderModule } from "./modules/order/order.module";
import { HealthModule } from "./config/health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmConfigSQL,
    }),
    ProductModule,
    CustomerModule,
    OrderModule,
    HealthModule,
  ],
  controllers: [],
})
export class AppModule {}
