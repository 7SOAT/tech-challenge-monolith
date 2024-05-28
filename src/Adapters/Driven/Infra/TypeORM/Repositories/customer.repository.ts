import { ICustomerRepository } from 'Core/Domain/Repositories/customer.repository';
import { CustomerTypeOrmEntity } from '../Entities/customer.typeorm.entity';
import { Repository } from 'typeorm';
import CustomerEntity from 'Core/Domain/Entities/customer.entity';
import { UUID } from 'crypto';
import { plainToInstance } from 'class-transformer';

export class CustomerTypeOrmRepository implements ICustomerRepository {
  constructor(private _customerRepository: Repository<CustomerTypeOrmEntity>) {}

  async insert(customer: CustomerEntity): Promise<void> {
    try {
      const mappedCustomer = plainToInstance(CustomerTypeOrmEntity, customer);
      await this._customerRepository.save(mappedCustomer);
    } catch (error) {
      throw new Error(`Error inserting customer: ${error}`);
    }
  }

  async findOneByCPF(cpf: string): Promise<CustomerEntity> {
    try {
      const customer = await this._customerRepository.findOneBy({ cpf });

      const mappedCustomer = plainToInstance(CustomerEntity, customer);

      return mappedCustomer;
    } catch (error) {
      throw new Error(`Error finding customer by cpf: ${error}`);
    }
  }

  async findOneById(id: UUID): Promise<CustomerEntity> {
    try {
      const result = await this._customerRepository.findOneBy({ id });
      const mappedCustomer = plainToInstance(CustomerEntity, result);
      return mappedCustomer;
    } catch (error) {
      throw new Error(`Error finding customer by id: ${error}`);
    }
  }
}
