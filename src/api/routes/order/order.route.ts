import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import OrderEntity from 'core/entities/order.entity';
import UseCaseProxy from 'api/usecases-proxy/usecases-proxy';
import UsecasesProxyModule from 'api/usecases-proxy/usecases-proxy.module';
import OrderUseCase from '@usecases/order.usecase';
import CreateOrderDto from '@routes/order/dto/create-order.dto';

@ApiTags('orders')
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'orders', version: '1' })
export default class OrderRoute {
  constructor(
    @Inject(UsecasesProxyModule.ORDER_USE_CASE)
    private _orderUseCase: UseCaseProxy<OrderUseCase>
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
      return await this._orderUseCase.getInstance().findAllOrderUseCase();
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
      return await this._orderUseCase.getInstance().findOrderQueue();
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
      return this._orderUseCase.getInstance().createOrder(createOrderDto);
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
        await this._orderUseCase.getInstance().orderCheckout(id);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}