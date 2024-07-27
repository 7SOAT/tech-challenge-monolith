import OrderStatusEnum from "core/enums/order-status.enum";
import { UUID } from 'crypto';

export default class UpdateOrderStatusDto {
  orderId: UUID;
  status: OrderStatusEnum;
}
