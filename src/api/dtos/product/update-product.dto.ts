import { AtLeastOneField } from "@api/validators/at-least-one-field.validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import ProductCategory from "core/enums/product-category.enum";
import { IUpdateProductInput } from "core/types/input/product.input";

@AtLeastOneField()
export default class UpdateProductBodyDto implements IUpdateProductInput {
  @ApiProperty({ required: false })
  @IsOptional()
  category?: ProductCategory;

  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  isActive?: boolean;
}

