import { UUID } from "crypto";
import { ICreateOrderInput } from "core/types/input/order.input";
import OrderStatusEnum from "core/enums/order-status.enum";
import ICustomerGateway from "@interfaces/datasource/customer.gateway";
import IOrderGateway from "@interfaces/datasource/order.gateway";
import CustomerEntity from "core/entities/customer.entity";
import OrderEntity from "core/entities/order.entity";
import ProductEntity from "core/entities/product.entity";
import MercadoPagoProvider from "@providers/mercado-pago/mercado-pago.provider";
import IProductGateway from "@interfaces/datasource/product.gateway";

export default class OrderUseCase {
  constructor(
    private _orderGateway: IOrderGateway,
    private _customerGateway: ICustomerGateway,
    private _productGateway: IProductGateway,
    private _mercadoPagoProvider: MercadoPagoProvider,
  ) {
  }

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

  async findOrdersQueue(): Promise<Array<OrderEntity>> {
    return await this._orderGateway.findQueue();
  }

  async findAllOrders(): Promise<Array<OrderEntity>> {
    return await this._orderGateway.findAll();
  }

  async createOrder(createOrderInput: ICreateOrderInput): Promise<{ qr_data: string }> {
    try {
      const products: ProductEntity[] = await this.validateProducts(createOrderInput.productIds);
      const customer: CustomerEntity = await this._customerGateway.findOneById(
        createOrderInput.customerId,
      );      

      const order: OrderEntity = new OrderEntity(
        { id: OrderStatusEnum.PENDING },
        products,
        customer
      );

      const orderRegistered = await this._orderGateway.insert(order);
      return await this._mercadoPagoProvider.createOrder(orderRegistered);
    } catch (error) {
      throw error;
    }
  }

  private async validateProducts(productIds: UUID[]): Promise<ProductEntity[]> {
    return await Promise.all(productIds.map(async productId => {
      const resultProduct: ProductEntity = await this._productGateway.findOneById(productId);

      if (!resultProduct) {
        throw new Error(`Product not found: ${productId}`);
      }

      return resultProduct;
    }));
  }
}