import OrderEntity from 'Core/Domain/Entities/order.entity';
import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { OrderTypeOrmEntity } from '../Entities/order.typeorm.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CustomerTypeOrmEntity } from '../Entities/customer.typeorm.entity';
import CustomerEntity from 'Core/Domain/Entities/customer.entity';
import ProductEntity from 'Core/Domain/Entities/product.entity';
import { ProductTypeOrmEntity } from '../Entities/product.typeorm.entity';

export class OrderTypeOrmRepository implements IOrderRepository {
  constructor(private _orderRepository: Repository<OrderTypeOrmEntity>) {}

  async insert(order: OrderEntity): Promise<void> {
    try {
      const { getProducts, getOrderStatus, getTotalValue, getCustomer } = order;
      const mappedCustomer = plainToInstance<
        CustomerTypeOrmEntity,
        CustomerEntity
      >(CustomerTypeOrmEntity, getCustomer);

      const mappedProducts = plainToInstance<
        ProductTypeOrmEntity,
        ProductEntity
      >(ProductTypeOrmEntity, getProducts);

      await this._orderRepository.save({
        orderStatus: getOrderStatus,
        totalValue: getTotalValue,
        customer: mappedCustomer,
        products: mappedProducts,
      });
    } catch (error) {
      throw new Error(`Error inserting order: ${error}`);
    }
  }

  async findAll(): Promise<Array<OrderEntity>> {
    try {
      const result = await this._orderRepository.find({
        relations: ['products'],
      });
      const resultMap = plainToInstance<OrderEntity, OrderTypeOrmEntity>(
        OrderEntity,
        result
      );

      return resultMap;
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }
}
