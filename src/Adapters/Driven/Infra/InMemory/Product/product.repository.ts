import ProductEntity from "Core/Domain/Entities/product.entity";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";

export default class ProductInMemoryRepository implements IProductRepository {

  findOneById(): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<Array<ProductEntity>> {
    throw new Error("Method not implemented.");
  }

  findByCategory(): Promise<ProductEntity[]> {
    throw new Error("Method not implemented.");
  }

  insert(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(): void {
    throw new Error("Method not implemented.");
  }

  delete(): void {
    throw new Error("Method not implemented.");
  }
}