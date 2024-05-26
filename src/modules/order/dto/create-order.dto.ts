import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ type: 'string', description: 'Customer Id' })
  customerId: UUID;

  @IsNotEmpty()
  @ApiProperty({ type: 'array', items: { type: 'string' }, description: 'Product Id'})
  productId: Array<UUID>;

  @IsString()
  @ApiProperty({ type: 'string', description: 'Description' })
  description: string;
}
