import OrderEntity from '../Entities/order.entity';
import { OrderStatus } from '../Enums/orderStatus.enum';

export interface IOrderRepository {
  insert(order: OrderEntity): Promise<void>;
  findAll(): Promise<Array<OrderEntity>>;
  updateStatusWebhook(orderId: string, status: OrderStatus): Promise<void>;
  findQueue(): Promise<Array<OrderEntity>>;
}

