import ProductEntity from "Core/Domain/Entities/product.entity";
import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";

export default class ProductInMemoryRepository implements IProductRepository {
  private _products: Array<ProductEntity>;
  constructor() {
    this._products = new Array<ProductEntity>();
  }
  findOneById(id: string): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }
  findByCategory(category: ProductCategory): Promise<ProductEntity[]> {
    throw new Error("Method not implemented.");
  }
  update(id: string, product: ProductEntity): void {
    throw new Error("Method not implemented.");
  }
  delete(id: string): void {
    throw new Error("Method not implemented.");
  }

  async insert(product: ProductEntity): Promise<void> {
    this._products.push(product);
  }

  async find(): Promise<Array<ProductEntity>> {
    return this._products;
  }
}
