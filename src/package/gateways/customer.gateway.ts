
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';
import ICustomerGateway from '@interfaces/gateways/customer.gateway';
import CustomerEntity from 'core/entities/customer.entity';
import CustomerModel  from '@models/customer.model';
import { Repository } from 'typeorm';

export default class CustomerGateway implements ICustomerGateway {
  constructor(
    @InjectRepository(CustomerModel)
    private _customerRepository: Repository<CustomerModel>
  ) {}

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
      const mappedCustomer = plainToInstance(CustomerModel, customer, {enableImplicitConversion: true});
      await this._customerRepository.save(mappedCustomer);
    } catch (error) {
      throw new Error(`Error inserting customer: ${error}`);
    }
  }
}
