import { ApiParam, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
} from "@nestjs/common";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

import { CreateProductUseCase } from "Core/Application/UseCases/Product/CreateProduct/createProduct.usecase";
import { UpdateProductUseCase } from "Core/Application/UseCases/Product/UpdateProduct/updateProduct.usecase";
import { DeleteProductUseCase } from "Core/Application/UseCases/Product/DeleteProduct/deleteProduct.usecase";
import { FindAllProductsUseCase } from "Core/Application/UseCases/Product/FindAllProducts/findAllProducts.usecase";
import { FindOneProductByIdUseCase } from "Core/Application/UseCases/Product/FindOneProductById/findOneProductById.usecase";
import { FindProductsByCategoryUseCase } from "Core/Application/UseCases/Product/FindProductsByCategory/findProductsByCategory.usecase";

@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(
    private _createProductUseCase: CreateProductUseCase,
    private _updateProductUseCase: UpdateProductUseCase,
    private _deleteProductUseCase: DeleteProductUseCase,
    private _findAllProductsUseCase: FindAllProductsUseCase,
    private _findOneProductByIdUseCase: FindOneProductByIdUseCase,
    private _findProductsByCategoryUseCase: FindProductsByCategoryUseCase
  ) {}

  @Post()
  create(@Body() input: CreateProductDto) {
    return this._createProductUseCase.execute(input);
  }

  @Put("/:productId")
  @ApiParam({name: 'productId'})
  update(@Param("productId") id, @Body() input: UpdateProductDto) {
    return this._updateProductUseCase.execute(id, input);
  }

  @Delete("/:productId")
  @ApiParam({name: 'productId'})
  delete(@Param("productId") id) {
    return this._deleteProductUseCase.execute(id);
  }

  @Get()
  find() {
    return this._findAllProductsUseCase.execute();
  }

  @Get("/:productId")
  @ApiParam({name: 'productId'})
  findOneById(@Param("productId") id) {
    return this._findOneProductByIdUseCase.execute(id);
  }

  @Get("/by-category/:productCategory")
  @ApiParam({name: 'productCategory'})
  findByCategory(@Param("productCategory") category) {
    return this._findProductsByCategoryUseCase.execute(category);
  }
}
