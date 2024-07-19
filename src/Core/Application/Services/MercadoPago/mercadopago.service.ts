import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';
import { IMercadoPagoService } from '../interfaces/mercadopago.interface';
import { MercadoPagoConfig, Payment } from 'mercadopago';


export class MercadoPagoService implements IMercadoPagoService {
  private client: MercadoPagoConfig;
  private payment: Payment;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
      options: { timeout: 5000 },
    });
    this.payment = new Payment(this.client);
  }

  async createPayment(body: PaymentCreateRequest): Promise<any> {
    try {
      return await this.payment.create({ body });
    } catch (error) {
      throw new Error(`Error create payment: ${error}`);
    }
  }
}
