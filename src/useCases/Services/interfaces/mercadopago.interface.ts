import OrderEntity from "entities/order.entity";

export interface IMercadoPagoService {
  createOrder(order: OrderEntity): Promise<{qr_data: string}>;
}
