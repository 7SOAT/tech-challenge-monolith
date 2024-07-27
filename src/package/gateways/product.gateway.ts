
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { UUID } from 'crypto';
import ProductCategory from "core/enums/product-category.enum";
import IProductGateway from "@interfaces/gateways/product.gateway";
import ProductEntity from "core/entities/product.entity";
import ProductModel from "@models/product.model";
import { Repository } from "typeorm";

export default class ProductGateway implements IProductGateway {
  constructor(
    @InjectRepository(ProductModel)
    private _productRepository: Repository<ProductModel>
  ) {}

  async findOneById(id: UUID): Promise<ProductEntity> {
    const product: ProductModel = await this._productRepository.findOneBy({id});
    const mappedProduct = plainToInstance<ProductEntity, ProductModel>(
      ProductEntity,
      product,
      {enableImplicitConversion: true}
    );

    return mappedProduct;
  }

  async findAll(): Promise<ProductEntity[]> {
    const products: ProductModel[] = await this._productRepository.find();

    const mappedProducts = plainToInstance<ProductEntity, ProductModel>(
      ProductEntity,
      products,
      {enableImplicitConversion: true}
    );

    return mappedProducts;
  }

  async findByCategory(
    category: ProductCategory
  ): Promise<ProductModel[]> {
    const products = await this._productRepository.findBy({ category });

    const mappedProducts = plainToInstance<ProductModel, ProductModel>(
      ProductModel,
      products,
      {enableImplicitConversion: true}
    );

    return mappedProducts;
  }
  
  async insert(product: ProductEntity): Promise<void> {
    const mappedProduct = plainToInstance<ProductModel, ProductEntity>(
      ProductModel, 
      product, 
      {enableImplicitConversion: true}
    );
    await this._productRepository.save(mappedProduct);
  }

  async update(id: UUID, product: ProductEntity): Promise<number> {
    const mappedProduct = plainToInstance<ProductModel, ProductEntity>(
      ProductModel, 
      product,
      {enableImplicitConversion: true}
    );
    const result = await this._productRepository.update(id, mappedProduct);
    return result.affected;
  }

  async delete(id: UUID): Promise<void> {
    await this._productRepository.delete(id.toString());
  }
}
