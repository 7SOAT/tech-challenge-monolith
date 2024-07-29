import { Repository } from 'typeorm';
import OrderStatusModel  from '@models/order/order-status.model';
import { InjectRepository } from '@nestjs/typeorm';

export default class OrderStatusRepository {
  constructor(
    @InjectRepository(OrderStatusModel)
    private _orderRepository: Repository<OrderStatusModel>
  ) { }

  async findAll(): Promise<OrderStatusModel[]> {
    try {
     return await this._orderRepository.find();
    } catch (error) {
      throw new Error(`Error searching order status: ${error}`);
    }
  }

  async insert(orderStatus: OrderStatusModel): Promise<OrderStatusModel> {
    try {    
      return await this._orderRepository.save(orderStatus);
    } catch (error) {
      throw new Error(`Error inserting order status: ${error}`);
    }
  }
}
