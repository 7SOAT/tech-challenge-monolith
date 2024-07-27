
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { UUID } from 'crypto';
import ProductCategory from "domain/enums/productCategory.enum";
import IProductGateway from "domain/interfaces/gateways/product.gateway";
import ProductModel from "domain/models/product.model";
import ProductEntity from "infrastructure/entities/product.entity";
import { Repository } from "typeorm";

export default class ProductGateway implements IProductGateway {
  constructor(
    @InjectRepository(ProductEntity)
    private _productRepository: Repository<ProductEntity>
  ) {}

  async findOneById(id: UUID): Promise<ProductModel> {
    const product: ProductEntity = await this._productRepository.findOneBy({id});
    const mappedProduct = plainToInstance<ProductModel, ProductEntity>(
      ProductModel,
      product,
      {enableImplicitConversion: true}
    );

    return mappedProduct;
  }

  async findAll(): Promise<Array<ProductModel>> {
    const products: ProductEntity[] = await this._productRepository.find();

    const mappedProducts = plainToInstance<ProductModel, ProductEntity>(
      ProductModel,
      products,
      {enableImplicitConversion: true}
    );

    return mappedProducts;
  }

  async findByCategory(
    category: ProductCategory
  ): Promise<Array<ProductEntity>> {
    const products = await this._productRepository.findBy({ category });

    const mappedProducts = plainToInstance<ProductEntity, ProductEntity>(
      ProductEntity,
      products,
      {enableImplicitConversion: true}
    );
    return mappedProducts;
  }
  
  async insert(product: ProductModel): Promise<void> {
    const mappedProduct = plainToInstance<ProductEntity, ProductModel>(
      ProductEntity, 
      product, 
      {enableImplicitConversion: true}
    );
    await this._productRepository.save(mappedProduct);
  }

  async update(id: UUID, product: ProductModel): Promise<void> {
    const mappedProduct = plainToInstance<ProductEntity, ProductModel>(
      ProductEntity, 
      product,
      {enableImplicitConversion: true}
    );
    await this._productRepository.update(id.toString(), mappedProduct);
  }

  async delete(id: UUID): Promise<void> {
    await this._productRepository.delete(id.toString());
  }
}
