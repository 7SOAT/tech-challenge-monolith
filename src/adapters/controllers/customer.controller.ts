import CustomerRepository from '@datasource/typeorm/repositories/customer.repository';
import CustomerGateway from '@gateways/customer.gateway';
import { ICreateCustomerInput, IFindCustomerByParamsInput } from '@type/input/customer.input';
import CustomerUseCase from '@usecases/customer.usecase';
import CustomerEntity from 'core/entities/customer.entity';

export default class CustomerController {
    private readonly _customerGateway = new CustomerGateway(this._customerRepository);
    private readonly _customerUseCase = new CustomerUseCase(this._customerGateway);

    constructor(
        private _customerRepository: CustomerRepository
    ) { }

    async findCustomerByParams(queryParams: IFindCustomerByParamsInput): Promise<CustomerEntity> {
        return await this._customerUseCase.findCustomerByParams(queryParams);
    }

    async createCustomer(customer: ICreateCustomerInput): Promise<CustomerEntity> {
        return await this._customerUseCase.createCustomer(customer);
    }
}
