import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, Param, Put } from "@nestjs/common";

import { CreateProductDto } from "./dto/create-product.dto";

import { CreateProductUseCase } from "Core/Application/UseCases/Product/CreateProduct/createProduct.usecase";

@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(private _createProductUseCase: CreateProductUseCase) {}

  @Post()
  create(@Body() input: CreateProductDto) {
    return this._createProductUseCase._execute(input);
  }

  // @Put("/:productId")
  // update(@Param("productId") id, @Body() input: UpdateProductDto) {
  //   return this._updateProductUseCase.execute(id, input);
  // }
}
