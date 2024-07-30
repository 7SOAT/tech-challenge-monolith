import { CreateOrderSwaggerConfig as CheckoutOrderSwaggerConfig } from '@api/config/swagger/order/create-order.swagger';
import { FindAllSwaggerConfig } from '@api/config/swagger/order/find-all-orders.swagger';
import { FindQueueSwaggerConfig } from '@api/config/swagger/order/find-orders-queue.swagger';
import CheckoutOrderDto from '@api/dtos/order/input/checkout-order.dto';
import OrderQRCodeDto from '@api/dtos/order/output/order-qr-code.dto';
import CustomerRepository from '@datasource/typeorm/repositories/customer.repository';
import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import ProductRepository from '@datasource/typeorm/repositories/product.repository';
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import MercadoPagoProvider from '@providers/mercado-pago/mercado-pago.provider';
import OrderController from 'adapters/controllers/order.controller';

@ApiTags('orders')
@Controller("orders")
export default class OrderRoute {
  private readonly _orderController: OrderController = new OrderController(
    this._orderRepository,
    this._customerRepository,
    this._productRepository,
    this._mercadoPagoProvider
  );

  constructor(
    private _orderRepository: OrderRepository,
    private _customerRepository: CustomerRepository,
    private _productRepository: ProductRepository,
    private _mercadoPagoProvider: MercadoPagoProvider
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @FindAllSwaggerConfig()
  async findAll() {
    try {
      return await this._orderController.findAllOrders();
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/queue')
  @FindQueueSwaggerConfig()
  async findQueue() {
    try {
      return await this._orderController.findOrdersQueue();
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CheckoutOrderSwaggerConfig()
  async checkout(@Body() checkoutOrderDto: CheckoutOrderDto) {
    try {
      return await this._orderController.checkoutOrder(checkoutOrderDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
