import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { ICreateOrderUseCase } from './createOrder.usecase.port';
import IOrderInput from 'Core/Application/Ports/Input/order.input';
import OrderEntity from 'Core/Domain/Entities/order.entity';
import { IProductRepository } from 'Core/Domain/Repositories/product.repository';
import { OrderStatus } from 'Core/Domain/Enums/orderStatus.enum';
import { ICustomerRepository } from 'Core/Domain/Repositories/customer.repository';
import { Logger } from '@nestjs/common';
import { IMercadoPagoService } from 'Core/Application/Services/interfaces/mercadopago.interface';

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private _orderRepository: IOrderRepository,
    private _productRepository: IProductRepository,
    private _customerRepository: ICustomerRepository,
    private _mercadoPagoService: IMercadoPagoService,
  ) {}

  async execute(orderInput: IOrderInput): Promise<void> {
    try {
      const products = [];
      for (const productId of orderInput.productIds) {
        const resultProduct = await this._productRepository.findOneById(
          productId
        );

        if (resultProduct) {
          products.push(resultProduct);
        } else {
          throw new Error("Client/product not found")
        }
      }

      const totalValueOrder: number = products
        .map((product) => Number(product.price))
        .reduce((a, b) => a + b, 0);

      const customer = await this._customerRepository.findOneById(
        orderInput.customerId
      );

      const order = new OrderEntity(
        OrderStatus.IN_PROGRESS,
        totalValueOrder,
        customer,
        products
      );

      this._orderRepository.insert(order);
    } catch (error) {
      throw error;
    }
  }
}
