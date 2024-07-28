import CustomerRepository from '@datasource/typeorm/repositories/customer.repository';
import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import ProductRepository from '@datasource/typeorm/repositories/product.repository';
import CustomerGateway from '@gateways/customer.gateway';
import OrderGateway from '@gateways/order.gateway';
import ProductGateway from '@gateways/product.gateway';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import MercadoPagoProvider from '@providers/mercado-pago/mercado-pago.provider';
import CreateOrderDto from '@routes/order/dto/create-order.dto';
import OrderUseCase from '@usecases/order.usecase';
import OrderEntity from 'core/entities/order.entity';
import { randomUUID } from 'crypto';

@ApiTags('orders')
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'orders', version: '1' })
export default class OrderRoute {
  constructor(
    private _orderRepository: OrderRepository,
    private _customerRepository: CustomerRepository,
    private _productRepository: ProductRepository,
    private _mercadoPagoProvider: MercadoPagoProvider
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Orders retrieved successfully',
    type: Array<OrderEntity>,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findAll() {
    try {
      const orderOrderUseCase = this.createOrderUseCase();
      return await orderOrderUseCase.findAllOrderUseCase();
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/queue")
  @ApiOperation({ summary: 'Retrieve orders queue' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Orders queue retrieved successfully',
    type: Array<OrderEntity>,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findQueue() {
    try {
      const orderOrderUseCase = this.createOrderUseCase();
      return await orderOrderUseCase.findOrderQueue();
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Order created successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Client/product not found",
  })
  @ApiBody({
    type: CreateOrderDto,
    examples: {
      a: {
        summary: "Exemplo cliente identificado",
        value: {
          customerId: randomUUID(),
          productIds: [randomUUID(), randomUUID(), randomUUID(), randomUUID()],
          description: "Pedido para viagem.",
        } as CreateOrderDto
      },
      b: {
        summary: "Exemplo Anônimo",
        value: {
          productIds: [randomUUID(), randomUUID(), randomUUID(), randomUUID()]
        } as CreateOrderDto
      }
    }
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const orderOrderUseCase = this.createOrderUseCase();
      return orderOrderUseCase.createOrder(createOrderDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/checkout')
  @ApiQuery({examples: {a: {summary: "Exemplo de pagamento", value: { id: '83786085280', topic: 'payment' }}}})
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Checkout an order' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Order checked out'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Order not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async checkout(@Query() { id, topic }) {
    try {
      if (topic === "payment") {
        const orderOrderUseCase = this.createOrderUseCase();
        await orderOrderUseCase.orderCheckout(id);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private createOrderUseCase(): OrderUseCase {
    const orderGateway = new OrderGateway(this._orderRepository);
    const customerGateway = new CustomerGateway(this._customerRepository);
    const productGateway = new ProductGateway(this._productRepository);
    const orderOrderUseCase = new OrderUseCase(orderGateway, customerGateway, productGateway, this._mercadoPagoProvider);
    return orderOrderUseCase;
  }
}