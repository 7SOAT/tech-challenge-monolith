import IOrderOutput from "Core/Application/Ports/Output/order.outpu";
import { OrderStatus } from "Core/Domain/Enums/orderStatus.enum";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductTypeOrmEntity } from "./product.typeorm.entity";
import { CustomerTypeOrmEntity } from "./customer.typeorm.entity";

@Entity({ name: "order" })
export class OrderTypeOrmEntity implements IOrderOutput {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isArchived: boolean;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  orderStatus: OrderStatus;

  @Column({ type: 'float', default: 0 })
  totalValue: number;

  @ManyToMany(() => ProductTypeOrmEntity, (product) => product.id)
  @JoinTable()
  products: ProductTypeOrmEntity[];

  @ManyToOne(() => CustomerTypeOrmEntity, (customer) => customer.id)
  customer: CustomerTypeOrmEntity;

  constructor(partial: Partial<OrderTypeOrmEntity>) {
    Object.assign(this, partial);
  }
}
