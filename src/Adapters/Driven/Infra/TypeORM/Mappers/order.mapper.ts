import OrderEntity from "Core/Domain/Entities/order.entity";
import { OrderTypeOrmEntity } from "../Entities/order.typeorm.entity";
import { ProductTypeOrmEntity } from "../Entities/product.typeorm.entity";
import ProductMapper from "./product.mapper";


export default class OrderMapper {
  static mapToDomainEntity(
    orderTypeOrmEntity: OrderTypeOrmEntity,
  ): OrderEntity {
    const products = orderTypeOrmEntity.products.map(ProductMapper.mapToDomainEntity);

    return new OrderEntity(
      orderTypeOrmEntity.orderStatus,
      orderTypeOrmEntity.totalValue,
      products,
    )
  }
}
