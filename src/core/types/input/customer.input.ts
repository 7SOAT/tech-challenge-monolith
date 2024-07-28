export interface ICreateCustomerInput {
  name: string;
  email: string;
  cpf: string;
}

export interface IFindCustomerByParamsInput {
  email?: string;
  cpf?: string;
}
