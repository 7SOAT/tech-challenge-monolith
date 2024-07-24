import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindPaymentByPaymentIdUseCase } from 'Core/Application/UseCases/Webhook/FindPaymentByPaymentIdUseCase/findPaymentByPaymentId.usecase';
import { WebhookDto } from './dto/webhook.dto';

@ApiTags('webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private _findPaymentByPaymentId: FindPaymentByPaymentIdUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Webhook' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Webhook verify payment approved or not',
  })
  @ApiBody({ type: WebhookDto})
  async webhook(@Body() body, @Query() c) {
    console.log( "Webhook recebido!")
    console.log(body, c)
    const paymentId = body?.data?.id;
    return {result: "sucesso"}
    //return await this._findPaymentByPaymentId.execute(paymentId);
  }
}
