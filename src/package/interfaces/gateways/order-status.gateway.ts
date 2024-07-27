import OrderStatusEntity from "core/entities/order-status.entity";

export default interface IOrderStatusGateway {
  insert(orderStatus: OrderStatusEntity): Promise<void>;
  findAll(): Promise<OrderStatusEntity[]>;
}

