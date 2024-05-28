import { UUID } from "crypto";
import { Order } from "../../../../Driver/WebAPI/modules/order/entities/order.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "customer" })

  export class CustomerTypeOrmEntity {
    constructor(
      id: UUID,
      isActive: boolean,
      isArchived: boolean,
      name: string,
      email: string,
      cpf: string
  ){
    this.id = id,
    this.isActive = isActive,
    this.isArchived = isArchived,
    this.name = name;
    this.email = email;
    this.cpf = cpf;
  }

  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isArchived: boolean;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt?: Date;

  @Column({ type: "varchar", length: 200 })
  name: string;

  @Column({ type: "varchar", length: 200 })
  email: string;

  @Column({ type: "varchar", length: 200 })
  cpf: string;

  // @OneToMany(() => Order, (order) => order.customer)
  // orders: Order[];
}
