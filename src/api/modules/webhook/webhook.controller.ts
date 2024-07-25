import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WebhookUseCase } from 'useCases/webhook.usecase';
import { WebhookDto } from './dto/webhook.dto';

@ApiTags('webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private _weebhookUseCase: WebhookUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Webhook' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Webhook verify payment approved or not',
  })
  @ApiBody({ type: WebhookDto})
  async webhook(@Body() body, @Query() c) {
    console.log( "Webhook recebido!")
    if(body?.type === "payment"){
      const paymentId = body?.data?.id;
      return await this._weebhookUseCase.findPaymentByPaymentId(paymentId);
    }
    return {result: "sucesso"}
  }
}
