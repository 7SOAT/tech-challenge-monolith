import { UUID } from 'crypto';
import OrderEntity from './order.entity';

export default class CustomerEntity {
  private readonly id: UUID;
  private readonly isActive: boolean;
  private readonly isArchived: boolean;

  constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly cpf: string
  ) {
    this.isActive = true;
    this.isArchived = false;
  }

  public get getId(): UUID {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getEmail(): string {
    return this.email;
  }

  public get getCpf(): string {
    return this.cpf;
  }

  public get getIsActive(): boolean {
    return this.isActive;
  }

  public get getIsArchived(): boolean {
    return this.isArchived;
  }
}
