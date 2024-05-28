import OrderEntity from 'Core/Domain/Entities/order.entity';

export interface IFindAllOrderUseCase {
  execute(): Promise<Array<OrderEntity>>;
}
