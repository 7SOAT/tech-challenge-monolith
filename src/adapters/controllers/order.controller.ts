import CheckoutOrderDto from '@api/dtos/order/input/checkout-order.dto';
import CustomerRepository from '@datasource/typeorm/repositories/customer.repository';
import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import ProductRepository from '@datasource/typeorm/repositories/product.repository';
import OrderEntity from '@entities/order/order.entity';
import ProductEntity from '@entities/product.entity';
import CustomerGateway from '@gateways/customer.gateway';
import OrderGateway from '@gateways/order.gateway';
import ProductGateway from '@gateways/product.gateway';
import MercadoPagoProvider from '@providers/mercado-pago/mercado-pago.provider';
import OrderUseCase from '@usecases/order.usecase';
import OrderPresenter from 'adapters/presenters/order.presenter';

export default class OrderController {
    private readonly _orderGateway = new OrderGateway(this._orderRepository);
    private readonly _customerGateway = new CustomerGateway(this._customerRepository);
    private readonly _productGateway = new ProductGateway(this._productRepository);

    private readonly _orderUseCase = new OrderUseCase(
        this._orderGateway, 
        this._customerGateway, 
        this._productGateway, 
        this._mercadoPagoProvider);

  constructor(
    private _orderRepository: OrderRepository,
    private _customerRepository: CustomerRepository,
    private _productRepository: ProductRepository,
    private _mercadoPagoProvider: MercadoPagoProvider
  ) { }

  async findAllOrders() {
      return OrderPresenter.PresentMany(await this._orderUseCase.findAllOrders());
  }

  async findOrdersQueue() {
      return OrderPresenter.PresentMany(await this._orderUseCase.findOrdersQueue());
  }

  async checkoutOrder({ productIds, customerId }: CheckoutOrderDto) {
    return await this._orderUseCase.checkoutOrder(productIds, customerId);
  }
}