import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';
import OrderStatusEnum from 'domain/enums/orderStatus.enum';
import IOrderGateway from 'domain/interfaces/gateways/order.gateway';
import CustomerModel from 'domain/models/customer.model';
import OrderModel from 'domain/models/order.model';
import OrderStatusModel from 'domain/models/orderStatus.model';
import ProductModel from 'domain/models/product.model';
import OrderEntity  from 'infrastructure/entities/order.entity';
import { Repository } from 'typeorm';


export default class OrderGateway implements IOrderGateway {
  constructor(
    @InjectRepository(OrderEntity)
    private _orderRepository: Repository<OrderEntity>
  ) { }

  async findAll(): Promise<Array<OrderModel>> {
    try {
      const result: OrderEntity[] = await this._orderRepository.find({ relations: ['products'] });
      return plainToInstance<OrderModel, OrderEntity>(
        OrderModel,
        result,
        { enableImplicitConversion: true }
      );
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }

  async findById(id: UUID): Promise<OrderModel> {
    try {
      const result = await this._orderRepository.findOneBy({ id: id.toString() });
      return plainToInstance<OrderModel, OrderEntity>(
        OrderModel,
        result,
        { enableImplicitConversion: true }
      );
    } catch (error) {
      throw new Error(`Error finding order: ${error}`)
    }
  }

  async findQueue(): Promise<Array<OrderModel>> {
    try {
      const result: OrderEntity[] = await this._orderRepository.find({
        relations: ['status', "products"],
        where: [
          { status: { id: OrderStatusEnum.RECEPTED } },
          { status: { id: OrderStatusEnum.IN_PREPARATION } },
          { status: { id: OrderStatusEnum.READY } }
        ],
        order: {
          status: { priorityOrder: 'ASC' },
          createdAt: 'ASC'
        },
      })

      return plainToInstance<OrderModel, OrderEntity>(
        OrderModel,
        result,
        { enableImplicitConversion: true }
      );

    } catch (error) {
      throw new Error(`Error finding orders queue: ${error}`);
    }
  }

  async insert(order: OrderModel): Promise<OrderModel> {
    try {

      const orderDataModel = plainToInstance<OrderEntity, OrderModel>(
        OrderEntity,
        order,
        { enableImplicitConversion: true, enableCircularCheck: true }
      );

      const result = await this._orderRepository.save(orderDataModel);

      return new OrderModel(
        result.status.id,
        result.products.map(({ name, description, price, category, id }) => new ProductModel(
          name,
          description,
          price,
          category,
          id,
        )),
        new CustomerModel("a", "b", "c"),
        result.orderNumber,
        <UUID>result.id
      );
    } catch (error) {
      throw new Error(`Error inserting order: ${error}`);
    }
  }

  async updateOrderStatus(orderId: UUID, statusEnum: OrderStatusEnum): Promise<number> {
    try {
      const result = await this._orderRepository.update(orderId.toString(), { status: new OrderStatusModel(statusEnum) });
      return result.affected;
    } catch (error) {
      throw new Error(`Error updating status: ${error}`);
    }
  }
}
