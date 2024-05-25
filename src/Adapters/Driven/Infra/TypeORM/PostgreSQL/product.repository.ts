import IProductRepository from "Core/Domain/Repositories/product.repository";
import ProductTypeOrmEntity from "../Entities/product.typeorm.entity";

import { Repository } from "typeorm";
import ProductEntity from "Core/Domain/Entities/product.entity";

import ProductMapper from "./product.mapper";

export default class ProductRepository implements IProductRepository {
  private readonly _productRepository: Repository<ProductTypeOrmEntity>;

  constructor() {}
  save(newProduct: ProductEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this._productRepository.save(ProductMapper.mapToDbEntity(newProduct));
      resolve();
    });
  }

  find(): Promise<ProductEntity[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }
}
