import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../enums/product-category.enum';

export class CreateProductDto {
  @ApiProperty()
  category: ProductCategory;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;
}
