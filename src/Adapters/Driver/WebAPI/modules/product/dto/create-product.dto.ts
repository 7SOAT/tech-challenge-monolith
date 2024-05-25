import { ApiProperty } from "@nestjs/swagger";
import IProductInput from "../../../../../../Core/Application/Ports/Input/product.input";
import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";

export class CreateProductDto implements IProductInput {
  @ApiProperty()
  category: ProductCategory;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;
}
