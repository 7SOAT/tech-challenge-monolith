import { ICustomerRepository } from "Core/Domain/Repositories/customer.repository";
import { IFindCustomerByCPFUseCase } from "./findCustomerByCPF.usecase.port";
import CustomerEntity from "Core/Domain/Entities/customer.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindCustomerByCPFUseCase implements IFindCustomerByCPFUseCase {
  constructor(private _customerRepository: ICustomerRepository) { }

  execute(cpf: string): Promise<CustomerEntity> {
    return new Promise(async (resolve) => {
      resolve(this._customerRepository.findOneByCPF(cpf))
    });
  }
}
