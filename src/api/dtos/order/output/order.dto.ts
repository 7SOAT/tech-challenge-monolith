import { IOrderCustomerOutput } from '@type/output/customer.output';
import { IOrderStatusOutput } from '@type/output/order-status.output';
import IOrderOutput from '@type/output/order.output';
import { IOrderProductOutput } from '@type/output/product.output';
import { UUID } from 'crypto';

export default class OrderDto implements IOrderOutput {
  constructor(
    public id: UUID,
    public totalValue: number,
    public products: IOrderProductOutput[],
    public customer: IOrderCustomerOutput | null,
    public orderStatus: IOrderStatusOutput,
    public orderNumber: number
  ) {}
}
