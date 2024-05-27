import ICustomerInput from "Core/Application/Ports/Input/customer.input";
export interface ICreateCustomerUseCase {
  execute(customerInput: ICustomerInput): void;
}
