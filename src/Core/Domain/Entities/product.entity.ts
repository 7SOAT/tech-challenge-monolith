import { UUID } from 'crypto';
import { ProductCategory } from '../Enums/productCategory.enum';

export default class ProductEntity {
  private id: UUID;
  private name: string;
  private description: string;
  private price: number;
  private category: ProductCategory;

  constructor(
    name: string,
    description: string,
    price: number,
    category: ProductCategory
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;

    this.validate();
  }

  public get getId(): UUID {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getDescription(): string {
    return this.description;
  }

  public get getPrice(): number {
    return this.price;
  }

  public get getCategory(): ProductCategory {
    return this.category;
  }

  validate() {}
}
