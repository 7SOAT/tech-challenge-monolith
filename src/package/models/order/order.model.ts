import IOrderOutput from 'core/types/output/order.output';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import CustomerModel from '@models/customer.model';
import OrderStatusModel from '@models/order/order-status.model';
import ProductModel from '@models/product.model';
import { UUID } from 'crypto';
import BaseModel from '../base.model';

@Entity({ name: 'order' })
export default class OrderModel extends BaseModel<OrderModel> implements IOrderOutput {
  @PrimaryColumn('uuid')
  id: UUID;

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