import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WebhookUseCase } from 'useCases/webhook.usecase';
import { WebhookDto } from './dto/webhook.dto';
import { UsecasesProxyModule } from 'infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'infrastructure/usecases-proxy/usecases-proxy';

@ApiTags('webhook')
@Controller('webhook')
export class WebhookController {
  constructor(
    @Inject(UsecasesProxyModule.WEBHOOK_USE_CASE)
    private _webhookUseCase: UseCaseProxy<WebhookUseCase>
  ) {}

  @Post()
  @ApiOperation({ summary: 'Webhook' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Webhook verify payment approved or not',
  })
  @ApiBody({ type: WebhookDto})
  async webhook(@Body() {type, data}, @Query() c) {
    console.log( "Webhook recebido!")
    if(type === "payment"){
      const paymentId = data?.id;
      return await this._webhookUseCase.getInstance().findPaymentByPaymentId(paymentId);
    }
    return {result: "Falha"}
  }
}
