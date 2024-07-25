import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { UUID } from 'crypto';
import { Controller, Get, HttpStatus, Param, HttpException, Post, Body, Put, Delete } from "@nestjs/common";
import ProductEntity from "entities/product.entity";
import { ProductCategory } from "enums/productCategory.enum";
import { ProductUseCase } from "useCases/product.usecase";

@ApiTags("products")
@Controller("products")
export class ProductController {
  constructor(
    private _productUseCase: ProductUseCase
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
      return await this._productUseCase.findOneProductByIdUseCase(id);
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
      return await this._productUseCase.findAllProductsUseCase();
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
      return await this._productUseCase.findProductsByCategory(category);
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
    examples: {
      a: {
        summary: "Exemplo Lanche",
        value: {
          name: "X-Salada",
          category: ProductCategory.Burger,
          description: "Hambúrguer, alface, tomate, queijo, presunto e maionese, servido em um pão de hambúrguer.",
          price: 23.50
        } as CreateProductDto
      },
      b: {
        summary: "Exemplo Acompanhamento",
        value: {
          name: "Batata Frita",
          category: ProductCategory.Side,
          description: "Batatas em tiras e fritas em óleo quente, com sal e alecrim.",
          price: 12.00
        } as CreateProductDto
      },
      c: {
        summary: "Exemplo Bebida",
        value: {
          name: "Coca cola (lata)",
          category: ProductCategory.Beverage,
          description: "Lata de Coca Cola de 350ml.",
          price: 5.00
        } as CreateProductDto
      },
      d: {
        summary: "Exemplo Sobremesa",
        value: {
          name: "Sorvete com Nutella",
          category: ProductCategory.Dessert,
          description: "4 deliciosas bolas de sorvete com corbertura de Nutella.",
          price: 27.00
        } as CreateProductDto
      }
    }
  })
  create(@Body() input: CreateProductDto) {
    return this._productUseCase.createProductUseCase(input);
  }

  @Put("/:productId")
  @ApiParam({ name: 'productId', schema: {description: "product UUID"} })
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
      return this._productUseCase.updateProduct(id, input);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:productId")
  @ApiParam({ name: 'productId', schema: {description: "product UUID"} })
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  delete(@Param("productId") id: UUID) {
    try {
      return this._productUseCase.deleteProductUseCase(id);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}