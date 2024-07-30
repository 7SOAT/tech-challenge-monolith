import PaymentStatusEntity from "@entities/payment/payment-status.entity";
import { ICreatePaymentOutput } from "@type/output/payment.output";
import { UUID } from "crypto";

export default class PaymentDto implements ICreatePaymentOutput {
  constructor(
    public id: UUID,
    public status: PaymentStatusEntity,
    public externalId: number
  ) { }
}
