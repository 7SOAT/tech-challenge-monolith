import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;
  private payment: Payment;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
      options: { timeout: 5000, idempotencyKey: process.env.MERCADOPAGO_IDEMPOTENCY_KEY },
    });
    this.payment = new Payment(this.client);
  }


  async createPayment(body: PaymentCreateRequest): Promise<any> {
    try {
      return await this.payment.create({ body });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
