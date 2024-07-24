import { Repository } from 'typeorm';
import { IOrderStatusRepository } from 'Core/Domain/Repositories/orderStatus.repository';
import { OrderStatusTypeOrmEntity } from '../Entities/orderStatus.typeorm.entity';

export class OrderStatusTypeOrmRepository implements IOrderStatusRepository {
  constructor(private _orderRepository: Repository<OrderStatusTypeOrmEntity>) { }

  async findAll(): Promise<OrderStatusTypeOrmEntity[]> {
    try {
      return await this._orderRepository.find();
    } catch (error) {
      throw new Error(`Error searching order status: ${error}`);
    }
  }

  async insert(orderStatus: OrderStatusTypeOrmEntity): Promise<void> {
    try {
      await this._orderRepository.insert(orderStatus);
    } catch (error) {
      throw new Error(`Error inserting order status: ${error}`);
    }
  }
}
