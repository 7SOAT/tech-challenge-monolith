import { Logger, Module } from '@nestjs/common';
import { OrderEventService } from './order-event.service';
import { Order } from 'modules/order/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [Logger, OrderEventService],
})
export class OrderEventModule {}
