import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { DataSource } from 'typeorm';
import { CreateOrderUseCase } from 'Core/Application/UseCases/Order/CreateOrder/createOrder.usecase';
import { IOrderRepository } from 'Core/Domain/Repositories/order.repository';
import { IProductRepository } from 'Core/Domain/Repositories/product.repository';
import { FindAllOrderUseCase } from 'Core/Application/UseCases/Order/FindAllOrder/findAllOrder.usecase';
import { ICustomerRepository } from 'Core/Domain/Repositories/customer.repository';
import { OrderCheckoutUseCase } from 'Core/Application/UseCases/Order/OrderCheckout/orderCheckout.usecase';
import { ProductTypeOrmRepository } from 'Adapters/Driven/Repositories/product.repository';
import { ProductTypeOrmEntity } from 'Adapters/Driven/Entities/product.typeorm.entity';
import { CustomerTypeOrmRepository } from 'Adapters/Driven/Repositories/customer.repository';
import { CustomerTypeOrmEntity } from 'Adapters/Driven/Entities/customer.typeorm.entity';
import { OrderStatusTypeOrmRepository } from 'Adapters/Driven/Repositories/orderStatus.repository';
import { OrderStatusTypeOrmEntity } from 'Adapters/Driven/Entities/orderStatus.typeorm.entity';
import { OrderTypeOrmEntity } from 'Adapters/Driven/Entities/order.typeorm.entity';
import { OrderTypeOrmRepository } from 'Adapters/Driven/Repositories/order.repository';
import { IMercadoPagoService } from 'Core/Application/Services/interfaces/mercadopago.interface';
import { FindOrderQueueUseCase } from 'Core/Application/UseCases/Order/FindOrderQueue/findOrderQueue.usecase';
import { MercadoPagoService } from 'Core/Application/Services/MercadoPago/mercadopago.service';
import { ProvidersModule } from 'Adapters/Driven/Providers/providers.module';
import { MercadoPagoProvider } from 'Adapters/Driven/Providers/MercadoPago/MecadoPago.provider';
import { HttpService } from '@nestjs/axios';
import { QRCodeGeneratorProvider } from 'Adapters/Driven/Providers/QRCodeGenerator/QRCodeGenerator.provider';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTypeOrmEntity, OrderStatusTypeOrmEntity])],
  controllers: [OrderController],
  providers: [
    ProvidersModule,
    MercadoPagoService,
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
          new MercadoPagoService(new MercadoPagoProvider(new HttpService())),
          new QRCodeGeneratorProvider(new HttpService())
        );
      },
      inject: [
        OrderTypeOrmRepository,
        ProductTypeOrmRepository,
        CustomerTypeOrmRepository,
        MercadoPagoService
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
    },
    {
      provide: OrderCheckoutUseCase,
      useFactory: (_orderRepository: IOrderRepository) => {
        return new OrderCheckoutUseCase(_orderRepository);
      },
      inject: [OrderTypeOrmRepository],
    }
  ],
})
export class OrderModule {}