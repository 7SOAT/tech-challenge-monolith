import OrderEntity from 'Core/Domain/Entities/order.entity';
import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { OrderTypeOrmEntity } from '../Entities/order.typeorm.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { OrderStatusEnum } from 'Core/Domain/Enums/orderStatus.enum';
import OrderStatusEntity from 'Core/Domain/Entities/orderStatus.entity';
import { CustomerTypeOrmEntity } from '../Entities/customer.typeorm.entity';
import CustomerEntity from 'Core/Domain/Entities/customer.entity';
import { ProductTypeOrmEntity } from '../Entities/product.typeorm.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import ProductEntity from 'Core/Domain/Entities/product.entity';
import { OrderStatusTypeOrmEntity } from '../Entities/orderStatus.typeorm.entity';


export class OrderTypeOrmRepository implements IOrderRepository {
  constructor(private _orderRepository: Repository<OrderTypeOrmEntity>) { }

  async findAll(): Promise<Array<OrderEntity>> {
    try {
      const result = await this._orderRepository.find({ relations: ['products'] });

      const resultMap = plainToInstance<OrderEntity, OrderTypeOrmEntity>(
        OrderEntity,
        result
      );

      return resultMap;
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }

  async updateOrderStatus(id: UUID, statusEnum: OrderStatusEnum): Promise<void> {
    try {
      await this._orderRepository.update(id.toString(), {status: {id: statusEnum}});
    } catch (error) {
      throw new Error(`Error while updating order: ${error}`)
    }
  }

  async findById(id: UUID): Promise<OrderTypeOrmEntity> {
    try {
      return await this._orderRepository.findOneBy({ id: id.toString() })
    } catch (error) {
      throw new Error(`Error finding order: ${error}`)
    }
  }

  async findQueue(): Promise<Array<OrderEntity>> {
    try {
      const result = await this._orderRepository.find({
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

      const resultMap = plainToInstance<OrderEntity, OrderTypeOrmEntity>(
        OrderEntity,
        result
      );

      return resultMap;
    } catch (error) {
      throw new Error(`Error finding orders queue: ${error}`);
    }
  }

  async insert(order: OrderEntity): Promise<OrderTypeOrmEntity> {
    try {
      const { id, products, status, totalValue, customer } = order;
      const mappedCustomer = plainToInstance<
        CustomerTypeOrmEntity,
        CustomerEntity
      >(CustomerTypeOrmEntity, customer);

      const mappedProducts = plainToInstance<
        ProductTypeOrmEntity,
        ProductEntity
      >(ProductTypeOrmEntity, products);

      return await this._orderRepository.save({
        id: id,
        totalValue: totalValue,
        customer: mappedCustomer,
        products: mappedProducts,
        status: new OrderStatusEntity(status)
      });
    } catch (error) {
      throw new Error(`Error inserting order: ${error}`);
    }
  }

  async updateStatusWebhook(orderId: string, status: OrderStatusEnum): Promise<void> {
    try {
      await this._orderRepository.update(orderId, { status: new OrderStatusEntity(status) });
    } catch (error) {
      throw new Error(`Error updating status webhook: ${error}`);
    }
  }
}
