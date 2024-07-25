import { OrderStatusEnum } from "enums/orderStatus.enum";
import { UUID } from 'crypto';

export class UpdateOrderStatusDto {
  orderId: UUID;
  status: OrderStatusEnum;
}
