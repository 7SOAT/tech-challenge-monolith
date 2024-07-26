import { UUID } from 'crypto';
import { OrderStatusEnum } from 'domain/enums/orderStatus.enum';
import OrderModel from 'domain/models/order.model';

export interface IOrderGateway {
  insert(order: OrderModel): Promise<OrderModel>;
  findAll(): Promise<Array<OrderModel>>;
  findById(id: UUID): Promise<OrderModel>
  updateOrderStatus(id: UUID, status: OrderStatusEnum): Promise<void>
  updateStatusWebhook(orderId: UUID, status: OrderStatusEnum): Promise<void>;
  findQueue(): Promise<Array<OrderModel>>;
}