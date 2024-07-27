import OrderStatusModel from "@entities/order-status.model";

export default interface IOrderStatusGateway {
  insert(orderStatus: OrderStatusModel): Promise<void>;
  findAll(): Promise<OrderStatusModel[]>;
}

