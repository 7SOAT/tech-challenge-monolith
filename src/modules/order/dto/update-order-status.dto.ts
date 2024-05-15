import { UUID } from 'crypto';
import { OrderStatus } from 'modules/order/enum/order-status.enum';

export class UpdateOrderStatusDto {
  orderId: UUID;

  status: OrderStatus;
}
