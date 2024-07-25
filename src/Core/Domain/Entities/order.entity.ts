import { randomUUID, UUID } from 'crypto';
import ProductEntity from './product.entity';
import CustomerEntity from './customer.entity';
import { OrderStatusEnum } from '../Enums/orderStatus.enum';

export default class OrderEntity {
  public readonly id: UUID;
  public readonly totalValue: number;

  constructor(
    public readonly status: OrderStatusEnum,
    public readonly products: ProductEntity[],
    public readonly customer: CustomerEntity = null,
    public readonly orderNumber: number = null
  ) {
    this.id = randomUUID();
    this.totalValue = parseFloat(products?.reduce<number>((a, b) => a + b.price, 0).toFixed(2));
  }
}
