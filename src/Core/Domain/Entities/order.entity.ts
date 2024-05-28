import { UUID } from 'crypto';
import { OrderStatus } from '../Enums/orderStatus.enum';
import ProductEntity from './product.entity';
import CustomerEntity from './customer.entity';

export default class OrderEntity {
  private id: UUID;
  private orderStatus: OrderStatus;
  private totalValue: number;
  private customer: CustomerEntity;
  private products: ProductEntity[];

  constructor(
    orderStatus: OrderStatus,
    totalValue: number,
    customer: CustomerEntity,
    products: ProductEntity[]
  ) {
    this.orderStatus = orderStatus;
    this.totalValue = totalValue;
    this.customer = customer;
    this.products = products;

    this.validate();
  }

  public get getId(): UUID {
    return this.id;
  }

  public get getOrderStatus(): OrderStatus {
    return this.orderStatus;
  }

  public get getTotalValue(): number {
    return this.totalValue;
  }

  public get getCustomer(): CustomerEntity {
    return this.customer;
  }

  public get getProducts(): ProductEntity[] {
    return this.products;
  }

  validate() {}
}
