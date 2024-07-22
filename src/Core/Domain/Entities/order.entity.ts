import { UUID } from 'crypto';
import ProductEntity from './product.entity';
import CustomerEntity from './customer.entity';
import { OrderStatusEnum } from '../Enums/orderStatus.enum';

export default class OrderEntity {
  public readonly id: UUID;
  public readonly totalValue: number;

  constructor(
    public readonly status: OrderStatusEnum,
    public readonly products: ProductEntity[],
    public readonly customer: CustomerEntity = null
  ) {
    this.totalValue = products?.reduce((a, b) => a + b.price, 0);
  }
}
