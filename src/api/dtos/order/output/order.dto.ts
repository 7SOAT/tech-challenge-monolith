import { IOrderCustomerOutput } from '@type/output/customer.output';
import { IOrderStatusOutput } from '@type/output/order-status.output';
import IOrderOutput from '@type/output/order.output';
import { ICreatePaymentOutput } from '@type/output/payment.output';
import { IOrderProductOutput } from '@type/output/product.output';
import { UUID } from 'crypto';

export default class OrderDto implements IOrderOutput {
  constructor(
    public id: UUID,
    public totalValue: number,
    public orderNumber: number,
    public orderStatus: IOrderStatusOutput,
    public payment: ICreatePaymentOutput,
    public products: IOrderProductOutput[],
    public customer: IOrderCustomerOutput | null,
  ) {}
}
