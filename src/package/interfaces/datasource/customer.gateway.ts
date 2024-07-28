import { IFindCustomerByParamsInput } from '@type/input/customer.input';
import CustomerEntity from 'core/entities/customer.entity';
import { UUID } from 'crypto';

export default interface ICustomerGateway {
  insert(customer: CustomerEntity): Promise<CustomerEntity>;
  findOneByParams(params: IFindCustomerByParamsInput): Promise<CustomerEntity>;
  findOneById(id: UUID): Promise<CustomerEntity>;
}
