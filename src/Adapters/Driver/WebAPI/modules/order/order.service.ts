import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { plainToClass } from 'class-transformer';
import { OrderStatus } from './enum/order-status.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { CheckoutOrderDto } from './dto/checkout-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: Logger
  ) {}

  async findAll(): Promise<Array<Order>> {
    try {
      return await this.orderRepository.find();
    } catch (error) {
      this.logger.error(`[OrderService] Error retrieving orders: ${error}`);
    }
  }

  async create(createOrderDto: CreateOrderDto): Promise<CreateOrderDto> {
    try {
      const order: Order = plainToClass(Order, createOrderDto);
      const result: Order = await this.orderRepository.save(order);
      this.eventEmitter.emit('order.status-update', {
        orderId: result.id,
        status: OrderStatus.IN_PROGRESS,
      });

      return createOrderDto;
    } catch (error) {
      this.logger.error(`[OrderService] Error creating order: ${error}`);
    }
  }

  @OnEvent('order.status-update', { async: true })
  async updateStatus({
    orderId,
    status,
  }: UpdateOrderStatusDto): Promise<Order> {
    try {
      const order = await this.orderRepository.findOneByOrFail({ id: orderId });
      order.orderStatus = status;
      const result = await this.orderRepository.save(order);
      return result;
    } catch (error) {
      this.logger.error(`[OrderService] Error updating order status: ${error}`);
    }
  }
  async checkout(checkoutOrderDto: CheckoutOrderDto): Promise<{ orderId: string }> {
    const { orderId } = checkoutOrderDto;
    
    try {
      const order = await this.orderRepository.findOneByOrFail({ id: orderId });

      if (!order) {
        throw new Error('Order not found');
      }

      order.orderStatus = OrderStatus.CHECKED_OUT;
      await this.orderRepository.save(order);

      return { orderId: order.id };
    } catch (error) {
      this.logger.error(`Error checking out order: ${error}`);
      throw error;
    }
  }
}
