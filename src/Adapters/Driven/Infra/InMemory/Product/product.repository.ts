import ProductEntity from "Core/Domain/Entities/product.entity";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";

export default class ProductInMemoryRepository implements IProductRepository {
  private _products: Array<ProductEntity>;
  constructor() {
    this._products = new Array<ProductEntity>();
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
