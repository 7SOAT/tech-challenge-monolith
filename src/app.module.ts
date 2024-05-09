import { Logger, Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmConfigSQL } from './typeOrm.migration-config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({useFactory: TypeOrmConfigSQL}),
    CustomerModule,
    ProductModule
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
