import { OrderStatusTypeOrmEntity } from 'Adapters/Driven/Infra/Database/Entities/orderStatus.typeorm.entity';

export interface IOrderStatusRepository {
  insert(orderStatus: OrderStatusTypeOrmEntity): Promise<void>;
  findAll(): Promise<OrderStatusTypeOrmEntity[]>;
}

