import ProductEntity from 'Core/Domain/Entities/product.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export interface IOrderCheckoutUseCase {
  execute(orderId: UUID, orderProducts: ProductEntity[]): Promise<{orderNumber: number}>;
}
