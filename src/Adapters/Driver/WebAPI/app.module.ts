import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { TypeOrmConfigSQL } from "./config/typeorm.config";

import { HealthModule } from "./config/health/health.module";
import { CommonModule } from "./modules/common/common.module";
import { CustomerModule } from "./modules/customer/customer.module";
import { ProductModule } from "./modules/product/product.module";
import { OrderModule } from "./modules/order/order.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmConfigSQL,
    }),
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
