import ProductEntity from "Core/Domain/Entities/product.entity";
import IProductRepository from "Core/Domain/Repositories/product.repository";

export default class ProductInMemoryRepository implements IProductRepository {
  private _products: Array<ProductEntity>;
  constructor() {
    this._products = new Array<ProductEntity>();
  }
  findById(id: string): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }

  async save(product: ProductEntity) {
    this._products.push(product);
  }

  async find(): Promise<Array<ProductEntity>> {
    return this._products;
  }
}
