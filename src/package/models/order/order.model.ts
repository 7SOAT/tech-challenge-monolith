import IOrderOutput from 'core/types/output/order.output';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import CustomerModel from '@models/customer.model';
import OrderStatusModel from '@models/order/order-status.model';
import ProductModel from '@models/product.model';
import { UUID } from 'crypto';
import BaseModel from '../base.model';
import PaymentModel from '@models/payment/payment.model';

@Entity({ name: 'order' })
export default class OrderModel extends BaseModel<OrderModel> implements IOrderOutput {
  @PrimaryColumn('uuid')
  id: UUID;

  @ManyToOne(() => OrderStatusModel, (orderStatus) => orderStatus.id, { eager: true })
  @JoinTable()
  status: OrderStatusModel;

  @Column({ type: 'numeric', scale: 2 })
  totalValue: number;

  @ManyToMany(() => ProductModel, (product) => product.id, { eager: true })
  @JoinTable()
  products: ProductModel[];

  @ManyToOne(() => CustomerModel, (customer) => customer.id, { nullable: true, eager: true })
  customer: CustomerModel | null;

  @OneToOne(() => PaymentModel, { eager: true})
  @JoinColumn()
  payment: PaymentModel;

  @Column({ type: 'int', unique: true, nullable: false, generated: 'increment' })
  orderNumber: number;
}
