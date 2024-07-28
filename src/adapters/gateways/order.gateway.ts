import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import IOrderGateway from '@interfaces/datasource/order.gateway';
import OrderModel from '@models/order.model';
import { plainToInstance } from 'class-transformer';
import CustomerEntity from 'core/entities/customer.entity';
import OrderEntity from 'core/entities/order.entity';
import ProductEntity from 'core/entities/product.entity';
import OrderStatusEnum from 'core/enums/order-status.enum';
import { UUID } from 'crypto';


export default class OrderGateway implements IOrderGateway {
  constructor(
    private _orderRepository: OrderRepository
  ) { }

  async findAll(): Promise<Array<OrderEntity>> {
    try {
      const result: OrderModel[] = await this._orderRepository.findAll();
      return plainToInstance<Array<OrderEntity>, Array<OrderModel>>(
        Array<OrderEntity>,
        result,
        { enableImplicitConversion: true }
      );
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }

  async findById(id: UUID): Promise<OrderEntity> {
    try {
      const result = await this._orderRepository.findById(id);
      return plainToInstance<OrderEntity, OrderModel>(
        OrderEntity,
        result,
        { enableImplicitConversion: true }
      );
    } catch (error) {
      throw new Error(`Error finding order: ${error}`)
    }
  }

  async findQueue(): Promise<Array<OrderEntity>> {
    try {
      const result: OrderModel[] = await this._orderRepository.findQueue()

      return plainToInstance<OrderEntity, OrderModel>(
        OrderEntity,
        result,
        { enableImplicitConversion: true }
      );
    } catch (error) {
      throw new Error(`Error finding orders queue: ${error}`);
    }
  }

  async insert(order: OrderEntity): Promise<OrderEntity> {
    try {

      const orderDataModel = plainToInstance<OrderModel, OrderEntity>(
        OrderModel,
        order,
        { enableImplicitConversion: true, enableCircularCheck: true }
      );

      const result = await this._orderRepository.insert(orderDataModel);

      return new OrderEntity(
        result.status.id,
        result.products.map(({ name, description, price, category, id }) => new ProductEntity(
          name,
          description,
          price,
          category,
          id,
        )),
        new CustomerEntity("a", "b", "c"),
        result.orderNumber,
        <UUID>result.id
      );
    } catch (error) {
      throw new Error(`Error inserting order: ${error}`);
    }
  }

  async updateOrderStatus(orderId: UUID, statusEnum: OrderStatusEnum): Promise<number> {
    try {
      const result = await this._orderRepository.updateOrderStatus(orderId, statusEnum);
      return result;
    } catch (error) {
      throw new Error(`Error updating status: ${error}`);
    }
  }
}
