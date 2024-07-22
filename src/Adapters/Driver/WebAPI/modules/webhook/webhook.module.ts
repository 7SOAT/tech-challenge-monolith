import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { FindPaymentByPaymentIdUseCase } from 'Core/Application/UseCases/Webhook/FindPaymentByPaymentIdUseCase/findPaymentByPaymentId.usecase';
import { IWebhookService } from 'Core/Application/Services/interfaces/webhook.interface';
import { WebhookService } from 'Core/Application/Services/MercadoPago/webhook.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { OrderTypeOrmRepository } from 'Adapters/Driven/Infra/Database/Repositories/order.repository';
import { OrderTypeOrmEntity } from 'Adapters/Driven/Infra/Database/Entities/order.typeorm.entity';

@Module({
  imports: [HttpModule],
  controllers: [WebhookController],
  providers: [
    {
      provide: OrderTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new OrderTypeOrmRepository(
          dataSource.getRepository(OrderTypeOrmEntity)
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: WebhookService,
      useFactory: (_httpService: HttpService, _orderRepository: IOrderRepository) => {
        return new WebhookService(_httpService, _orderRepository);
      },
      inject: [HttpService, OrderTypeOrmRepository,],
    },
    {
      provide: FindPaymentByPaymentIdUseCase,
      useFactory: (_webhookService: IWebhookService) => {
        return new FindPaymentByPaymentIdUseCase(_webhookService);
      },
      inject: [WebhookService],
    },
  ],
})

export class WebhookModule {}
