import { IOrderRepository } from "Core/Domain/Repositories/order.repository";
import { IOrderCheckoutUseCase } from "./orderCheckout.usecase.port";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { OrderStatusEnum } from "Core/Domain/Enums/orderStatus.enum";
import { OrderTypeOrmEntity } from "Adapters/Driven/Entities/order.typeorm.entity";


export class OrderCheckoutUseCase implements IOrderCheckoutUseCase {
  constructor(private _orderRepository: IOrderRepository) { }

  async execute(orderId: UUID): Promise<{orderNumber: number}> {
    await this._orderRepository.updateOrderStatus(orderId, OrderStatusEnum.RECEPTED)
    const { orderNumber }: OrderTypeOrmEntity = await this._orderRepository.findById(orderId)

    return { orderNumber };
  }
}
