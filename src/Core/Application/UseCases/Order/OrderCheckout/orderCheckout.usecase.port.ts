import ProductEntity from 'Core/Domain/Entities/product.entity';
import { UUID } from 'crypto';

export interface IOrderCheckoutUseCase {
  execute(orderId: UUID, orderProducts: ProductEntity[]): Promise<{orderNumber: number}>;
}
