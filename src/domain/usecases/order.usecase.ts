import { UUID } from "crypto";
import OrderStatusEnum from "@enums/order-status.enum";
import ICustomerGateway from "@interfaces/gateways/customer.gateway";
import IOrderGateway from "@interfaces/gateways/order.gateway";
import CustomerModel from "@entities/customer.model";
import OrderModel from "@entities/order.model";
import ProductModel from "@entities/product.model";
import IOrderInput from "@type/input/order.input";
import MercadoPagoProvider from "@providers//mercado-pago/mercado-pago.provider";
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