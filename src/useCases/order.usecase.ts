import { UUID } from "crypto";
import OrderStatusEnum from "domain/enums/order-status.enum";
import ICustomerGateway from "domain/interfaces/gateways/customer.gateway";
import IOrderGateway from "domain/interfaces/gateways/order.gateway";
import CustomerModel from "domain/models/customer.model";
import OrderModel from "domain/models/order.model";
import ProductModel from "domain/models/product.model";
import IOrderInput from "domain/types/input/order.input";
import MercadoPagoProvider from "infrastructure/providers/mercadoPago/mecadoPago.provider";
import ProductUseCase from "./product.usecase";

export default class OrderUseCase {
  constructor(
    private _orderGateway: IOrderGateway,
    private _customerGateway: ICustomerGateway,
    private _mercadoPagoProvider: MercadoPagoProvider,
    private _productUseCase: ProductUseCase
  ) { }

  async orderCheckout(orderId: UUID): Promise<{ orderNumber: number }> {
    try {
      const updatedOrdersNumber = await this._orderGateway.updateOrderStatus(orderId, OrderStatusEnum.RECEPTED);
      if (updatedOrdersNumber > 0) {
        const order: OrderModel = await this._orderGateway.findById(orderId);
        return { orderNumber: order.orderNumber };
      } else {
        throw Error("Product not found")
      }
    } catch (err) {
      throw Error(err);
    }
  }

  async findOrderQueue(): Promise<Array<OrderModel>> {
    return await this._orderGateway.findQueue();
  }

  async findAllOrderUseCase(): Promise<Array<OrderModel>> {
    return await this._orderGateway.findAll();
  }

  async createOrder(orderInput: IOrderInput): Promise<{ qr_data: string }> {
    try {
      const products: ProductModel[] = await this._productUseCase.validateProducts(orderInput.productIds);
      const customer: CustomerModel = await this._customerGateway.findOneById(
        orderInput.customerId
      );

      const order: OrderModel = new OrderModel(
        OrderStatusEnum.PENDING,
        products,
        customer
      );

      const orderRegistered = await this._orderGateway.insert(order);
      return await this._mercadoPagoProvider.createOrder(orderRegistered);
    } catch (error) {
      throw error;
    }
  }
}