
import { plainToInstance } from "class-transformer";
import { UUID } from 'crypto';
import ProductEntity from "entities/product.entity";
import { ProductCategory } from "enums/productCategory.enum";
import { ProductModel } from "infra/database/models/product.model";
import { IProductRepository } from "interfaces/gateways/product.gateway";
import { Repository } from "typeorm";

export class ProductGateway implements IProductRepository {
  constructor(private _productRepository: Repository<ProductModel>) {}

  async findOneById(id: UUID): Promise<ProductEntity> {
    const product: ProductModel = await this._productRepository.findOneBy({id});
    const mappedProduct = plainToInstance<ProductEntity, ProductModel>(
      ProductEntity,
      product,
      {enableImplicitConversion: true}
    );

    return mappedProduct;
  }

  async findAll(): Promise<Array<ProductEntity>> {
    const products = await this._productRepository.find();

    const mappedProducts = plainToInstance<ProductEntity, ProductModel>(
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

    const mappedProducts = plainToInstance<ProductEntity, ProductModel>(
      ProductEntity,
      products,
      {enableImplicitConversion: true}
    );
    return mappedProducts;
  }
  
  insert(product: ProductEntity): void {
    const mappedProduct = plainToInstance<ProductModel, ProductEntity>(
      ProductModel, 
      product, 
      {enableImplicitConversion: true}
    );
    this._productRepository.save(mappedProduct);
  }

  update(id: UUID, product: ProductEntity): void {
    const mappedProduct = plainToInstance<ProductModel, ProductEntity>(
      ProductModel, 
      product,
      {enableImplicitConversion: true}
    );
    this._productRepository.update(id.toString(), mappedProduct);
  }

  delete(id: UUID): void {
    this._productRepository.delete(id.toString());
  }
}
