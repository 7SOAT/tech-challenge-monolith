import ICustomerGateway from "@interfaces/datasource/customer.gateway";
import CustomerEntity from "core/entities/customer.entity";
import { ICreateCustomerInput, IFindCustomerByParamsInput } from "core/types/input/customer.input";

export default class CustomerUseCase {
    constructor(private _customerGateway: ICustomerGateway) { }

    findCustomerByParams(params: IFindCustomerByParamsInput): Promise<CustomerEntity> {
        return new Promise(async (resolve) => {
            resolve(this._customerGateway.findOneByParams(params))
        });
    }

    async createCustomer(customer: ICreateCustomerInput): Promise<CustomerEntity> {
        try {
            const newCustomer = new CustomerEntity(
                customer.name,
                customer.email,
                customer.cpf
            );

            return await this._customerGateway.insert(newCustomer);
        } catch (err) {
            throw err;
        }
    }
}