import { Repository } from "typeorm";
import ProductTypeOrmEntity from "../Entities/product.typeorm.entity";
import IProductRepository from "Core/Domain/Repositories/product.repository";
import ProductEntity from "Core/Domain/Entities/product.entity";
import ProductMapper from "../Mappers/product.mapper";

export default class ProductTypeOrmRepository implements IProductRepository {
  constructor(
    private readonly _productRepository: Repository<ProductTypeOrmEntity>
  ) {}
  insert(product: ProductEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this._productRepository.save(ProductMapper.mapToDbEntity(product));
      resolve();
    });
  }

  update(id: string, product: ProductEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this._productRepository.update(id, ProductMapper.mapToDbEntity(product));
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
