import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class CreateOrderDto {
  @ApiProperty({ type: 'string', description: 'Customer Id' })
  customerId: UUID;

  @ApiProperty({ type: 'string', description: 'Burger' })
  burger: string;

  @ApiProperty({ type: 'string', description: 'Side' })
  side: string;

  @ApiProperty({ type: 'string', description: 'Beverage' })
  beverage: string;

  @ApiProperty({ type: 'string', description: 'Dessert' })
  dessert: string;
}
