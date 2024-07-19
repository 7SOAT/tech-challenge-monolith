import { ResponseWebhook } from './response-webhook.interface';

export interface IWebhookService {
  findStatusByPaymentId(paymentId: string): Promise<ResponseWebhook>;
}
