
import { TypeOrmModule} from "@nestjs/typeorm";
import { ProductModel } from "infra/database/models/product.model";
import { ProductController } from "./product.controller";
import { ProductUseCase } from "useCases/product.usecase";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  controllers: [ProductController],
  providers: [ ProductUseCase ]
})

export class ProductModule {}