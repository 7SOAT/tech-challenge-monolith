import ConfirmPaymentParams from '@api/dtos/payment/input/confirm-payment.dto';
import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import OrderGateway from '@gateways/order.gateway';
import MercadoPagoProvider from '@providers/mercado-pago/mercado-pago.provider';
import PaymentUseCase from '@usecases/payment.usecase';
import PaymentPresenter from 'adapters/presenters/payment.presenter';

export default class PaymentController {
  private readonly _orderGateway = new OrderGateway(this._orderRepository);
  private readonly _paymentUseCase = new PaymentUseCase(
    this._orderGateway,
    this._mercadoPagoProvider
  );

  constructor(
    private _orderRepository: OrderRepository,
    private _mercadoPagoProvider: MercadoPagoProvider
  ) {}

  async confirmPayment({ id: externalPaymentId, topic }: ConfirmPaymentParams): Promise<PaymentDto> {
    if (topic === 'payment') {
      const { orderNumber } = await this._paymentUseCase.confirmPayment(externalPaymentId);
      return PaymentPresenter.PresentOne(orderNumber);
    }
  }
}
