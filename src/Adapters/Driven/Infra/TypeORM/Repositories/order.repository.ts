import OrderEntity from "Core/Domain/Entities/order.entity";
import { IOrderRepository } from "Core/Domain/Repositories/order.repository";
import { OrderTypeOrmEntity } from "../Entities/order.typeorm.entity";
import { Repository } from "typeorm";
import OrderMapper from "../Mappers/order.mapper";

export class OrderTypeOrmRepository implements IOrderRepository {
  constructor(private _orderRepository: Repository<OrderTypeOrmEntity>) {}

  async insert(order: OrderEntity): Promise<void> {
    try {
      await this._orderRepository.save(order);
    } catch (error) {
      throw new Error(`Error inserting order: ${error}`);
    }
  }

  async findAll(): Promise<Array<OrderEntity>> {
    try {
      const result = await this._orderRepository.find();

      return result.map(OrderMapper.mapToDomainEntity);
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }
}
