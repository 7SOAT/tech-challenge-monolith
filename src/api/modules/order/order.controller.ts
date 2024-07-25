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
  UseInterceptors
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { randomUUID, UUID } from 'crypto';
import OrderEntity from 'entities/order.entity';
import { OrderUseCase } from 'useCases/order.usecase';
import { CheckoutOrderDto } from './dto/checkout-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'orders', version: '1' })
export class OrderController {
  constructor(
    private _orderUseCase: OrderUseCase
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
      return await this._orderUseCase.findAllOrderUseCase();
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
      return await this._orderUseCase.findOrderQueue();
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
      return this._orderUseCase.createOrder(createOrderDto);
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
  async checkout(@Body() checkoutOrderDto: CheckoutOrderDto, @Param("orderId") id: UUID ) {
    try {
      const result = this._orderUseCase.orderCheckout(id)
      return result
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}