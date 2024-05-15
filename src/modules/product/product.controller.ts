import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductCategory } from './enums/product-category.enum';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/:productId')
  findOne(@Param('productId') productId: string) {
    return this.productService.findById(productId);
  }

  @Get('/by-category/:category')
  findByCategory(@Param('category') productCategoryString: string) {
    return this.productService.findByCategory(
      productCategoryString as ProductCategory
    );
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put('/:productId')
  update(
    @Param('productId') productId,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(productId, updateProductDto);
  }

  @Delete('/:productId')
  delete(@Param('productId') productId: string) {
    return this.productService.delete(productId);
  }
}
