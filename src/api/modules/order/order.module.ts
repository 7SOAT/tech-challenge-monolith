import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { CustomerGateway } from 'gateways/customer.repository';
import { OrderGateway } from 'gateways/order.repository';
import { OrderStatusGateway } from 'gateways/orderStatus.repository';
import { ProductGateway } from 'gateways/product.repository';
import { CustomerModel } from 'infra/database/models/customer.model';
import { OrderModel } from 'infra/database/models/order.model';
import { OrderStatusModel } from 'infra/database/models/orderStatus.model';
import { ProductModel } from 'infra/database/models/product.model';
import { ProvidersModule } from 'infra/providers/providers.module';
import { DataSource } from 'typeorm';
import { MercadoPagoService } from 'useCases/Services/MercadoPago/mercadopago.service';
import { OrderController } from './order.controller';
import { OrderUseCase } from 'useCases/order.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([OrderModel, OrderStatusModel])],
  controllers: [OrderController],
  providers: [
    ProvidersModule,
    MercadoPagoService,
    {
      provide: OrderStatusGateway,
      useFactory: (dataSource: DataSource) => {
        return new OrderStatusGateway(
          dataSource.getRepository(OrderStatusModel)
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: OrderGateway,
      useFactory: (dataSource: DataSource) => {
        return new OrderGateway(
          dataSource.getRepository(OrderModel)
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: ProductGateway,
      useFactory: (dataSource: DataSource) => {
        return new ProductGateway(
          dataSource.getRepository(ProductModel)
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CustomerGateway,
      useFactory: (dataSource: DataSource) => {
        return new CustomerGateway(
          dataSource.getRepository(CustomerModel)
        );
      },
      inject: [getDataSourceToken()],
    },
    OrderUseCase
  ],
})
export class OrderModule {}