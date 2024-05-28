import ProductEntity from "Core/Domain/Entities/product.entity";
import { ProductTypeOrmEntity } from "../Entities/product.typeorm.entity";
import { CustomerTypeOrmEntity } from "../Entities/customer.typeorm.entity";
import CustomerEntity from "Core/Domain/Entities/customer.entity";

export default class CustomerMapper {
  static mapToDomainEntity(
    customerTypeOrmEntity: CustomerTypeOrmEntity
  ): CustomerEntity {
    return new CustomerEntity(
        customerTypeOrmEntity.name,
        customerTypeOrmEntity.email,
        customerTypeOrmEntity.cpf
    );
  }

  static mapToDbEntity(customerEntity: CustomerEntity): CustomerTypeOrmEntity {
    return new CustomerTypeOrmEntity(
      {
        name: customerEntity.getName,
        email: customerEntity.getEmail,
        cpf: customerEntity.getCpf,
      }
    );
  }
}
