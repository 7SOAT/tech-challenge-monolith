import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { plainToClass } from 'class-transformer';
import { OrderStatus } from './enum/order-status.enum';

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
      this.logger.error(`[Order Service find all]: ${error.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async create(createOrderDto: CreateOrderDto): Promise<CreateOrderDto> {
    try {
      const order = plainToClass(Order, createOrderDto);
      const result = await this.orderRepository.save(order);
      this.eventEmitter.emit('order.status-update', {
        orderId: result.id,
        status: OrderStatus.IN_PROGRESS,
      });

      return createOrderDto;
    } catch (error) {
      this.logger.error(`[Order Service create]: ${error}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
