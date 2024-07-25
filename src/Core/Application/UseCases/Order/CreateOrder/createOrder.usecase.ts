import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { ICreateOrderUseCase } from './createOrder.usecase.port';
import IOrderInput from 'Core/Application/Ports/Input/order.input';
import OrderEntity from 'Core/Domain/Entities/order.entity';
import { IProductRepository } from 'Core/Domain/Repositories/product.repository';
import { OrderStatusEnum } from 'Core/Domain/Enums/orderStatus.enum';
import { ICustomerRepository } from 'Core/Domain/Repositories/customer.repository';
import { IMercadoPagoService } from 'Core/Application/Services/interfaces/mercadopago.interface';
import ProductEntity from 'Core/Domain/Entities/product.entity';
import CustomerEntity from 'Core/Domain/Entities/customer.entity';

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private _orderRepository: IOrderRepository,
    private _productRepository: IProductRepository,
    private _customerRepository: ICustomerRepository,
    private _mercadoPagoService: IMercadoPagoService
  ) {}
s
  async execute(orderInput: IOrderInput): Promise<{qr_data: string}> {
    try {
      const products: ProductEntity[] = await this.ValidateProducts(orderInput);
      const customer: CustomerEntity = await this._customerRepository.findOneById(
        orderInput.customerId
      );

      const order: OrderEntity = new OrderEntity(
        OrderStatusEnum.PENDING,
        products,
        customer
      );

      await this._orderRepository.insert(order);
      return await this._mercadoPagoService.createOrder(order);
    } catch (error) {
      throw error;
    }
  }

  private async ValidateProducts(orderInput: IOrderInput): Promise<ProductEntity[]> {
    return await Promise.all(orderInput.productIds.map(async productId => {
      const resultProduct: ProductEntity = await this._productRepository.findOneById(productId);

      if (!resultProduct) {
        throw new Error(`Product not found: ${productId}`);
      }

      return resultProduct;
    }));
  }
}
