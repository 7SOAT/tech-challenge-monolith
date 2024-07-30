import ICustomerGateway from "@interfaces/datasource/customer.gateway";
import IOrderGateway from "@interfaces/datasource/order.gateway";
import IProductGateway from "@interfaces/datasource/product.gateway";
import MercadoPagoProvider from "@providers/mercado-pago/mercado-pago.provider";
import CustomerEntity from "core/entities/customer.entity";
import OrderEntity from "core/entities/order/order.entity";
import ProductEntity from "core/entities/product.entity";
import OrderStatusEnum from "core/enums/order-status.enum";
import { UUID } from "crypto";

export default class OrderUseCase {
  constructor(
    private _orderGateway: IOrderGateway,
    private _customerGateway: ICustomerGateway,
    private _productGateway: IProductGateway,
    private _mercadoPagoProvider: MercadoPagoProvider,
  ) {
  }

  async findOrdersQueue(): Promise<Array<OrderEntity>> {
    return await this._orderGateway.findQueue();
  }

  async findAllOrders(): Promise<Array<OrderEntity>> {
    return await this._orderGateway.findAll();
  }

  async checkoutOrder(productIds: UUID[], customerId: UUID): Promise<{ qr_data: string }> {
    try {     
      const products: ProductEntity[] = await this.validateProducts(productIds);
      const customer: CustomerEntity = await this._customerGateway.findOneById(customerId);
      const order = new OrderEntity(
        { id: OrderStatusEnum.PENDING },
        products,
        customer
      );
      const orderRegistered = await this._orderGateway.createOrder(order);
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