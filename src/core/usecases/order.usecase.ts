import { UUID } from "crypto";
import OrderStatusEnum from "core/enums/order-status.enum";
import ICustomerGateway from "@interfaces/gateways/customer.gateway";
import IOrderGateway from "@interfaces/gateways/order.gateway";
import CustomerEntity from "core/entities/customer.entity";
import OrderEntity from "core/entities/order.entity";
import ProductEntity from "core/entities/product.entity";
import IOrderInput from "core/types/input/order.input";
import MercadoPagoProvider from "@providers/mercado-pago/mercado-pago.provider";
import ProductUseCase from "@usecases/product.usecase";

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
        const order: OrderEntity = await this._orderGateway.findById(orderId);
        return { orderNumber: order.orderNumber };
      } else {
        throw Error("Product not found")
      }
    } catch (err) {
      throw Error(err);
    }
  }

  async findOrderQueue(): Promise<Array<OrderEntity>> {
    return await this._orderGateway.findQueue();
  }

  async findAllOrderUseCase(): Promise<Array<OrderEntity>> {
    return await this._orderGateway.findAll();
  }

  async createOrder(orderInput: IOrderInput): Promise<{ qr_data: string }> {
    try {
      const products: ProductEntity[] = await this._productUseCase.validateProducts(orderInput.productIds);
      const customer: CustomerEntity = await this._customerGateway.findOneById(
        orderInput.customerId
      );

      const order: OrderEntity = new OrderEntity(
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