import { UUID } from "crypto";
import CustomerEntity from "Entities/customer.entity";
import OrderEntity from "Entities/order.entity";
import ProductEntity from "entities/product.entity";
import { OrderStatusEnum } from "enums/orderStatus.enum";
import { ICustomerRepository } from "interfaces/gateways/customer.gateway";
import IOrderInput from "types/input/order.input";
import { ProductUseCase } from "./product.usecase";
import { MercadoPagoService } from "./Services/MercadoPago/mercadopago.service";
import { IOrderRepository } from "interfaces/gateways/order.gateway";

export class OrderUseCase {
    constructor(
        private _orderRepository: IOrderRepository,
        private _customerRepository: ICustomerRepository,
        private _mercadoPagoService: MercadoPagoService,
        private _productUseCase: ProductUseCase
    ) { }

    async orderCheckout(orderId: UUID): Promise<{ orderNumber: number }> {
        await this._orderRepository.updateOrderStatus(orderId, OrderStatusEnum.RECEPTED)
        const { orderNumber }: OrderEntity = await this._orderRepository.findById(orderId)
    
        return { orderNumber };
      }

      async findOrderQueue(): Promise<Array<OrderEntity>> {
        return await this._orderRepository.findQueue();
      }

      
    async findAllOrderUseCase(): Promise<Array<OrderEntity>> {
        return await this._orderRepository.findAll();
    }

    async createOrder(orderInput: IOrderInput): Promise<{qr_data: string}> {
        try {
          const products: ProductEntity[] = await this._productUseCase.validateProducts(orderInput.productIds);
          const customer: CustomerEntity = await this._customerRepository.findOneById(
            orderInput.customerId
          );
    
          const order: OrderEntity = new OrderEntity(
            OrderStatusEnum.PENDING,
            products,
            customer
          );
    
          const orderRegistered = await this._orderRepository.insert(order);
          return await this._mercadoPagoService.createOrder(orderRegistered);
        } catch (error) {
          throw error;
        }
      }
}