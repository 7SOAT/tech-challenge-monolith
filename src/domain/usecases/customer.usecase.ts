import ICustomerGateway from "@interfaces/gateways/customer.gateway";
import CustomerModel from "@entities/customer.model";
import ICustomerInput from "@type/input/customer.input";

export default class CustomerUseCase {
    constructor(private _customerGateway: ICustomerGateway) { }

    findCustomerByCPF(cpf: string): Promise<CustomerModel> {
        return new Promise(async (resolve) => {
            resolve(this._customerGateway.findOneByCPF(cpf))
        });
    }

    createCustomer(input: ICustomerInput): void {
        try {
            const newCustomer = new CustomerModel(
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