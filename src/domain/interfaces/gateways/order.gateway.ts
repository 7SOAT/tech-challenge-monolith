import { UUID } from 'crypto';
import OrderStatusEnum from '@enums/order-status.enum';
import OrderModel from '@entities/order.model';

export default interface IOrderGateway {
  insert(order: OrderModel): Promise<OrderModel>;
  findAll(): Promise<Array<OrderModel>>;
  findById(id: UUID): Promise<OrderModel>
  updateOrderStatus(id: UUID, status: OrderStatusEnum): Promise<number>
  findQueue(): Promise<Array<OrderModel>>;
}