import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateOrderDto {
  @IsUUID()
  @ApiProperty({ type: 'string', description: 'Customer Id' })
  customerId: UUID;

  @IsNotEmpty()
  @IsArray({ message: 'productIds should be array' })
  @ApiProperty({ type: 'array', description: 'Product Ids', items: { type: 'string' } })
  productIds: Array<UUID>;

  @IsString()
  @ApiProperty({ type: 'string', description: 'Description' })
  description: string;
}
