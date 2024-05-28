import { IOrderRepository } from "Core/Domain/Repositories/order.repository";
import { IFindAllOrderUseCase } from "./findAllOrder.usecase.port";
import OrderEntity from "Core/Domain/Entities/order.entity";


export class FindAllOrderUseCase implements IFindAllOrderUseCase {
  constructor(private _orderRepository: IOrderRepository) {}

  async execute(): Promise<Array<OrderEntity>> {
    return await this._orderRepository.findAll();
  }
}
