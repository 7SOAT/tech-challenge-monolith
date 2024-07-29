import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { CheckoutOrderSwaggerConfig } from '@api/config/swagger/order/checkout-order.swagger';
import { CreateOrderSwaggerConfig } from '@api/config/swagger/order/create-order.swagger';
import { FindAllSwaggerConfig } from '@api/config/swagger/order/find-all-orders.swagger';
import { FindQueueSwaggerConfig } from '@api/config/swagger/order/find-orders-queue.swagger';
import { ApiTags } from '@nestjs/swagger';
import CreateOrderDto from '@api/dtos/order/input/create-order.dto';
import CustomerRepository from '@datasource/typeorm/repositories/customer.repository';
import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import ProductRepository from '@datasource/typeorm/repositories/product.repository';
import MercadoPagoProvider from '@providers/mercado-pago/mercado-pago.provider';
import OrderController from 'adapters/controllers/order.controller';
import CheckoutOrderDto from '@api/dtos/order/input/checkout-order.dto';

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
  @CreateOrderSwaggerConfig()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this._orderController.createOrder(createOrderDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/checkout')
  @HttpCode(HttpStatus.OK)
  @CheckoutOrderSwaggerConfig()
  async checkout(@Query() checkoutParams: CheckoutOrderDto) {
    try {
      await this._orderController.orderCheckout(checkoutParams);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}