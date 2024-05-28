import OrderEntity from "Core/Domain/Entities/order.entity";
import { IOrderRepository } from "Core/Domain/Repositories/order.repository";
import { OrderTypeOrmEntity } from "../Entities/order.typeorm.entity";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";

export class OrderTypeOrmRepository implements IOrderRepository {
  constructor(private _orderRepository: Repository<OrderTypeOrmEntity>) {}

  async insert(order: OrderEntity): Promise<void> {
    try {
      const { getProducts, getOrderStatus, getTotalValue } = order;
      await this._orderRepository.save({
        orderStatus: getOrderStatus,
        totalValue: getTotalValue,
        products: getProducts,
      });
    } catch (error) {
      throw new Error(`Error inserting order: ${error}`);
    }
  }

  async findAll(): Promise<Array<OrderEntity>> {
    try {
      const result = await this._orderRepository.find({ relations: ["products"]});
      console.log(result);

      const resultMap = plainToInstance(OrderEntity, result);
      console.log(resultMap);

      return resultMap;
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }
}
