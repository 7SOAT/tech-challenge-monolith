import OrderEntity from 'Core/Domain/Entities/order.entity';

export interface IFindOrderQueueUseCase {
  execute(): Promise<Array<OrderEntity>>;
}
