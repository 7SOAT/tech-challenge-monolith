import { IWebhookService } from 'Core/Application/Services/interfaces/webhook.interface';
import { IFindPaymentByPaymentIdUseCase } from './findPaymentByPaymentId.usecase.port';

export class FindPaymentByPaymentIdUseCase implements IFindPaymentByPaymentIdUseCase {
  constructor(
    private readonly _webhookService: IWebhookService,
  ) { }

  async execute(paymentId: string): Promise<any> {
    return await this._webhookService.findStatusByPaymentId(paymentId);
  }
}
