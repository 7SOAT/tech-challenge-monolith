import { Logger, Module } from "@nestjs/common";
import { CustomerModule } from "./modules/customer/customer.module";
import { ProductModule } from "./modules/product/product.module";
import { ConfigModule } from "@nestjs/config";
import { OrderModule } from "./modules/order/order.module";
import { HealthModule } from "./config/health/health.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { CommonModule } from "./modules/common/common.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigSQL } from "./config/typeorm.config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmConfigSQL,
    }),
    CustomerModule,
    ProductModule,
    OrderModule,
    HealthModule,
    EventEmitterModule.forRoot(),
    CommonModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
