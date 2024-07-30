import { ConfirmPaymentSwaggerConfig } from '@api/config/swagger/payment/confirm-payment.swagger';
import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ConfirmPaymentParams from '@api/dtos/payment/input/confirm-payment.dto';
import OrderRepository from '@datasource/typeorm/repositories/order.repository';
import MercadoPagoProvider from '@providers/mercado-pago/mercado-pago.provider';
import PaymentController from 'adapters/controllers/payment.controller';
import CreatePaymentParams from '@api/dtos/payment/input/create-payment.dto';


@ApiTags('payments')
@Controller('payment')
export default class PaymentRoute {
  private readonly _paymentController: PaymentController =
    new PaymentController(this._orderRepository, this._mercadoPagoProvider);

  constructor(
    private _orderRepository: OrderRepository,
    private _mercadoPagoProvider: MercadoPagoProvider
  ) {}

  @Post('/confirm')
  @HttpCode(HttpStatus.OK)
  @ConfirmPaymentSwaggerConfig()
  async confirmPayment(@Query() confirmPaymentParams: ConfirmPaymentParams) {
    try {
      await this._paymentController.confirmPayment(confirmPaymentParams);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ConfirmPaymentSwaggerConfig()
    async createPayment(@Query() createPaymentParams: CreatePaymentParams) {
        try {
            await this._paymentController.createPayment(createPaymentParams);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
