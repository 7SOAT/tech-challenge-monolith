import { ApiProperty } from "@nestjs/swagger";
import { ICreatePaymentInput } from "@type/input/payment.input";
import { IsNotEmpty, IsUUID } from "class-validator";

export default class CreatePaymentParams implements ICreatePaymentInput {
  @ApiProperty({ type: 'number', description: 'Order id', required: true })
  @IsNotEmpty({message: "The order id is required"})
  @IsUUID("all", { message: "The order id need to be a UUID" })
  orderId: number;
}
