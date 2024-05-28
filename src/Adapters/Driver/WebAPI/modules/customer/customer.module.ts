import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerTypeOrmEntity } from '../../../../Driven/Infra/TypeORM/Entities/customer.typeorm.entity';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { CustomerTypeOrmRepository } from 'Adapters/Driven/Infra/TypeORM/Repositories/customer.repository';
import { DataSource } from 'typeorm';
import { CreateCustomerUseCase } from 'Core/Application/UseCases/Customer/CreateCustomer/createCustomer.usecase';
import { ICustomerRepository } from 'Core/Domain/Repositories/customer.repository';
import { FindCustomerByCPFUseCase } from 'Core/Application/UseCases/Customer/FindCustomerByCPF/findCustomerByCPF.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerTypeOrmEntity])],
  controllers: [CustomerController],
  providers: [
    {
      provide: CustomerTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new CustomerTypeOrmRepository(
          dataSource.getRepository(CustomerTypeOrmEntity)
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateCustomerUseCase,
      useFactory: (_customerRepository: ICustomerRepository) => {
        return new CreateCustomerUseCase(_customerRepository);
      },
      inject: [CustomerTypeOrmRepository],
    },
    {
      provide: FindCustomerByCPFUseCase,
      useFactory: (_customerRepository: ICustomerRepository) => {
        return new FindCustomerByCPFUseCase(_customerRepository);
      },
      inject: [CustomerTypeOrmRepository],
    }
  ]
})
export class CustomerModule { }
