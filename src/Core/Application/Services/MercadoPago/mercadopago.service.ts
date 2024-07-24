import { IMercadoPagoService } from '../interfaces/mercadopago.interface';
import { MercadoPagoProvider } from 'Adapters/Driven/Providers/MercadoPago/MecadoPago.provider';


export class MercadoPagoService implements IMercadoPagoService {
  constructor(private _mercadoPagoProvider: MercadoPagoProvider) {}

  async createOrder(): Promise<any> {
    try {
      return await this._mercadoPagoProvider.createOrder({
        cash_out: {
          amount: 0
        },
        description: "Purchase description.",
        external_reference: "reference_12345",
        items: [
          {
            sku_number: "A123K9191938",
            category: "marketplace",
            title: "Point Mini",
            description: "This is the Point Mini",
            unit_price: 10,
            quantity: 1,
            unit_measure: "unit",
            total_amount: 10
          }
        ],
        notification_url: "https://tech-challenge-monolith.onrender.com/webhook",
        sponsor: {
          id: 1907353240
        },
        title: "Product order",
        total_amount: 10
      });
    } catch (error) {
      throw new Error(`Error create payment: ${error}`);
    }
  }
}
