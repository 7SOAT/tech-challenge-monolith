import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CustomerModule, ProductModule, ConfigModule.forRoot({
    envFilePath: '.env',
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
