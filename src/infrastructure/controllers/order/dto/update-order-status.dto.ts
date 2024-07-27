import OrderStatusEnum from "domain/enums/orderStatus.enum";
import { UUID } from 'crypto';

export default class UpdateOrderStatusDto {
  orderId: UUID;
  status: OrderStatusEnum;
}
