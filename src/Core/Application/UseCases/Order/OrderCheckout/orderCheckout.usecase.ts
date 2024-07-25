import OrderEntity from "Core/Domain/Entities/order.entity";
import { OrderStatusEnum } from "Core/Domain/Enums/orderStatus.enum";
import { IOrderRepository } from "Core/Domain/Repositories/order.repository";
import { UUID } from "crypto";
import { IOrderCheckoutUseCase } from "./orderCheckout.usecase.port";

export class OrderCheckoutUseCase implements IOrderCheckoutUseCase {
  constructor(private _orderRepository: IOrderRepository) { }

  async execute(orderId: UUID): Promise<{ orderNumber: number }> {
    await this._orderRepository.updateOrderStatus(orderId, OrderStatusEnum.RECEPTED)
    const { orderNumber }: OrderEntity = await this._orderRepository.findById(orderId)

    return { orderNumber };
  }
}