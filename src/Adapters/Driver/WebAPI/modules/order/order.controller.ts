import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindAllOrderUseCase } from 'Core/Application/UseCases/Order/FindAllOrder/findAllOrder.usecase';
import { CreateOrderUseCase } from 'Core/Application/UseCases/Order/CreateOrder/createOrder.usecase';
import { randomUUID } from 'crypto';
import { CheckoutOrderDto } from './dto/checkout-order.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { OrderCheckoutUseCase } from 'Core/Application/UseCases/Order/OrderCheckout/orderCheckout.usecase';
import { FindOrderQueueUseCase } from 'Core/Application/UseCases/Order/FindOrderQueue/findOrderQueue.usecase';
import { OrderTypeOrmEntity } from 'Adapters/Driven/Infra/Database/Entities/order.typeorm.entity';

@ApiTags('orders')
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'orders', version: '1' })
export class OrderController {
  constructor(
    private _findAllOrderUseCase: FindAllOrderUseCase,
    private _findOrderQueueUseCase: FindOrderQueueUseCase,
    private _createOrderUseCase: CreateOrderUseCase,
    private _orderCheckoutUseCase: OrderCheckoutUseCase
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Orders retrieved successfully',
    type: Array<OrderTypeOrmEntity>,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findAll() {
    try {
      return await this._findAllOrderUseCase.execute();
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/queue")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve orders queue' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Orders queue retrieved successfully',
    type: Array<OrderTypeOrmEntity>,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findQueue() {
    try {
      return await this._findOrderQueueUseCase.execute();
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
      return await this._createOrderUseCase.execute(createOrderDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':orderId/checkout')
  @ApiParam({ name: 'orderId' })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Checkout an order' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Order checked out',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Order not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async checkout(@Body() checkoutOrderDto: CheckoutOrderDto, @Param("orderId") id: UUID ) {
    try {
      const result = this._orderCheckoutUseCase.execute(id)
      return result
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}