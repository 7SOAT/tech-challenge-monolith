import { OrderTypeOrmEntity } from 'Adapters/Driven/Entities/order.typeorm.entity';
import OrderEntity from '../Entities/order.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { OrderStatusEnum } from '../Enums/orderStatus.enum';

export interface IOrderRepository {
  insert(order: OrderEntity): Promise<OrderTypeOrmEntity>;
  findAll(): Promise<Array<OrderEntity>>;
  findById(id: UUID): Promise<OrderTypeOrmEntity>
  updateOrderStatus(id: UUID, status: OrderStatusEnum): Promise<void>
  updateStatusWebhook(orderId: string, status: OrderStatusEnum): Promise<void>;
  findQueue(): Promise<Array<OrderEntity>>;
}

