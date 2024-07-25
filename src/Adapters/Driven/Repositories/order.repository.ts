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
import ProductEntity from 'Core/Domain/Entities/product.entity';
import { UUID } from 'crypto';


export class OrderTypeOrmRepository implements IOrderRepository {
  constructor(private _orderRepository: Repository<OrderTypeOrmEntity>) { }

  async findAll(): Promise<Array<OrderEntity>> {
    try {
      const result = await this._orderRepository.find({ relations: ['products']});
      return plainToInstance<OrderEntity, OrderTypeOrmEntity>(
        OrderEntity,
        result,
        { enableImplicitConversion: true }
      );
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }

  async updateOrderStatus(id: UUID, statusEnum: OrderStatusEnum): Promise<void> {
    try {
      await this._orderRepository.update(id.toString(), { status: { id: statusEnum } });
    } catch (error) {
      throw new Error(`Error while updating order: ${error}`)
    }
  }

  async findById(id: UUID): Promise<OrderEntity> {
    try {
      const result = await this._orderRepository.findOneBy({ id: id.toString() });
      return plainToInstance<OrderEntity, OrderTypeOrmEntity>(
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
        result,
        { enableImplicitConversion: true }
      );

      return resultMap;
    } catch (error) {
      throw new Error(`Error finding orders queue: ${error}`);
    }
  }

  async insert(order: OrderEntity): Promise<OrderEntity> {
    try {

      const orderDataModel = plainToInstance<OrderTypeOrmEntity, OrderEntity>(
        OrderTypeOrmEntity,
        order,
        { enableImplicitConversion: true }
      );

      const result = await this._orderRepository.save(orderDataModel);

      return plainToInstance<OrderEntity, OrderTypeOrmEntity>(
        OrderEntity,
        result,
        { enableImplicitConversion: true }
      );
    } catch (error) {
      throw new Error(`Error inserting order: ${error}`);
    }
  }

  async updateStatusWebhook(orderId: UUID, status: OrderStatusEnum): Promise<void> {
    try {
      await this._orderRepository.update(orderId.toString(), { status: new OrderStatusEntity(status) });
      console.log("Pedido atualizado!")
    } catch (error) {
      throw new Error(`Error updating status webhook: ${error}`);
    }
  }
}
