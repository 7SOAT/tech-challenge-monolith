import CreateCustomerDto from '@api/dtos/customer/input/create-customer.dto';
import FindCustomerByParamsDto from '@api/dtos/customer/input/find-one-by-params.dto';
import CustomerRepository from '@datasource/typeorm/repositories/customer.repository';
import CustomerGateway from '@gateways/customer.gateway';
import CustomerUseCase from '@usecases/customer.usecase';
import CustomerEntity from 'core/entities/customer.entity';

export default class CustomerController {
    private readonly _customerGateway = new CustomerGateway(this._customerRepository);
    private readonly _customerUseCase = new CustomerUseCase(this._customerGateway);

    constructor(
        private _customerRepository: CustomerRepository
    ) { }

    async findCustomerByParams(queryParams: FindCustomerByParamsDto): Promise<CustomerEntity> {
        return await this._customerUseCase.findCustomerByParams(queryParams);
    }

    async createCustomer(customer: CreateCustomerDto): Promise<CustomerEntity> {
        return await this._customerUseCase.createCustomer(customer);
    }
}
