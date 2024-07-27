
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';
import ICustomerGateway from 'domain/interfaces/gateways/customer.gateway';
import CustomerModel from 'domain/models/customer.model';
import CustomerEntity  from 'infrastructure/entities/customer.entity';
import { Repository } from 'typeorm';

export default class CustomerGateway implements ICustomerGateway {
  constructor(
    @InjectRepository(CustomerEntity)
    private _customerRepository: Repository<CustomerEntity>
  ) {}

  async findOneById(id: UUID): Promise<CustomerModel> {
    try {
      const result = await this._customerRepository.findOneBy({ id });
      const mappedCustomer = plainToInstance(CustomerModel, result, {enableImplicitConversion: true});
      return mappedCustomer;
    } catch (error) {
      throw new Error(`Error finding customer by id: ${error}`);
    }
  }

  async findOneByCPF(cpf: string): Promise<CustomerModel> {
    try {
      const customer = await this._customerRepository.findOne({ where: { cpf } });

      const mappedCustomer = plainToInstance(CustomerModel, customer, {enableImplicitConversion: true});

      return mappedCustomer;
    } catch (error) {
      throw new Error(`Error finding customer by cpf: ${error}`);
    }
  }

  async insert(customer: CustomerModel): Promise<void> {
    try {
      const mappedCustomer = plainToInstance(CustomerEntity, customer, {enableImplicitConversion: true});
      await this._customerRepository.save(mappedCustomer);
    } catch (error) {
      throw new Error(`Error inserting customer: ${error}`);
    }
  }
}
