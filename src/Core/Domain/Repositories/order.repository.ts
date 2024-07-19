import OrderEntity from '../Entities/order.entity';
import { OrderStatusEnum } from '../Enums/orderStatus.enum';

export interface IOrderRepository {
  insert(order: OrderEntity): Promise<void>;
  findAll(): Promise<Array<OrderEntity>>;
  updateStatusWebhook(orderId: string, status: OrderStatusEnum): Promise<void>;
  findQueue(): Promise<Array<OrderEntity>>;
}

