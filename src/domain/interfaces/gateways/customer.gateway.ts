import { UUID } from 'crypto';
import CustomerModel from 'domain/models/customer.model';

export default interface ICustomerGateway {
  insert(customer: CustomerModel): void;
  findOneByCPF(cpf: string): Promise<CustomerModel>;
  findOneById(id: UUID): Promise<CustomerModel>;
}
