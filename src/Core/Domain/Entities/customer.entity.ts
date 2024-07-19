import { UUID } from 'crypto';

export default class CustomerEntity {

  constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly cpf: string,
    private readonly id?: UUID
  ) {}
}
