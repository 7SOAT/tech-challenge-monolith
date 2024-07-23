import { randomUUID, UUID } from 'crypto';
import { ProductCategory } from '../Enums/productCategory.enum';

export default class ProductEntity {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly category: ProductCategory,
    public readonly id: UUID = null
  ) {
    id = id ?? randomUUID()
  }
}
