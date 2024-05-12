import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'modules/order/entities/order.entity';
import { Repository } from 'typeorm';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderEventService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly logger: Logger
  ) {}

  @OnEvent('order.status-update', { async: true  })
  async onOrderStatusUpdate({ orderId, status }: UpdateOrderStatusDto) {
    try {
      const order = await this.orderRepository.findOneByOrFail({
        id: orderId,
      });
      order.orderStatus = status;

      await this.orderRepository.save(order);
    } catch (error) {
      this.logger.error(`[Order Service update status order]: ${error}`);
    }
  }
}
