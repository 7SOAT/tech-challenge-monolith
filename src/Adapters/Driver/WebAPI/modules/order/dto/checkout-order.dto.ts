import { IsNotEmpty, IsString } from 'class-validator';
import { UUID } from 'crypto';

export class CheckoutOrderDto {
  @IsNotEmpty()
  @IsString()
  orderId: UUID;
}