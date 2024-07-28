import OrderStatusEnum from '@enums/order-status.enum';
import { UUID } from 'crypto';

export interface ICreateOrderInput {
  customerId: UUID;
  productIds: Array<UUID>;
}

export interface ICheckoutOrderInput {
  id: number;
  topic: string;
}

export interface IUpdateOrderInput {
  status: OrderStatusEnum
}
