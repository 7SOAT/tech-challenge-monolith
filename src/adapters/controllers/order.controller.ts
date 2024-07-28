import { ICheckoutOrderInput, ICreateOrderInput } from '@type/input/order.input';
import CustomerRepository from '@datasource/typeorm/repositories/customer.repository';
import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import ProductRepository from '@datasource/typeorm/repositories/product.repository';
import CustomerGateway from '@gateways/customer.gateway';
import OrderGateway from '@gateways/order.gateway';
import ProductGateway from '@gateways/product.gateway';
import MercadoPagoProvider from '@providers/mercado-pago/mercado-pago.provider';
import MPCreateOrderRequest from '@providers/mercado-pago/types/mercado-pago.request.types';
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
      return OrderPresenter.Orders(await this._orderUseCase.findAllOrders());
  }

  async findOrdersQueue() {
      return OrderPresenter.Orders(await this._orderUseCase.findOrdersQueue());
  }

  async createOrder(order: ICreateOrderInput) {
      return await this._orderUseCase.createOrder(order);
  }

  // TODO
  async orderCheckout({id, topic}: ICheckoutOrderInput) {
      if (topic === "payment") {
        const {external_reference}: MPCreateOrderRequest = await this._mercadoPagoProvider.findPaymentById(id);
        await this._orderUseCase.orderCheckout(external_reference);
      }
      return "ok"
  }
}