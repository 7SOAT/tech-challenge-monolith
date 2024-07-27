import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import CreateProductDto from "@routes/product/dto/create-product.dto";
import UpdateProductDto from "@routes/product/dto/update-product.dto";
import { UUID } from 'crypto';
import { Controller, Get, HttpStatus, Param, HttpException, Post, Body, Put, Delete, Inject } from "@nestjs/common";
import ProductCategory from "core/enums/product-category.enum";
import ProductUseCase from "@usecases/product.usecase";
import ProductEntity from "core/entities/product.entity";
import UsecasesProxyModule from "api/usecases-proxy/usecases-proxy.module";
import UseCaseProxy from "api/usecases-proxy/usecases-proxy";
import ProductsMock from "@datasource/typeorm/seed/seed-tables/product.seed";

@ApiTags("products")
@Controller("products")
export default class ProductRoute {
  constructor(
    @Inject(UsecasesProxyModule.PRODUCT_USE_CASE)
    private _productUseCase: UseCaseProxy<ProductUseCase>
  ) { }

  @Get("/:productId")
  @ApiParam({ name: 'productId' })
  @ApiOperation({ summary: "Find product by Id", parameters: [{ name: "id", in: "path" }] })
  @ApiResponse({ status: 200, description: 'Retrieve a product' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findOneById(@Param("productId") id: UUID) {
    try {
      return await this._productUseCase.getInstance().findOneProductByIdUseCase(id);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: "Find all products" })
  @ApiResponse({
    status: 200, description: 'Retrieve products list',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async find(): Promise<ProductEntity[]> {
    try {
      return await this._productUseCase.getInstance().findAllProductsUseCase();
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/by-category/:productCategory")
  @ApiParam({ name: 'productCategory', enum: ProductCategory })
  @ApiOperation({ summary: "Find products by category name" })
  @ApiResponse({ status: 200, description: 'Retrieve a product by category name' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findByCategory(@Param("productCategory") category): Promise<ProductEntity[]> {
    try {
      return await this._productUseCase.getInstance().findProductsByCategory(category);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, description: 'Product created' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiBody({
    type: CreateProductDto,
    examples: Object.call(() => { }, ProductsMock.map((item, i) => {
      return {
        summary: `Exemplo ${i}`,
        value: {
          name: item.name,
          category: item.category,
          description: item.description,
          price: item.price
        } as CreateProductDto
      }
    }))
  })
  create(@Body() input: CreateProductDto) {
    return this._productUseCase.getInstance().createProductUseCase(input);
  }

  @Put("/:productId")
  @ApiParam({ name: 'productId', schema: { description: "product UUID" } })
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      a: {
        summary: "Exemplo Ativo",
        value: {
          name: "X-Salada",
          category: ProductCategory.Burger,
          description: "Hambúrguer, alface, tomate, queijo, presunto e maionese, servido em um pão de hambúrguer.",
          price: 23.50,
        } as UpdateProductDto
      },
      b: {
        summary: "Exemplo Inativo",
        value: {
          name: "Batata Frita",
          category: ProductCategory.Side,
          description: "Batatas em tiras e fritas em óleo quente, com sal e alecrim.",
          price: 12.00,
        } as UpdateProductDto
      }
    }
  })
  update(@Param("productId") id: UUID, @Body() input: UpdateProductDto) {
    try {
      return this._productUseCase.getInstance().updateProduct(id, input);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:productId")
  @ApiParam({ name: 'productId', schema: { description: "product UUID" } })
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  delete(@Param("productId") id: UUID) {
    try {
      return this._productUseCase.getInstance().deleteProductUseCase(id);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
