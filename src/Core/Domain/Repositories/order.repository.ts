import OrderEntity from '../Entities/order.entity';

export interface IOrderRepository {
  insert(order: OrderEntity): Promise<void>;
  findAll(): Promise<Array<OrderEntity>>;
  findQueue(): Promise<Array<OrderEntity>>;
}

