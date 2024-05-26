import ProductEntity from "Core/Domain/Entities/product.entity";
import ProductTypeOrmEntity from "../Entities/product.typeorm.entity";

export default class ProductMapper {
  static mapToDomainEntity(
    productTypeOrmEntity: ProductTypeOrmEntity
  ): ProductEntity {
    return new ProductEntity(
      productTypeOrmEntity.name,
      productTypeOrmEntity.description,
      productTypeOrmEntity.price,
      productTypeOrmEntity.category
    );
  }

  static mapToDbEntity(productEntity: ProductEntity): ProductTypeOrmEntity {
    return new ProductTypeOrmEntity(
      productEntity.name,
      productEntity.description,
      productEntity.price,
      productEntity.productCategory
    );
  }
}
