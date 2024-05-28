import { UUID } from "crypto";
import { OrderStatus } from "../Enums/orderStatus.enum";
import ProductEntity from "./product.entity";
import { Customer } from "Adapters/Driver/WebAPI/modules/customer/entities/customer.entity";

export default class OrderEntity {
  private _id: UUID;
  private _orderStatus: OrderStatus;
  private _totalValue: number;
  private _customer: Customer;
  private _products: ProductEntity[];


  constructor(
    orderStatus: OrderStatus,
    totalValue: number,
    //customer: Customer,
    products: ProductEntity[]
  ) {
    this._orderStatus = orderStatus;
    this._totalValue = totalValue;
    //this._customer = customer;
    this._products = products;

    this.validate();
  }

  public get id(): UUID {
    return this._id;
  }

  public get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  public get totalValue(): number {
    return this._totalValue;
  }

  public get customer(): Customer {
    return this._customer;
  }

  public get products(): ProductEntity[] {
    return this._products;
  }

  validate() {}
}
