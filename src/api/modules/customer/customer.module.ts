import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { CustomerGateway } from 'gateways/customer.repository';
import { CustomerModel } from 'infra/database/models/customer.model';
import { DataSource } from 'typeorm';
import { CustomerUseCase } from 'useCases/customer.usecase';
import { CustomerController } from './customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerModel])],
  controllers: [CustomerController],
  providers: [
    {
      provide: CustomerGateway,
      useFactory: (dataSource: DataSource) => {
        return new CustomerGateway(
          dataSource.getRepository(CustomerModel)
        );
      },
      inject: [getDataSourceToken()],
    },
    CustomerUseCase
  ]
})

export class CustomerModule { }