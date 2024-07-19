import OrderEntity from 'Core/Domain/Entities/order.entity';
import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';

export default class OrderRepository implements IOrderRepository {

  findAll(): Promise<OrderEntity[]> {
    throw new Error('Method not implemented.');
  }

  insert(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findQueue(): Promise<OrderEntity[]> {
    throw new Error('Method not implemented.');
  }
}