import { Logger, Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigSQL } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'modules/order/order.module';
import { HealthModule } from 'config/health/health.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmConfigSQL,
      inject: [ConfigService],
    }),
    CustomerModule,
    ProductModule,
    OrderModule,
    HealthModule,
    EventEmitterModule.forRoot()
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
