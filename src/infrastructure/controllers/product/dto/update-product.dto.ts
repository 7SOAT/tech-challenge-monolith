import { ApiProperty } from "@nestjs/swagger";
import ProductCategory from "@enums/product-category.enum";
import IProductInput from "@type/input/product.input";

export default class UpdateProductDto implements IProductInput {
  @ApiProperty()
  category: ProductCategory;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;
}
