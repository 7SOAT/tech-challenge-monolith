import { UUID } from "crypto";
import { ProductCategory } from "../Enums/productCategory.enum";

export default class ProductEntity {
  private _id: UUID;
  private _name: string;
  private _description: string;
  private _price: number;
  private _productCategory: ProductCategory;

  constructor(
    name: string,
    description: string,
    price: number,
    productCategory: ProductCategory
  ) {
    this._name = name;
    this._description = description;
    this._price = price;
    this._productCategory = productCategory;

    this.validate();
  }

  public get id(): UUID {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get price(): number {
    return this._price;
  }

  public get productCategory(): ProductCategory {
    return this._productCategory;
  }

  validate() {}
}
