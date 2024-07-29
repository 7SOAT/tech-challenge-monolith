import OrderStatusEnum from '@enums/order-status.enum';
import { UUID } from 'crypto';

export interface ICheckoutOrderInput {
  customerId: UUID;
  productIds: Array<UUID>;
}

export interface IUpdateOrderInput {
  status: OrderStatusEnum
}
