import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderTypeOrmEntity } from 'Adapters/Driven/Infra/TypeORM/Entities/order.typeorm.entity';
import { OrderTypeOrmRepository } from 'Adapters/Driven/Infra/TypeORM/Repositories/order.repository';
import { DataSource } from 'typeorm';
import { CreateOrderUseCase } from 'Core/Application/UseCases/Order/CreateOrder/createOrder.usecase';
import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { IProductRepository } from 'Core/Domain/Repositories/product.repository';
import { FindAllOrderUseCase } from 'Core/Application/UseCases/Order/FindAllOrder/findAllOrder.usecase';
import { ICustomerRepository } from 'Core/Domain/Repositories/customer.repository';
import { ProductTypeOrmRepository } from 'Adapters/Driven/Infra/TypeORM/Repositories/product.repository';
import { CustomerTypeOrmRepository } from 'Adapters/Driven/Infra/TypeORM/Repositories/customer.repository';
import { ProductTypeOrmEntity } from 'Adapters/Driven/Infra/TypeORM/Entities/product.typeorm.entity';
import { CustomerTypeOrmEntity } from 'Adapters/Driven/Infra/TypeORM/Entities/customer.typeorm.entity';
import { IMercadoPagoService } from 'Core/Application/Services/interfaces/mercadopago.interface';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTypeOrmEntity])],
  controllers: [OrderController],
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
      provide: ProductTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new ProductTypeOrmRepository(
          dataSource.getRepository(ProductTypeOrmEntity)
        );
      },
      inject: [getDataSourceToken()],
    },
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
      provide: CreateOrderUseCase,
      useFactory: (_orderRepository: IOrderRepository, _productRepository: IProductRepository, _customerRepository: ICustomerRepository, _mercadoPagoService: IMercadoPagoService) => {
        return new CreateOrderUseCase(_orderRepository, _productRepository, _customerRepository, _mercadoPagoService);
      },
      inject: [OrderTypeOrmRepository, ProductTypeOrmRepository , CustomerTypeOrmRepository],
    },
    {
      provide: FindAllOrderUseCase,
      useFactory: (_orderRepository: IOrderRepository) => {
        return new FindAllOrderUseCase(_orderRepository);
      },
      inject: [OrderTypeOrmRepository],
    }
  ],
})
export class OrderModule {}
