import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WebhookController],
  providers: [],
})
export class WebhookModule {}
