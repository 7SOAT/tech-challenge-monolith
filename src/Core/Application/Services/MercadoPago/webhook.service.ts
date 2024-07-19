import { HttpService } from '@nestjs/axios';
import { IWebhookService } from '../interfaces/webhook.interface';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { ResponseWebhook } from '../interfaces/response-webhook.interface';
import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { OrderStatus } from 'Core/Domain/Enums/orderStatus.enum';

export class WebhookService implements IWebhookService {
  private readonly accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  private readonly baseUrl = process.env.MERCADO_PAGO_BASE_URL;
  constructor(
    private readonly _httpService: HttpService,
    private readonly _orderRepository: IOrderRepository,
  ) { }

  async findStatusByPaymentId(paymentId: string): Promise<ResponseWebhook> {
    try {
      const response = this._httpService
        .get(`${this.baseUrl}/${paymentId}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .pipe();

      const { data } = await lastValueFrom<AxiosResponse<ResponseWebhook>>(response);

      const { status, order } = data;

      this._orderRepository.updateStatusWebhook(order.id, OrderStatus.COMPLETED);

      return data;
    } catch (error) {
      throw new Error(`Error find status payment: ${error}`);
    }
  }
}
