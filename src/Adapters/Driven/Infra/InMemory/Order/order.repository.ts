import OrderEntity from 'Core/Domain/Entities/order.entity';
import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';

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

  insert(order: OrderEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  updateStatusWebhook(orderId: string, status: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
}
