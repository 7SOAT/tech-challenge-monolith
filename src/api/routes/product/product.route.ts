import ProductRepository from "@datasource/typeorm/repositories/product.repository";
import ProductsMock from "@datasource/typeorm/seed/seed-tables/product.seed";
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import CreateProductDto from "@routes/product/dto/create-product.dto";
import UpdateProductDto from "@routes/product/dto/update-product.dto";
import ProductUseCase from "@usecases/product.usecase";
import ProductEntity from "core/entities/product.entity";
import ProductCategory from "core/enums/product-category.enum";
import { UUID } from 'crypto';

@ApiTags("products")
@Controller("products")
export default class ProductRoute {
  constructor(
    private _productRepository: ProductRepository
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
      const productUseCase = new ProductUseCase(this._productRepository)
      return await productUseCase.findOneProductByIdUseCase(id);
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
      const productUseCase = new ProductUseCase(this._productRepository)
      return await productUseCase.findAllProductsUseCase();
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
      const productUseCase = new ProductUseCase(this._productRepository)
      return await productUseCase.findProductsByCategory(category);
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
  async create(@Body() input: CreateProductDto) {
    const productUseCase = new ProductUseCase(this._productRepository)
    return await productUseCase.createProductUseCase(input);
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
  async update(@Param("productId") id: UUID, @Body() input: UpdateProductDto) {
    try {
      const productUseCase = new ProductUseCase(this._productRepository)
      return await productUseCase.updateProduct(id, input);
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
  async delete(@Param("productId") id: UUID) {
    try {
      const productUseCase = new ProductUseCase(this._productRepository)
      return await productUseCase.deleteProductUseCase(id);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
