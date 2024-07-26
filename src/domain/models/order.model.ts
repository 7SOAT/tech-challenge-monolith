import { randomUUID, UUID } from 'crypto';
import ProductModel from './product.model';
import CustomerModel from './customer.model';
import { OrderStatusEnum } from 'domain/enums/orderStatus.enum';

export default class OrderModel {
  public readonly totalValue: number;

  constructor(
    public readonly status: OrderStatusEnum,
    public readonly products: ProductModel[],
    public readonly customer: CustomerModel = null,
    public readonly orderNumber: number = null,
    public readonly id: UUID = randomUUID()
  ) {
    this.totalValue = parseFloat(products?.reduce<number>((a, b) => a + parseFloat(b.price.toString()), 0).toFixed(2));
  }
}
