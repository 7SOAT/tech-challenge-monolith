import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';
import OrderEntity from 'entities/order.entity';
import OrderStatusEntity from 'entities/orderStatus.entity';
import { OrderStatusEnum } from 'enums/orderStatus.enum';
import { OrderModel } from 'infra/database/models/order.model';
import { IOrderRepository } from 'interfaces/gateways/order.gateway';
import { Repository } from 'typeorm';


export class OrderGateway implements IOrderRepository {
  constructor(private _orderRepository: Repository<OrderModel>) { }

  async findAll(): Promise<Array<OrderEntity>> {
    try {
      const result = await this._orderRepository.find({ relations: ['products']});
      return plainToInstance<OrderEntity, OrderModel>(
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

      const resultMap = plainToInstance<OrderEntity, OrderModel>(
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

      const orderDataModel = plainToInstance<OrderModel, OrderEntity>(
        OrderModel,
        order,
        { enableImplicitConversion: true, enableCircularCheck: true }
      );

      const result = await this._orderRepository.save(orderDataModel);
      const sla = plainToInstance<OrderEntity, OrderModel>(
        OrderEntity,
        result,
        { enableImplicitConversion: true,
          enableCircularCheck: true}
      );
      return sla;
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
