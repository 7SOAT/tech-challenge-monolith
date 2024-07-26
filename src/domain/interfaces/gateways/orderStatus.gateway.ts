import OrderStatusModel from "domain/models/orderStatus.model";

export interface IOrderStatusRepository {
  insert(orderStatus: OrderStatusModel): Promise<void>;
  findAll(): Promise<OrderStatusModel[]>;
}

