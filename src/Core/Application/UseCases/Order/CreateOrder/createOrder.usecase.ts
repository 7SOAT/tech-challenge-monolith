import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { ICreateOrderUseCase } from './createOrder.usecase.port';
import IOrderInput from 'Core/Application/Ports/Input/order.input';
import OrderEntity from 'Core/Domain/Entities/order.entity';
import { IProductRepository } from 'Core/Domain/Repositories/product.repository';
import { OrderStatus } from 'Core/Domain/Enums/orderStatus.enum';

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private _orderRepository: IOrderRepository,
    private _productRepository: IProductRepository
  ) {}

  async execute(orderInput: IOrderInput): Promise<void> {
    try {
      const products = [];
      for (const productId of orderInput.productIds) {
        const resultProduct = await this._productRepository.findOneById(
          productId
        );
        if (!resultProduct) {
          products.push(resultProduct);
        }
      }

      const totalValueOrder: number = products
        .map((product) => Number(product.price))
        .reduce((a, b) => a + b, 0);

      //ADD FIND AND INSERT CUSTOMER

      const order = new OrderEntity(
        OrderStatus.IN_PROGRESS,
        totalValueOrder,
        products
      );

      this._orderRepository.insert(order);
    } catch (error) {
      throw error;
    }
  }
}
