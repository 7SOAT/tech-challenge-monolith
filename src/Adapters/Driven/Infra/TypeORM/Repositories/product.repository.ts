import { Repository } from "typeorm";
import { ProductTypeOrmEntity } from "../Entities/product.typeorm.entity";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";
import ProductEntity from "Core/Domain/Entities/product.entity";
import ProductMapper from "../Mappers/product.mapper";
import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";

export class ProductTypeOrmRepository implements IProductRepository {
  constructor(private _productRepository: Repository<ProductTypeOrmEntity>) {}

  async find(): Promise<Array<ProductEntity>> {
    const products = await this._productRepository.find().then((products) => {
      return products.map((product) =>
        ProductMapper.mapToDomainEntity(product)
      );
    });

    return products;
  }

  async findOneById(id: string): Promise<ProductEntity> {
    const product = await this._productRepository
      .findOneBy({ id })
      .then((product) => ProductMapper.mapToDomainEntity(product));
    return product;
  }

  async findByCategory(
    category: ProductCategory
  ): Promise<Array<ProductEntity>> {
    const products = await this._productRepository
      .findBy({ category })
      .then((products) => {
        return products.map((product) =>
          ProductMapper.mapToDomainEntity(product)
        );
      });

    return products;
  }

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
