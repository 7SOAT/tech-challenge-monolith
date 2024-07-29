import IOrderGateway from "@interfaces/datasource/order.gateway";
import MercadoPagoProvider from "@providers/mercado-pago/mercado-pago.provider";
import MPCreateOrderRequest from "@providers/mercado-pago/types/mercado-pago.request.types";
import OrderEntity from "core/entities/order/order.entity";
import OrderStatusEnum from "core/enums/order-status.enum";

export default class PaymentUseCase {
    constructor(
        private _orderGateway: IOrderGateway,
        private _mercadoPagoProvider: MercadoPagoProvider
    ) {
    }

    async confirmPayment(externalPaymentId: number): Promise<{ orderNumber: number }> {
        try {
            const { external_reference: orderId }: MPCreateOrderRequest = await this._mercadoPagoProvider.findPaymentById(externalPaymentId);
            const updatedOrdersNumber = await this._orderGateway.updateOrderStatus(orderId, OrderStatusEnum.RECEPTED);
            if (updatedOrdersNumber > 0) {
                const order: OrderEntity = await this._orderGateway.findById(orderId);
                return { orderNumber: order.orderNumber };
            } else {
                throw Error("Product not found")
            }
        } catch (err) {
            throw Error(err);
        }
    }

}