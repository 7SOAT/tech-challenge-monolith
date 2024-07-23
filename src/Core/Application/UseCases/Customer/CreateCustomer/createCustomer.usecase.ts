import { ICustomerRepository } from "Core/Domain/Repositories/customer.repository";
import { ICreateCustomerUseCase } from "./createCustomer.usecase.port";
import ICustomerInput from "Core/Application/Ports/Input/customer.input";
import CustomerEntity from "Core/Domain/Entities/customer.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateCustomerUseCase implements ICreateCustomerUseCase {
  constructor(private _customerRepository: ICustomerRepository) {}

  execute(input: ICustomerInput): void {
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
