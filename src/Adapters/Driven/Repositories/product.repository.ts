import { Repository } from "typeorm";
import { ProductTypeOrmEntity } from "../Entities/product.typeorm.entity";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";
import ProductEntity from "Core/Domain/Entities/product.entity";
import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";
import { plainToInstance } from "class-transformer";
import { UUID } from 'crypto';

export class ProductTypeOrmRepository implements IProductRepository {
  constructor(private _productRepository: Repository<ProductTypeOrmEntity>) {}

  async findOneById(id: UUID): Promise<ProductEntity> {
    const product: ProductTypeOrmEntity = await this._productRepository.findOneBy({id});
    const mappedProduct = plainToInstance<ProductTypeOrmEntity, ProductEntity>(
      ProductTypeOrmEntity,
      product,
      {enableImplicitConversion: true}
    );

    return mappedProduct;
  }

  async findAll(): Promise<Array<ProductEntity>> {
    const products = await this._productRepository.find();

    const mappedProducts = plainToInstance<ProductEntity, ProductTypeOrmEntity>(
      ProductEntity,
      products,
      {enableImplicitConversion: true}
    );

    return mappedProducts;
  }

  async findByCategory(
    category: ProductCategory
  ): Promise<Array<ProductEntity>> {
    const products = await this._productRepository.findBy({ category });

    const mappedProducts = plainToInstance<ProductEntity, ProductTypeOrmEntity>(
      ProductEntity,
      products,
      {enableImplicitConversion: true}
    );
    return mappedProducts;
  }
  
  insert(product: ProductEntity): void {
    const mappedProduct = plainToInstance<ProductTypeOrmEntity, ProductEntity>(
      ProductTypeOrmEntity, 
      product, 
      {enableImplicitConversion: true}
    );
    this._productRepository.save(mappedProduct);
  }

  update(id: UUID, product: ProductEntity): void {
    const mappedProduct = plainToInstance<ProductTypeOrmEntity, ProductEntity>(
      ProductTypeOrmEntity, 
      product,
      {enableImplicitConversion: true}
    );
    this._productRepository.update(id.toString(), mappedProduct);
  }

  delete(id: UUID): void {
    this._productRepository.delete(id.toString());
  }
}
