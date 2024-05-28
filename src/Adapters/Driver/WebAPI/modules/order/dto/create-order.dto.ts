import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ type: 'string', description: 'Customer Id' })
  customerId: UUID;

  @IsNotEmpty()
  @ApiProperty({ type: 'array', description: 'Product Ids', items: { type: 'string' } })
  productIds: Array<UUID>;

  @IsString()
  @ApiProperty({ type: 'string', description: 'Description' })
  description: string;
}
