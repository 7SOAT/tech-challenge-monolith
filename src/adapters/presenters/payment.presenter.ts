import { plainToInstance } from "class-transformer";

class PaymentPresenter {
  static PresentOne(orderNumber: number): PaymentDto {
    return plainToInstance(PaymentDto, { orderNumber });
  }
}

export default PaymentPresenter;
