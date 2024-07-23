import { UUID } from 'crypto';
import CustomerEntity from "../Entities/customer.entity";

export interface ICustomerRepository {
  insert(customer: CustomerEntity): void;
  findOneByCPF(cpf: string): Promise<CustomerEntity>;
  findOneById(id: UUID): Promise<CustomerEntity>;
}
