import OrderStatusModel from "domain/models/orderStatus.model";

export default interface IOrderStatusRepository {
  insert(orderStatus: OrderStatusModel): Promise<void>;
  findAll(): Promise<OrderStatusModel[]>;
}

