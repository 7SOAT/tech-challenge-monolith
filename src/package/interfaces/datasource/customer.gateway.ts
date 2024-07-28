import { UUID } from 'crypto';
import CustomerEntity from 'core/entities/customer.entity';

export default interface ICustomerGateway {
  insert(customer: CustomerEntity): Promise<CustomerEntity>;
  findOneByCPF(cpf: string): Promise<CustomerEntity>;
  findOneById(id: UUID): Promise<CustomerEntity>;
}
