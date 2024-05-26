import { DataSource } from "typeorm";
import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule, getDataSourceToken } from "@nestjs/typeorm";

import { ProductTypeOrmRepository } from "Adapters/Driven/Infra/TypeORM/Repositories/product.repository";
import { ProductTypeOrmEntity } from "Adapters/Driven/Infra/TypeORM/Entities/product.typeorm.entity";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";
import { CreateProductUseCase } from "Core/Application/UseCases/Product/CreateProduct/createProduct.usecase";
import { UpdateProductUseCase } from "Core/Application/UseCases/Product/UpdateProduct/updateProduct.usecase";
import { DeleteProductUseCase } from "Core/Application/UseCases/Product/DeleteProduct/deleteProduct.usecase";
import { ProductController } from "./product.controller";
import { FindAllProductsUseCase } from "Core/Application/UseCases/Product/FindAllProducts/findAllProducts.usecase";
import { FindOneProductByIdUseCase } from "Core/Application/UseCases/Product/FindOneProductById/findOneProductById.usecase";
import { FindProductsByCategoryUseCase } from "Core/Application/UseCases/Product/FindProductsByCategory/findProductsByCategory.usecase";

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypeOrmEntity])],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new ProductTypeOrmRepository(
          dataSource.getRepository(ProductTypeOrmEntity)
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateProductUseCase,
      useFactory: (_productRepository: IProductRepository) => {
        return new CreateProductUseCase(_productRepository);
      },
      inject: [ProductTypeOrmRepository],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (_productRepository: IProductRepository) => {
        return new UpdateProductUseCase(_productRepository);
      },
      inject: [ProductTypeOrmRepository],
    },
    {
      provide: DeleteProductUseCase,
      useFactory: (_productRepository: IProductRepository) => {
        return new DeleteProductUseCase(_productRepository);
      },
      inject: [ProductTypeOrmRepository],
    },
    {
      provide: FindAllProductsUseCase,
      useFactory: (_productRepository: IProductRepository) => {
        return new FindAllProductsUseCase(_productRepository);
      },
      inject: [ProductTypeOrmRepository],
    },
    {
      provide: FindOneProductByIdUseCase,
      useFactory: (_productRepository: IProductRepository) => {
        return new FindOneProductByIdUseCase(_productRepository);
      },
      inject: [ProductTypeOrmRepository],
    },
    {
      provide: FindProductsByCategoryUseCase,
      useFactory: (_productRepository: IProductRepository) => {
        return new FindProductsByCategoryUseCase(_productRepository);
      },
      inject: [ProductTypeOrmRepository],
    },
  ],
})
export class ProductModule {}
//Logger,
