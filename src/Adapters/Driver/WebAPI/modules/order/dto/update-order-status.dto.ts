import { UUID } from "crypto";
import { OrderStatus } from "../enum/order-status.enum";

export class UpdateOrderStatusDto {
  orderId: UUID;

  status: OrderStatus;
}
