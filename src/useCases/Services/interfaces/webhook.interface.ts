import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';

export interface IWebhookService {
  findStatusByPaymentId(paymentId: string): Promise<PaymentResponse>;
}
