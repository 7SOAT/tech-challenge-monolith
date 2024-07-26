import { IOrderGateway } from "domain/interfaces/gateways/order.gateway";
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';
import { UUID } from "crypto";
import { OrderStatusEnum } from "domain/enums/orderStatus.enum";
import { MercadoPagoProvider } from "infrastructure/providers/mercadoPago/mecadoPago.provider";

export class WebhookUseCase{
  constructor(
    private readonly _mercadoPagoProvider: MercadoPagoProvider,
    private readonly _orderGateway: IOrderGateway
  ) { }

  async findPaymentByPaymentId(paymentId: string): Promise<any> {
    const responseData = await this._mercadoPagoProvider.findPaymentById(paymentId);
    const {status: externalPaymentstatus, external_reference}: PaymentResponse = responseData;
    await this._orderGateway.updateStatusWebhook((<UUID> external_reference), OrderStatusEnum.RECEPTED);
  }
}