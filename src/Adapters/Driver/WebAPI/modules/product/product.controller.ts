import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, Param, Put, Delete } from "@nestjs/common";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

import { CreateProductUseCase } from "Core/Application/UseCases/Product/CreateProduct/createProduct.usecase";
import { UpdateProductUseCase } from "Core/Application/UseCases/Product/UpdateProduct/updateProduct.usecase";
import { DeleteProductUseCase } from "Core/Application/UseCases/Product/DeleteProduct/deleteProduct.usecase";

@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(
    private _createProductUseCase: CreateProductUseCase,
    private _updateProductUseCase: UpdateProductUseCase,
    private _deleteProductUseCase: DeleteProductUseCase
  ) {}

  @Post()
  create(@Body() input: CreateProductDto) {
    return this._createProductUseCase.execute(input);
  }

  @Put("/:productId")
  update(@Param("productId") id, @Body() input: UpdateProductDto) {
    return this._updateProductUseCase.execute(id, input);
  }

  @Delete("/:productId")
  delete(@Param("productId") id) {
    return this._deleteProductUseCase.execute(id);
  }
}
