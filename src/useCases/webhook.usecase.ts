import { IWebhookService } from 'useCases/Services/interfaces/webhook.interface';

export class WebhookUseCase{
  constructor(
    private readonly _webhookService: IWebhookService,
  ) { }

  async findPaymentByPaymentId(paymentId: string): Promise<any> {
    return await this._webhookService.findStatusByPaymentId(paymentId);
  }
}