import { AbstractEntity } from 'src/db/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Customer extends AbstractEntity<Customer> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;
}
