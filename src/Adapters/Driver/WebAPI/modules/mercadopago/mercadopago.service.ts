import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;
  private payment: Payment;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: 'YOUR_ACCESS_TOKEN',
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });
    this.payment = new Payment(this.client);
  }


  async createPayment(paymentData: any) {
    const requestOptions = {
      idempotencyKey: 'UNIQUE_IDEMPOTENCY_KEY',
    };

    try {
      const response = await this.payment.create({ body: paymentData, requestOptions });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
