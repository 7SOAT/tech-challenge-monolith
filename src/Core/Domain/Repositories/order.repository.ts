import { UUID } from 'crypto';
import OrderEntity from '../Entities/order.entity';

export interface IOrderRepository {
  insert(order: OrderEntity): Promise<void>;
  findAll(): Promise<Array<OrderEntity>>;
}

