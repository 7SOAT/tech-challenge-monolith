import { UUID } from 'crypto';
import OrderEntity from '../Entities/order.entity';
import { OrderStatusEnum } from '../Enums/orderStatus.enum';

export interface IOrderRepository {
  insert(order: OrderEntity): Promise<OrderEntity>;
  findAll(): Promise<Array<OrderEntity>>;
  findById(id: UUID): Promise<OrderEntity>
  updateOrderStatus(id: UUID, status: OrderStatusEnum): Promise<void>
  updateStatusWebhook(orderId: UUID, status: OrderStatusEnum): Promise<void>;
  findQueue(): Promise<Array<OrderEntity>>;
}