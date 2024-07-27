import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfigModule  from '@datasource/typeorm/typeorm.module';
import OrderGateway from '@gateways/order.gateway';
import OrderStatusGateway  from '@gateways/order-status.gateway';
import ProductGateway from '@gateways/product.gateway';
import CustomerGateway from '@gateways/customer.gateway';
import CustomerModel  from '@models/customer.model';
import OrderModel  from '@models/order.model';
import OrderStatusModel  from '@models/order-status.model';
import ProductModel from '@models/product.model';

export default class GatewaysModule { 
    static gateways = [
        CustomerGateway,
        OrderGateway,
        OrderStatusGateway,
        ProductGateway
    ]
    
    static entities = [
        CustomerModel,
        OrderModel,
        OrderStatusModel,
        ProductModel
    ]

    static register(): DynamicModule{
        return {
            module: this,
            imports: [TypeOrmConfigModule, TypeOrmModule.forFeature(this.entities)],
            providers: this.gateways,
            exports: this.gateways
        }
    }
}