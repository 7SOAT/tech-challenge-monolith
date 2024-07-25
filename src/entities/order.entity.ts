import { randomUUID, UUID } from 'crypto';
import ProductEntity from './product.entity';
import CustomerEntity from './customer.entity';
import { OrderStatusEnum } from '../enums/orderStatus.enum';

export default class OrderEntity {
  public readonly totalValue: number;

  constructor(
    public readonly status: OrderStatusEnum,
    public readonly products: ProductEntity[],
    public readonly customer: CustomerEntity = null,
    public readonly orderNumber: number = null,
    public readonly id: UUID = randomUUID()
  ) {
    this.totalValue = parseFloat(products?.reduce<number>((a, b) => a + parseFloat(b.price.toString()), 0).toFixed(2));
  }
}
