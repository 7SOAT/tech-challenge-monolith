import { Logger, Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CustomerModule,
    ProductModule,
    DbModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
