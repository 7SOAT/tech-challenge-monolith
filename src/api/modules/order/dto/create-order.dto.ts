import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateOrderDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ type: 'string', description: 'Customer Id' })
  customerId: UUID;

  @IsNotEmpty()
  @IsArray({ message: 'ProductIds should be an array' })
  @ApiProperty({ type: 'array', description: 'Product Ids', items: { type: 'string' } })
  productIds: Array<UUID>;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', description: 'Description' })
  description: string;
}
