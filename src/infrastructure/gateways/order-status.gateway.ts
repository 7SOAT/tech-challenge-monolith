import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import OrderStatusModel from '@entities/order-status.model';
import IOrderStatusGateway from '@interfaces/gateways/order-status.gateway';
import OrderStatusEntity  from 'infrastructure/entities/order-status.entity';
import { InjectRepository } from '@nestjs/typeorm';

export default class OrderStatusGateway implements IOrderStatusGateway {
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
