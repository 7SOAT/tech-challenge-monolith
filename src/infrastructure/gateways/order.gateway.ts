import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';
import { IOrderGateway } from 'domain/interfaces/gateways/order.gateway';
import OrderStatusModel from 'domain/models/orderStatus.model';
import { OrderStatusEnum } from 'domain/enums/orderStatus.enum';
import { Repository } from 'typeorm';
import { OrderEntity } from 'infrastructure/entities/order.entity';
import OrderModel from 'domain/models/order.model';
import { InjectRepository } from '@nestjs/typeorm';


export class OrderGateway implements IOrderGateway {
  constructor(
    @InjectRepository(OrderEntity)
    private _orderRepository: Repository<OrderEntity>
  ) { }

  async findAll(): Promise<Array<OrderModel>> {
    try {
      const result: OrderEntity[] = await this._orderRepository.find({ relations: ['products']});
      return plainToInstance<OrderModel, OrderEntity>(
        OrderModel,
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
      const sla = plainToInstance<OrderModel, OrderEntity>(
        OrderModel,
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
      await this._orderRepository.update(orderId.toString(), { status: new OrderStatusModel(status) });
      console.log("Pedido atualizado!")
    } catch (error) {
      throw new Error(`Error updating status webhook: ${error}`);
    }
  }
}
