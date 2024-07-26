import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import OrderStatusModel from 'domain/models/orderStatus.model';
import { IOrderStatusRepository } from 'domain/interfaces/gateways/orderStatus.gateway';
import { OrderStatusEntity } from 'infrastructure/entities/orderStatus.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class OrderStatusGateway implements IOrderStatusRepository {
  constructor(
    @InjectRepository(OrderStatusEntity)
    private _orderRepository: Repository<OrderStatusEntity>
  ) { }

  async findAll(): Promise<OrderStatusModel[]> {
    try {
     const result: OrderStatusEntity[] = await this._orderRepository.find();
     return plainToInstance<OrderStatusModel, OrderStatusEntity>(
      OrderStatusModel,
      result,
      { enableImplicitConversion: true }
    )
    } catch (error) {
      throw new Error(`Error searching order status: ${error}`);
    }
  }

  async insert(orderStatus: OrderStatusModel): Promise<void> {
    try {
      const orderStatusEntity = plainToInstance<OrderStatusEntity, OrderStatusModel>(
        OrderStatusEntity,
        orderStatus,
        { enableImplicitConversion: true });
      
      await this._orderRepository.insert(orderStatusEntity);
      
    } catch (error) {
      throw new Error(`Error inserting order status: ${error}`);
    }
  }
}
