import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { OrderGateway } from 'gateways/order.repository';
import { DataSource } from 'typeorm';
import { HttpModule, HttpService } from '@nestjs/axios';
import { getDataSourceToken } from '@nestjs/typeorm';
import { OrderModel } from 'infra/database/models/order.model';
import { IOrderRepository } from 'interfaces/gateways/order.gateway';
import { IWebhookService } from 'useCases/Services/interfaces/webhook.interface';
import { WebhookService } from 'useCases/Services/MercadoPago/webhook.service';
import { WebhookUseCase } from 'useCases/webhook.usecase';


@Module({
  imports: [HttpModule],
  controllers: [WebhookController],
  providers: [
    {
      provide: OrderGateway,
      useFactory: (dataSource: DataSource) => {
        return new OrderGateway(
          dataSource.getRepository(OrderModel)
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: WebhookService,
      useFactory: (_httpService: HttpService, _orderRepository: IOrderRepository) => {
        return new WebhookService(_httpService, _orderRepository);
      },
      inject: [HttpService, OrderGateway,],
    },
    {
      provide: WebhookUseCase,
      useFactory: (_webhookService: IWebhookService) => {
        return new WebhookUseCase(_webhookService);
      },
      inject: [WebhookService],
    },
  ],
})

export class WebhookModule {}
