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
import { ApiTags } from "@nestjs/swagger";
import CreateNewProductUseCase from "Core/Application/UseCases/Product/CreateNewProduct/createNewProduct.usecase";

@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(
    private readonly _createNewProductUseCase: CreateNewProductUseCase
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
  create(@Body() createProductDto: CreateProductDto) {
    return this._createNewProductUseCase._execute(createProductDto);
  }

  // @Put("/:productId")
  // update(
  //   @Param("productId") productId,
  //   @Body() updateProductDto: UpdateProductDto
  // ) {
  //   return this.productService.update(productId, updateProductDto);
  // }

  // @Delete("/:productId")
  // delete(@Param("productId") productId: string) {
  //   return this.productService.delete(productId);
  // }
}
