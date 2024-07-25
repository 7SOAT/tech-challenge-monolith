import { ICustomerRepository } from 'Core/Domain/Repositories/customer.repository';
import { CustomerTypeOrmEntity } from '../Entities/customer.typeorm.entity';
import { Repository } from 'typeorm';
import CustomerEntity from 'Core/Domain/Entities/customer.entity';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';

export class CustomerTypeOrmRepository implements ICustomerRepository {
  constructor(private _customerRepository: Repository<CustomerTypeOrmEntity>) {}

  async findOneById(id: UUID): Promise<CustomerEntity> {
    try {
      const result = await this._customerRepository.findOneBy({ id });
      const mappedCustomer = plainToInstance(CustomerEntity, result, {enableImplicitConversion: true});
      return mappedCustomer;
    } catch (error) {
      throw new Error(`Error finding customer by id: ${error}`);
    }
  }

  async findOneByCPF(cpf: string): Promise<CustomerEntity> {
    try {
      const customer = await this._customerRepository.findOne({ where: { cpf } });

      const mappedCustomer = plainToInstance(CustomerEntity, customer, {enableImplicitConversion: true});

      return mappedCustomer;
    } catch (error) {
      throw new Error(`Error finding customer by cpf: ${error}`);
    }
  }

  async insert(customer: CustomerEntity): Promise<void> {
    try {
      const mappedCustomer = plainToInstance(CustomerTypeOrmEntity, customer, {enableImplicitConversion: true});
      await this._customerRepository.save(mappedCustomer);
    } catch (error) {
      throw new Error(`Error inserting customer: ${error}`);
    }
  }
}
