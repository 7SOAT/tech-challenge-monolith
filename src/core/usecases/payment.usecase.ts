
import PaymentProviderGateway from "@gateways/payment-provider.gateway";
import IOrderGateway from "@interfaces/datasource/order.gateway";
import OrderStatusEnum from "core/enums/order-status.enum";
import { UUID } from "crypto";

export default class PaymentUseCase {
    constructor(
        private _orderGateway: IOrderGateway,
        private _paymentProviderGateway: PaymentProviderGateway
    ) {
    }

    async confirmPayment(externalPaymentId: number): Promise<void> {
        try {
            const external_reference = await this._paymentProviderGateway.findPaymentById(externalPaymentId);
            const orderId = <UUID> external_reference;
            const updatedOrdersNumber = await this._orderGateway.updateOrderStatus(orderId, OrderStatusEnum.RECEPTED);
            if (updatedOrdersNumber > 0) {
                await this._orderGateway.findById(orderId);
            } else {
                throw Error("Product not found")
            }
        } catch (err) {
            throw Error(err);
        }
    }

    async createPayment(orderId: UUID): Promise<{ qr_data: string }> {
        try {
            const order = await this._orderGateway.findById(orderId);
            if (order) {
                return await this._paymentProviderGateway.createOrderPayment(order);
            } else {
                throw Error("Order not found")
            }
        } catch (err) {
            throw Error(err);
        }
    }

}