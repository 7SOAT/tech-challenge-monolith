import { UUID } from "crypto";
import { OrderStatusEnum } from "domain/enums/orderStatus.enum";
import { ICustomerGateway } from "domain/interfaces/gateways/customer.gateway";
import { IOrderGateway } from "domain/interfaces/gateways/order.gateway";
import CustomerModel from "domain/models/customer.model";
import OrderModel from "domain/models/order.model";
import ProductModel from "domain/models/product.model";
import IOrderInput from "domain/types/input/order.input";
import { CreatePaymentRequest, MercadoPagoProvider } from "infrastructure/providers/mercadoPago/mecadoPago.provider";
import { ProductUseCase } from "./product.usecase";
import { Inject } from "@nestjs/common";
import { UsecasesProxyModule } from "infrastructure/usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "infrastructure/usecases-proxy/usecases-proxy";

export class OrderUseCase {
  constructor(
    private _orderGateway: IOrderGateway,
    private _customerGateway: ICustomerGateway,
    private _mercadoPagoProvider: MercadoPagoProvider,
    private _productUseCase: ProductUseCase
  ) { }

  async orderCheckout(orderId: UUID): Promise<{ orderNumber: number }> {
    await this._orderGateway.updateOrderStatus(orderId, OrderStatusEnum.RECEPTED)
    const { orderNumber }: OrderModel = await this._orderGateway.findById(orderId)

    return { orderNumber };
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

      const request: CreatePaymentRequest = {
        cash_out: {
          amount: 0
        },
        description: "Purchase description.",
        external_reference: orderRegistered.id.toString(),
        items: orderRegistered.products.map((product) => {
          return {
            sku_number: product.id.toString(),
            category: product.category,
            title: product.name,
            description: product.description,
            unit_price: product.price,
            quantity: 1,
            unit_measure: "unit",
            total_amount: product.price
          }
        }),
        sponsor: {
          id: 1907353240
        },
        title: "Combo Completo",
        total_amount: orderRegistered.totalValue
      };

      return await this._mercadoPagoProvider.createOrder(request);
    } catch (error) {
      throw error;
    }
  }
}

// async createOrder(order: OrderModel): Promise<{ qr_data: string }> {
//   try {
//     
//     return await this._mercadoPagoProvider.createOrder(request);
//   } catch (error) {
//     throw new Error(`Error create payment: ${error}`);
//   }