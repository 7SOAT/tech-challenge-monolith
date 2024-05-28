import { Repository } from "typeorm";
import { ProductTypeOrmEntity } from "../Entities/product.typeorm.entity";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";
import ProductEntity from "Core/Domain/Entities/product.entity";
import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";
import { plainToInstance } from "class-transformer";

export class ProductTypeOrmRepository implements IProductRepository {
  constructor(private _productRepository: Repository<ProductTypeOrmEntity>) {}

  async find(): Promise<Array<ProductEntity>> {
    const products = await this._productRepository.find();

    const mappedProducts = plainToInstance<ProductEntity, ProductTypeOrmEntity>(
      ProductEntity,
      products
    );

    return mappedProducts;
  }

  async findOneById(id: string): Promise<ProductEntity> {
    const product = await this._productRepository.findOneBy({ id });

    const mappedProduct = plainToInstance<ProductEntity, ProductTypeOrmEntity>(
      ProductEntity,
      product
    );

    return mappedProduct;
  }

  async findByCategory(
    category: ProductCategory
  ): Promise<Array<ProductEntity>> {
    const products = await this._productRepository.findBy({ category });

    const mappedProducts = plainToInstance<ProductEntity, ProductTypeOrmEntity>(
      ProductEntity,
      products
    );
    return mappedProducts;
  }

  insert(product: ProductEntity): void {
    const mappedProduct = plainToInstance<ProductTypeOrmEntity, ProductEntity>(ProductTypeOrmEntity, product);
    this._productRepository.save(mappedProduct);
  }

  update(id: string, product: ProductEntity): void {
    const mappedProduct = plainToInstance<ProductTypeOrmEntity, ProductEntity>(ProductTypeOrmEntity, product);
    this._productRepository.update(id, mappedProduct);
  }

  delete(id: string): void {
    this._productRepository.delete(id);
  }
}
