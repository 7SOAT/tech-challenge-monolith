import { UUID } from "crypto";
import { OrderStatus } from "../Enums/orderStatus.enum";
import ProductEntity from "./product.entity";
import { Customer } from "Adapters/Driver/WebAPI/modules/customer/entities/customer.entity";

export default class OrderEntity {
  private id: UUID;
  private orderStatus: OrderStatus;
  private totalValue: number;
  private customer: Customer;
  private products: ProductEntity[];


  constructor(
    orderStatus: OrderStatus,
    totalValue: number,
    //customer: Customer,
    products: ProductEntity[]
  ) {
    this.orderStatus = orderStatus;
    this.totalValue = totalValue;
    //this._customer = customer;
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

  public get getCustomer(): Customer {
    return this.customer;
  }

  public get getProducts(): ProductEntity[] {
    return this.products;
  }

  validate() {}
}
