import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import OrderStatusEntity from 'core/entities/order-status.entity';
import IOrderStatusGateway from '@interfaces/gateways/order-status.gateway';
import OrderStatusModel  from '@models/order-status.model';
import { InjectRepository } from '@nestjs/typeorm';

export default class OrderStatusGateway implements IOrderStatusGateway {
  constructor(
    @InjectRepository(OrderStatusModel)
    private _orderRepository: Repository<OrderStatusModel>
  ) { }

  async findAll(): Promise<OrderStatusEntity[]> {
    try {
     const result: OrderStatusModel[] = await this._orderRepository.find();
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
      const orderStatusModel = plainToInstance<OrderStatusModel, OrderStatusEntity>(
        OrderStatusModel,
        orderStatus,
        { enableImplicitConversion: true });
      
      await this._orderRepository.insert(orderStatusModel);
      
    } catch (error) {
      throw new Error(`Error inserting order status: ${error}`);
    }
  }
}
