import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<Array<Order>> {
    try {
      return await this.orderRepository.find();      
    } catch (error) {
      this.logger.error(`[Order Service find all]: ${error.message}`);
    }
  }

  async create(createOrderDto: CreateOrderDto): Promise<CreateOrderDto> {
    try {
      return await this.orderRepository.save(createOrderDto);
    } catch (error) {
      this.logger.error(`[Order Service create]: ${error.message}`);
      
    }

  }
}
