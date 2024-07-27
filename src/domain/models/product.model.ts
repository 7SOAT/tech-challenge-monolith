import { randomUUID, UUID } from 'crypto';
import ProductCategory from '@enums/product-category.enum';

export default class ProductModel {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly category: ProductCategory,
    public readonly id: UUID = randomUUID()
  ) {
    this.price = parseFloat(parseFloat(price?.toString()).toFixed(2))
  }
}
