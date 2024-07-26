import IOrderOutput from 'domain/types/output/order.output';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CustomerEntity } from './customer.entity';
import { OrderStatusEntity } from './orderStatus.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'order' })
export class OrderEntity extends BaseEntity<OrderEntity> implements IOrderOutput {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderStatusEntity, (orderStatus) => orderStatus.id)
  @JoinTable()
  status: OrderStatusEntity;

  @Column({ type: 'numeric', scale: 2 })
  totalValue: number;

  @ManyToMany(() => ProductEntity, (product) => product.id)
  @JoinTable()
  products: ProductEntity[];

  @ManyToOne(() => CustomerEntity, (customer) => customer.id, { nullable: true })
  customer: CustomerEntity | null;

  @Column({ type: 'int', unique: true, nullable: false, generated: 'increment' })
  orderNumber: number;
}
