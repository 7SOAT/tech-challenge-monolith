import { Repository } from 'typeorm';
import { IOrderStatusRepository } from 'Core/Domain/Repositories/orderStatus.repository';
import { OrderStatusTypeOrmEntity } from '../Entities/orderStatus.typeorm.entity';
import OrderStatusEntity from 'Core/Domain/Entities/orderStatus.entity';
import { plainToInstance } from 'class-transformer';

export class OrderStatusTypeOrmRepository implements IOrderStatusRepository {
  constructor(private _orderRepository: Repository<OrderStatusTypeOrmEntity>) { }

  async findAll(): Promise<OrderStatusEntity[]> {
    try {
     const result =await this._orderRepository.find();
     return plainToInstance<OrderStatusEntity, OrderStatusTypeOrmEntity>(
      OrderStatusEntity,
      result,
      { enableImplicitConversion: true }
    )
    } catch (error) {
      throw new Error(`Error searching order status: ${error}`);
    }
  }

  async insert(orderStatus: OrderStatusEntity): Promise<void> {
    try {
      await this._orderRepository.insert(orderStatus);
    } catch (error) {
      throw new Error(`Error inserting order status: ${error}`);
    }
  }
}
