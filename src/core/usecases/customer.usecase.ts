import ICustomerGateway from "@interfaces/datasource/customer.gateway";
import CustomerEntity from "core/entities/customer.entity";
import ICustomerInput from "core/types/input/customer.input";

export default class CustomerUseCase {
    constructor(private _customerGateway: ICustomerGateway) { }

    findCustomerByCPF(cpf: string): Promise<CustomerEntity> {
        return new Promise(async (resolve) => {
            resolve(this._customerGateway.findOneByCPF(cpf))
        });
    }

    createCustomer(input: ICustomerInput): void {
        try {
            const newCustomer = new CustomerEntity(
                input.name,
                input.email,
                input.cpf
            );

            this._customerGateway.insert(newCustomer);
        } catch (err) {
            throw err;
        }
    }
}