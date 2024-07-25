import OrderEntity from 'entities/order.entity';
import { CreatePaymentRequest, MercadoPagoProvider } from 'infra/providers/mercadoPago/mecadoPago.provider';
import { IMercadoPagoService } from '../interfaces/mercadopago.interface';


export class MercadoPagoService implements IMercadoPagoService {
  constructor(private _mercadoPagoProvider: MercadoPagoProvider) { }

  async createOrder(order: OrderEntity): Promise<{ qr_data: string }> {
    try {
      const request: CreatePaymentRequest = {
        cash_out: {
          amount: 0
        },
        description: "Purchase description.",
        external_reference: order.id.toString(),
        items: order.products.map((product) => {
          return {
            sku_number: product.id.toString(),
            category: product.category,
            title: product.name,
            description: product.description,
            unit_price: product.price,
            quantity: 1,
            unit_measure: "unit",
            total_amount: product.price
          }
        }),
        sponsor: {
          id: 1907353240
        },
        title: "Combo Completo",
        total_amount: order.totalValue
      };
      return await this._mercadoPagoProvider.createOrder(request);
    } catch (error) {
      throw new Error(`Error create payment: ${error}`);
    }
  }
}
