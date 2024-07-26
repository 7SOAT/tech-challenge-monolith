import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductCategory } from 'domain/enums/productCategory.enum';
import IProductInput from 'domain/types/input/product.input';

export class CreateProductDto implements IProductInput {
  @IsNotEmpty({ message: 'Product category should be not empty' })
  @IsString({ message: 'Product category should be a string' })
  @ApiProperty({ type: 'enum', enum: ProductCategory, description: 'Product category' })
  category: ProductCategory;

  @IsNotEmpty({ message: 'Product name should be not empty' })
  @IsString({ message: 'Product name should be string' })
  @ApiProperty({ type: 'string', description: 'Product name' })
  name: string;

  @IsNotEmpty({ message: 'Product price should be not empty' })
  @IsNumber()
  @ApiProperty({ type: 'number', description: 'Product price' })
  price: number;

  @IsString({ message: 'Product description should be a string' })
  @ApiProperty({ type: 'string', description: 'Product description' })
  description: string;
}
