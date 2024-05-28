import { ICustomerRepository } from "Core/Domain/Repositories/customer.repository";
import { CustomerTypeOrmEntity } from "../Entities/customer.typeorm.entity";
import { Repository } from "typeorm";
import CustomerMapper from "../Mappers/customer.mapper";
import CustomerEntity from "Core/Domain/Entities/customer.entity";

export class CustomerTypeOrmRepository implements ICustomerRepository {
    constructor(private _customerRepository: Repository<CustomerTypeOrmEntity>) { }

    async insert(customer: CustomerEntity): Promise<void> {
        this._customerRepository.save(CustomerMapper.mapToDbEntity(customer));
    }

    async findOneByCPF(cpf: string): Promise<CustomerEntity> {
        const customer = await this._customerRepository.findOneBy({cpf})
        .then((customer) => CustomerMapper.mapToDomainEntity(customer));
        return customer;
    }
}