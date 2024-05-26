import { ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  Req,
} from "@nestjs/common";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

import ICreateProductUseCase from "Core/Application/UseCases/Product/CreateProduct/createProduct.usecase.port";
import IUpdateProductUseCase from "Core/Application/UseCases/Product/UpdateProduct/updateProduct.usecase.port";

@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(
    private readonly _createProductUseCase: ICreateProductUseCase,
    private readonly _updateProductUseCase: IUpdateProductUseCase
  ) {}

  // @Get()
  // findAll() {
  //   return this.productService.findAll();
  // }

  // @Get("/:productId")
  // findOne(@Param("productId") productId: string) {
  //   return this.productService.findById(productId);
  // }

  // @Get("/by-category/:category")
  // findByCategory(@Param("category") productCategoryString: string) {
  //   return this.productService.findByCategory(
  //     productCategoryString as ProductCategory
  //   );
  // }

  @Post()
  create(@Body() input: CreateProductDto) {
    return this._createProductUseCase.execute(input);
  }

  @Put("/:productId")
  update(@Param("productId") id, @Body() input: UpdateProductDto) {
    return this._updateProductUseCase.execute(id, input);
  }

  // @Delete("/:productId")
  // delete(@Param("productId") productId: string) {
  //   return this.productService.delete(productId);
  // }
}
