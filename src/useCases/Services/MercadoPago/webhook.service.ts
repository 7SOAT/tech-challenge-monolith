import { HttpService } from '@nestjs/axios';
import { IWebhookService } from '../interfaces/webhook.interface';
import { OrderStatusEnum } from 'domain/enums/orderStatus.enum';
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';
import { UUID } from 'crypto';
import { IOrderGateway } from 'domain/interfaces/gateways/order.gateway';

export class WebhookService implements IWebhookService {
  private readonly accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  private readonly baseUrl = process.env.MERCADO_PAGO_BASE_URL;
  constructor(
    private readonly _httpService: HttpService,
    private readonly _orderRepository: IOrderGateway,
  ) { }

  async findStatusByPaymentId(paymentId: string): Promise<PaymentResponse> {
    try {
      const responseData = (await this._httpService
        .axiosRef.get(`${this.baseUrl}/v1/payments/${paymentId}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })).data;
        
      const {status: externalPaymentstatus, external_reference}: PaymentResponse = responseData;
      await this._orderRepository.updateStatusWebhook((<UUID> external_reference), OrderStatusEnum.RECEPTED);
      return responseData;
    } catch (error) {
      throw new Error(`Error find status payment: ${error}`);
    }
  }
}
