import CustomerEntity from "Entities/customer.entity";
import { ICustomerRepository } from "interfaces/gateways/customer.gateway";
import ICustomerInput from "types/input/customer.input";

export class CustomerUseCase {
    constructor(private _customerRepository: ICustomerRepository) { }

    findCustomerByCPF(cpf: string): Promise<CustomerEntity> {
        return new Promise(async (resolve) => {
            resolve(this._customerRepository.findOneByCPF(cpf))
        });
    }

    createCustomer(input: ICustomerInput): void {
        try {
            const newCustomer = new CustomerEntity(
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