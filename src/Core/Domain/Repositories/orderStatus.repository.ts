import { OrderStatusTypeOrmEntity } from 'Adapters/Driven/Entities/orderStatus.typeorm.entity';

export interface IOrderStatusRepository {
  insert(orderStatus: OrderStatusTypeOrmEntity): Promise<void>;
  findAll(): Promise<OrderStatusTypeOrmEntity[]>;
}

