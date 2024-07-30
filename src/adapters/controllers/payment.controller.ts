import ConfirmPaymentParams from '@api/dtos/payment/input/confirm-payment.dto';
import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import OrderGateway from '@gateways/order.gateway';
import MercadoPagoProvider from '@providers/mercado-pago/mercado-pago.provider';
import PaymentUseCase from '@usecases/payment.usecase';

export default class PaymentController {
    private readonly _orderGateway = new OrderGateway(this._orderRepository);
    private readonly _paymentUseCase = new PaymentUseCase(this._orderGateway, this._mercadoPagoProvider);

    constructor(
        private _orderRepository: OrderRepository,
        private _mercadoPagoProvider: MercadoPagoProvider
    ) { }

    async confirmPayment({ id: externalPaymetId, topic }: ConfirmPaymentParams) {
        if (topic === "payment") {
            await this._paymentUseCase.confirmPayment(externalPaymetId);
        }
        return "ok"
    }
}
