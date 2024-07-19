import OrderEntity from 'Core/Domain/Entities/order.entity';
import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { OrderTypeOrmEntity } from '../../TypeORM/Entities/order.typeorm.entity';
import { OrderStatus } from 'Core/Domain/Enums/orderStatus.enum';


export default class OrderRepository implements IOrderRepository {
  private _orders: Array<OrderEntity>;
  constructor() {
    this._orders = new Array<OrderEntity>();
  }
  findAll(): Promise<OrderEntity[]> {
    throw new Error('Method not implemented.');
  }

  insert(order: OrderEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: UUID): Promise<OrderTypeOrmEntity> {
    throw new Error('Method not implemented.');
  }

  updateOrderStatus(id: UUID, status: OrderStatus): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
