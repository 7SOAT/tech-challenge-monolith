import { ApiProperty } from '@nestjs/swagger';
import IProductInput from '../../../../../../Core/Application/Ports/Input/product.input';
import { ProductCategory } from 'Core/Domain/Enums/productCategory.enum';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto implements IProductInput {
  @IsNotEmpty({ message: 'category product should be not empty' })
  @IsString({ message: 'category product should be string' })
  @ApiProperty({ type: 'enum', enum: ProductCategory, description: 'category product' })
  category: ProductCategory;

  @IsNotEmpty({ message: 'name product should be not empty' })
  @IsString({ message: 'name product should be string' })
  @ApiProperty({ type: 'string', description: 'name product' })
  name: string;

  @IsNotEmpty({ message: 'price product should be not empty' })
  @IsNumber()
  @ApiProperty({ type: 'number', description: 'price product' })
  price: number;

  @IsString({ message: 'description product should be string' })
  @ApiProperty({ type: 'string', description: 'description product' })
  description: string;
}
