import { ApiProperty } from '@nestjs/swagger';
import { ICheckoutOrderInput } from '@type/input/order.input';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export default class CheckoutOrderDtos implements ICheckoutOrderInput {
  @IsNotEmpty()
  @IsArray({ message: 'The order productIds should be an array' })
  @ApiProperty({ type: 'array', description: 'Product Ids', items: { type: 'string' } })
  //@IsUUID('all', {message: 'Products must be a valid UUID list' })
  productIds: Array<UUID>;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', description: 'Order Customer ID' })
  customerId: UUID;
}
