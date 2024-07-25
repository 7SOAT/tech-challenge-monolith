import OrderEntity from "Core/Domain/Entities/order.entity";

export interface IMercadoPagoService {
  createOrder(order: OrderEntity): Promise<{qr_data: string}>;
}
