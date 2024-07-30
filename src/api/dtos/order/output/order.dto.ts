
import OrderCustomerDto from '@api/dtos/customer/output/order-customer.dto';
import OrderStatusDto from '@api/dtos/order-status/output/order-status.dto';
import OrderProductDto from '@api/dtos/product/output/order-product.dto';
import { ICreatePaymentOutput } from '@type/output/payment.output';
import { UUID } from 'crypto';

export default class OrderDto {
  constructor(
    public id: UUID,
    public totalValue: number,
    public products: OrderProductDto[],
    public customer: OrderCustomerDto | null,
    public orderStatus: OrderStatusDto,
    public orderNumber: number,
    public payment: ICreatePaymentOutput,
  ) {}
}
