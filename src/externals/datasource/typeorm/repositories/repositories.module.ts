import { DynamicModule } from "@nestjs/common";
import CustomerRepository from "./customer.repository";
import OrderStatusRepository from "./order-status.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";
import TypeOrmConfigModule from "../typeorm.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import CustomerModel from "@models/customer.model";
import OrderModel from "@models/order/order.model";
import OrderStatusModel from "@models/order/order-status.model";
import ProductModel from "@models/product.model";

export default class RepositoriesModule {
    static resgister(): DynamicModule {

        const entities = [
            CustomerModel,
            OrderModel,
            OrderStatusModel,
            ProductModel
        ]

        return {
            module: this,
            imports: [TypeOrmConfigModule, TypeOrmModule.forFeature(entities)],
            providers: [
                CustomerRepository,
                OrderRepository,
                OrderStatusRepository,
                ProductRepository
            ],
            exports: [
                CustomerRepository,
                OrderRepository,
                OrderStatusRepository,
                ProductRepository
            ]
        }
    }
};