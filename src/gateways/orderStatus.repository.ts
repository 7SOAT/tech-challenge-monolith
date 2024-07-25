import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import OrderStatusEntity from 'entities/orderStatus.entity';
import { OrderStatusModel } from 'infra/database/models/orderStatus.model';
import { IOrderStatusRepository } from 'interfaces/gateways/orderStatus.gateway';

export class OrderStatusGateway implements IOrderStatusRepository {
  constructor(private _orderRepository: Repository<OrderStatusModel>) { }

  async findAll(): Promise<OrderStatusEntity[]> {
    try {
     const result =await this._orderRepository.find();
     return plainToInstance<OrderStatusEntity, OrderStatusModel>(
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
