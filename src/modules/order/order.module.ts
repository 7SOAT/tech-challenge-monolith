import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { OrderEventModule } from 'event/order/order-event.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderEventModule],
  controllers: [OrderController],
  providers: [OrderService, Logger],
})
export class OrderModule {}
