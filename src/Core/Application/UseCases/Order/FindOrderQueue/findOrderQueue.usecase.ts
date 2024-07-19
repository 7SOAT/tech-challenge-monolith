import { IOrderRepository } from "Core/Domain/Repositories/order.repository";
import { IFindOrderQueueUseCase } from "./findOrderQueue.usecase.port";
import OrderEntity from "Core/Domain/Entities/order.entity";


export class FindOrderQueueUseCase implements IFindOrderQueueUseCase {
  constructor(private _orderRepository: IOrderRepository) {}

  async execute(): Promise<Array<OrderEntity>> {
    return await this._orderRepository.findQueue();
  }
}
