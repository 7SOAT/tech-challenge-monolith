import {
  Body,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({ type: WebhookDto })
  async webhook(@Body() { data }: WebhookDto) {
    const paymentId = String(data?.id);
    return await this._findPaymentByPaymentId.execute(paymentId);
  }
}