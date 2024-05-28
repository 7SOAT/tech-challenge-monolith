import { Module } from "@nestjs/common";
import { TypeOrmModule, getDataSourceToken } from "@nestjs/typeorm";
import { OrderController } from "./order.controller";
import { OrderTypeOrmEntity } from "Adapters/Driven/Infra/TypeORM/Entities/order.typeorm.entity";
import { OrderTypeOrmRepository } from "Adapters/Driven/Infra/TypeORM/Repositories/order.repository";
import { DataSource } from "typeorm";
import { CreateOrderUseCase } from "Core/Application/UseCases/Order/CreateOrder/createOrder.usecase";
import { IOrderRepository } from "Core/Domain/Repositories/order.repository";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";
import { FindAllOrderUseCase } from "Core/Application/UseCases/Order/FindAllOrder/findAllOrder.usecase";

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
      provide: CreateOrderUseCase,
      useFactory: (_orderRepository: IOrderRepository, _productRepository: IProductRepository) => {
        return new CreateOrderUseCase(_orderRepository, _productRepository);
      },
      inject: [OrderTypeOrmRepository],
    },
    {
      provide: FindAllOrderUseCase,
      useFactory: (_orderRepository: IOrderRepository) => {
        return new FindAllOrderUseCase(_orderRepository);
      },
      inject: [OrderTypeOrmRepository],
    },
  ],
})
export class OrderModule {}
