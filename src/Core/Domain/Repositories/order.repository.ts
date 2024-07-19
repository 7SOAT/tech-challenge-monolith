import { OrderTypeOrmEntity } from 'Adapters/Driven/Infra/TypeORM/Entities/order.typeorm.entity';
import OrderEntity from '../Entities/order.entity';
import { OrderStatus } from '../Enums/orderStatus.enum';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export interface IOrderRepository {
  insert(order: OrderEntity): Promise<void>;
  findAll(): Promise<Array<OrderEntity>>;
  findById(id: UUID): Promise<OrderTypeOrmEntity>
  updateOrderStatus(id: UUID, status: OrderStatus): Promise<void>
}

