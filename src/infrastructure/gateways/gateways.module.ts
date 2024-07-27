import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfigModule  from '../config/typeorm/typeorm.module';
import OrderGateway from './order.gateway';
import OrderStatusGateway  from './order-status.gateway';
import ProductGateway from './product.gateway';
import CustomerGateway from './customer.gateway';
import CustomerEntity  from 'infrastructure/entities/customer.entity';
import OrderEntity  from 'infrastructure/entities/order.entity';
import OrderStatusEntity  from 'infrastructure/entities/order-status.entity';
import ProductEntity from 'infrastructure/entities/product.entity';

export default class GatewaysModule { 
    static gateways = [
        CustomerGateway,
        OrderGateway,
        OrderStatusGateway,
        ProductGateway
    ]
    
    static entities = [
        CustomerEntity,
        OrderEntity,
        OrderStatusEntity,
        ProductEntity
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