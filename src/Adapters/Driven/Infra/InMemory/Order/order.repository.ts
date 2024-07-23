import OrderEntity from 'Core/Domain/Entities/order.entity';
import { OrderStatusEnum } from 'Core/Domain/Enums/orderStatus.enum';
import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { OrderTypeOrmEntity } from '../../Database/Entities/order.typeorm.entity';

export default class OrderRepository implements IOrderRepository {
  private _orders: Array<OrderEntity>;
  constructor() {
    this._orders = new Array<OrderEntity>();
  }
  findAll(): Promise<OrderEntity[]> {
    throw new Error('Method not implemented.');
  }

  findQueue(): Promise<OrderEntity[]> {
    throw new Error('Method not implemented.');
  }

  insert(order: OrderEntity): Promise<OrderTypeOrmEntity> {
    throw new Error('Method not implemented.');
  }

  updateStatusWebhook(orderId: string, status: OrderStatusEnum): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
}
