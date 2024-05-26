import { Repository } from "typeorm";
import { ProductTypeOrmEntity } from "../Entities/product.typeorm.entity";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";
import ProductEntity from "Core/Domain/Entities/product.entity";
import ProductMapper from "../Mappers/product.mapper";

export class ProductTypeOrmRepository implements IProductRepository {
  constructor(private _productRepository: Repository<ProductTypeOrmEntity>) {}

  insert(product: ProductEntity): void {
    this._productRepository.save(ProductMapper.mapToDbEntity(product));
  }

  update(id: string, product: ProductEntity): void {
    this._productRepository.update(id, ProductMapper.mapToDbEntity(product));
  }

  delete(id: string): void {
    this._productRepository.delete(id);
  }
}
