import { randomUUID, UUID } from 'crypto';
import { ProductCategory } from 'domain/enums/productCategory.enum';

export default class ProductModel {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly category: ProductCategory,
    public readonly id: UUID = null
  ) {
    this.price = parseFloat(parseFloat(price?.toString()).toFixed(2))
    this.id = id ?? randomUUID()
  }
}
