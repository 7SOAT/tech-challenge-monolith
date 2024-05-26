import { DataSource } from "typeorm";
import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule, getDataSourceToken } from "@nestjs/typeorm";

import { ProductTypeOrmRepository } from "../../../../../Adapters/Driven/Infra/TypeORM/Repositories/product.repository";
import { ProductTypeOrmEntity } from "../../../../../Adapters/Driven/Infra/TypeORM/Entities/product.typeorm.entity";
import { IProductRepository } from "../../../../../Core/Domain/Repositories/product.repository";
import { CreateProductUseCase } from "../../../../../Core/Application/UseCases/Product/CreateProduct/createProduct.usecase";
import { UpdateProductUseCase } from "../../../../../Core/Application/UseCases/Product/UpdateProduct/updateProduct.usecase";
import { ProductController } from "./product.controller";

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
  ],
})
export class ProductModule {}
//Logger,
