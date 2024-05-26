import { UUID } from "crypto";
import { Customer } from "../../customer/entities/customer.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
} from "typeorm";
import { OrderStatus } from "../enum/order-status.enum";

@Entity({ name: "order" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isArchived: boolean;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ type: "varchar", nullable: true })
  burger: string;

  @Column({ type: "varchar", nullable: true })
  side: string;

  @Column({ type: "varchar", nullable: true })
  beverage: string;

  @Column({ type: "varchar", nullable: true })
  dessert: string;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  orderStatus: OrderStatus;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}
