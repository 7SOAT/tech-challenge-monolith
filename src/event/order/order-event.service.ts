import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'modules/order/entities/order.entity';
import { OrderStatus } from 'modules/order/enum/order-status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class OrderEventService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly logger: Logger) { }

  @OnEvent('order.created')
  async onOrderCreated(createOrderDto: any) {
    try {
      const order = await this.orderRepository.findOneByOrFail({ id: createOrderDto.id });
      order.orderStatus = OrderStatus.IN_PROGRESS;

      await this.orderRepository.save(order);
    } catch (error) {
      this.logger.error(`[Order Service update status order]: ${error}`);
    }
  }
}
