import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private httpService: HttpService) { }

  @Post()
  @ApiOperation({ summary: 'Webhook' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Webhook verify payment approved or not',
  })
  async webhook(@Body() body: any) {
    try {
      const paymentId = body.data?.id;

      const response = await firstValueFrom(
        this.httpService.get(`https://api.mercadopago.com/v1/payments/${paymentId}`)
      );

      const payment = response.data;

      if (payment.status === 'approved') {
        return 'Payment approved';
      }

      return 'Payment not approved';
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
