import OrderStatusEntity from '../../Entities/orderStatus.entity';

export interface IOrderStatusRepository {
  insert(orderStatus: OrderStatusEntity): Promise<void>;
  findAll(): Promise<OrderStatusEntity[]>;
}

