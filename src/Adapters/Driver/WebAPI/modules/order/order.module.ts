import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { DataSource } from 'typeorm';
import { CreateOrderUseCase } from 'Core/Application/UseCases/Order/CreateOrder/createOrder.usecase';
import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { IProductRepository } from 'Core/Domain/Repositories/product.repository';
import { FindAllOrderUseCase } from 'Core/Application/UseCases/Order/FindAllOrder/findAllOrder.usecase';
import { ICustomerRepository } from 'Core/Domain/Repositories/customer.repository';
import { OrderTypeOrmRepository } from 'Adapters/Driven/Infra/Database/Repositories/order.repository';
import { FindOrderQueueUseCase } from 'Core/Application/UseCases/Order/FindOrderQueue/findOrderQueue.usecase';
import { IMercadoPagoService } from 'Core/Application/Services/interfaces/mercadopago.interface';
import { OrderTypeOrmEntity } from 'Adapters/Driven/Infra/Database/Entities/order.typeorm.entity';
import { OrderStatusTypeOrmEntity } from 'Adapters/Driven/Infra/Database/Entities/orderStatus.typeorm.entity';
import { OrderStatusTypeOrmRepository } from 'Adapters/Driven/Infra/Database/Repositories/orderStatus.repository';
import { ProductTypeOrmRepository } from 'Adapters/Driven/Infra/Database/Repositories/product.repository';
import { ProductTypeOrmEntity } from 'Adapters/Driven/Infra/Database/Entities/product.typeorm.entity';
import { CustomerTypeOrmRepository } from 'Adapters/Driven/Infra/Database/Repositories/customer.repository';
import { CustomerTypeOrmEntity } from 'Adapters/Driven/Infra/Database/Entities/customer.typeorm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTypeOrmEntity, OrderStatusTypeOrmEntity])],
  controllers: [OrderController],
  providers: [
    {
      provide: OrderStatusTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new OrderStatusTypeOrmRepository(
          dataSource.getRepository(OrderStatusTypeOrmEntity)
        );
      },
      inject: [getDataSourceToken()],
    },
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
      useFactory: (
        _orderRepository: IOrderRepository,
        _productRepository: IProductRepository,
        _customerRepository: ICustomerRepository,
        _mercadoPagoService: IMercadoPagoService
      ) => {
        return new CreateOrderUseCase(
          _orderRepository,
          _productRepository,
          _customerRepository,
          _mercadoPagoService
        );
      },
      inject: [
        OrderTypeOrmRepository,
        ProductTypeOrmRepository,
        CustomerTypeOrmRepository,
      ],
    },
    {
      provide: FindAllOrderUseCase,
      useFactory: (_orderRepository: IOrderRepository) => {
        return new FindAllOrderUseCase(_orderRepository);
      },
      inject: [OrderTypeOrmRepository]
    },
    {
      provide: FindOrderQueueUseCase,
      useFactory: (_orderRepository: IOrderRepository) => {
        return new FindOrderQueueUseCase(_orderRepository);
      },
      inject: [OrderTypeOrmRepository],
    }
  ],
})
export class OrderModule {}
