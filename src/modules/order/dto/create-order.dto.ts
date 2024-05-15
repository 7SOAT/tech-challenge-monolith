import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ type: 'string', description: 'Customer Id' })
  customerId: UUID;

  @IsString()
  @ApiProperty({ type: 'string', description: 'Burger' })
  burger: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'Side' })
  side: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'Beverage' })
  beverage: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'Dessert' })
  dessert: string;
}
