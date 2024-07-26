import { ICustomerGateway } from "domain/interfaces/gateways/customer.gateway";
import CustomerModel from "domain/models/customer.model";
import ICustomerInput from "domain/types/input/customer.input";

export class CustomerUseCase {
    constructor(private _customerRepository: ICustomerGateway) { }

    findCustomerByCPF(cpf: string): Promise<CustomerModel> {
        return new Promise(async (resolve) => {
            resolve(this._customerRepository.findOneByCPF(cpf))
        });
    }

    createCustomer(input: ICustomerInput): void {
        try {
            const newCustomer = new CustomerModel(
                input.name,
                input.email,
                input.cpf
            );

            this._customerRepository.insert(newCustomer);
        } catch (err) {
            throw err;
        }
    }
}