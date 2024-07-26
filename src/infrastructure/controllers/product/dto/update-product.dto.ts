import { ApiProperty } from "@nestjs/swagger";
import { ProductCategory } from "domain/enums/productCategory.enum";
import IProductInput from "domain/types/input/product.input";

export class UpdateProductDto implements IProductInput {
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
