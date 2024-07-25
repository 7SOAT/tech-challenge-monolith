import IOrderOutput from 'types/output/order.output';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductModel } from './product.model';
import { CustomerModel } from './customer.model';
import { OrderStatusModel } from './orderStatus.model';
import { BaseModel } from './baseEntity.model';

@Entity({ name: 'order' })
export class OrderModel extends BaseModel<OrderModel> implements IOrderOutput {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderStatusModel, (orderStatus) => orderStatus.id)
  @JoinTable()
  status: OrderStatusModel;

  @Column({ type: 'numeric', scale: 2 })
  totalValue: number;

  @ManyToMany(() => ProductModel, (product) => product.id)
  @JoinTable()
  products: ProductModel[];

  @ManyToOne(() => CustomerModel, (customer) => customer.id, { nullable: true })
  customer: CustomerModel | null;

  @Column({ type: 'int', unique: true, nullable: false, generated: 'increment' })
  orderNumber: number;
}
