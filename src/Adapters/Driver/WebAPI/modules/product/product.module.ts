import { Logger, Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import CreateNewProductUseCase from "../../../../../Core/Application/UseCases/Product/CreateNewProduct/createNewProduct.usecase";

@Module({
  controllers: [ProductController],
  providers: [CreateNewProductUseCase, Logger],
})
export class ProductModule {}
