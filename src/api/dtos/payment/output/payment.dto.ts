import { UUID } from "crypto";

export class PaymentDto {
  constructor(
    public id: UUID,
    public status: number,
    public externalId: number
  ) {}
}

export class CreatePaymentDto {
  constructor(
    public qr_data: string
  ) {}
}