import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';
import OrderStatusEnum from 'core/enums/order-status.enum';
import IOrderGateway from '@interfaces/gateways/order.gateway';
import CustomerEntity from 'core/entities/customer.entity';
import OrderEntity from 'core/entities/order.entity';
import OrderStatusEntity from 'core/entities/order-status.entity';
import ProductEntity from 'core/entities/product.entity';
import OrderModel  from '@models/order.model';
import { Repository } from 'typeorm';


export default class OrderGateway implements IOrderGateway {
  constructor(
    @InjectRepository(OrderModel)
    private _orderRepository: Repository<OrderModel>
  ) { }

  async findAll(): Promise<Array<OrderEntity>> {
    try {
      const result: OrderModel[] = await this._orderRepository.find({ relations: ['products'] });
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
      const result = await this._orderRepository.findOneBy({ id: id.toString() });
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
      const result: OrderModel[] = await this._orderRepository.find({
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

      const result = await this._orderRepository.save(orderDataModel);

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
      const result = await this._orderRepository.update(orderId.toString(), { status: new OrderStatusEntity(statusEnum) });
      return result.affected;
    } catch (error) {
      throw new Error(`Error updating status: ${error}`);
    }
  }
}
