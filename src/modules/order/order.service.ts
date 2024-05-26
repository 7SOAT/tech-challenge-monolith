import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OrderStatus } from './enum/order-status.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Product } from 'modules/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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
      const { customerId, productId, description } = createOrderDto;
      const products = [];
      for (const id of productId) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (product === null) {
          this.logger.log(`[OrderService] Product not found: ${id}`);
        }
        products.push(product);
      }

      const totalValueOrder: number = products
        .map((product) => Number(product.price))
        .reduce((a, b) => a + b, 0);

      const orderResult = await this.orderRepository.save({
        products: products,
        totalValue: totalValueOrder,
        description: description,
      });

      this.eventEmitter.emit('order.status-update', {
        orderId: orderResult.id,
        status: OrderStatus.IN_PROGRESS,
      });

      this.logger.log(`[OrderService] Order ${orderResult.id} in progress`);

      this.eventEmitter.emit('order.status-update', {
        orderId: orderResult.id,
        status: OrderStatus.COMPLETED,
      });

      this.logger.log(`[OrderService] Order ${orderResult.id} in completed`);

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
}
