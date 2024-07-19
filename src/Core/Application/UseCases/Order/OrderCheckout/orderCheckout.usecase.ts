import { IOrderRepository } from "Core/Domain/Repositories/order.repository";
import { IOrderCheckoutUseCase } from "./orderCheckout.usecase.port";
import { OrderStatus } from "Core/Domain/Enums/orderStatus.enum";
import { UUID } from "typeorm/driver/mongodb/bson.typings";


export class OrderCheckoutUseCase implements IOrderCheckoutUseCase {
  constructor(private _orderRepository: IOrderRepository) {}

  async execute(orderId: UUID): Promise<{orderNumber: number}> {
    await this._orderRepository.updateOrderStatus(orderId, OrderStatus.CHECKED_OUT)
    const order = await this._orderRepository.findById(orderId)

    return { orderNumber: order.orderNumber }
  }
}
