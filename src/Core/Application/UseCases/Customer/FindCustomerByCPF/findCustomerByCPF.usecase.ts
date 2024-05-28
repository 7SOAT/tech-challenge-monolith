import { ICustomerRepository } from "Core/Domain/Repositories/customer.repository";
import { IFindCustomerByCPFUseCase } from "./findCustomerByCPF.usecase.port";
import CustomerEntity from "Core/Domain/Entities/customer.entity";

export class FindCustomerByCPFUseCase implements IFindCustomerByCPFUseCase {
  constructor(private _customerRepository: ICustomerRepository) {}

  async execute(cpf: string): Promise<CustomerEntity>{
    try {
      return await this._customerRepository.findOneByCPF(cpf);
    } catch (err) {
      throw err;
    }
  }
}
