import { OrderStatus } from "Core/Domain/Enums/orderStatus.enum";
import { UUID } from "crypto";

export class UpdateOrderStatusDto {
  orderId: UUID;
  status: OrderStatus;
}
