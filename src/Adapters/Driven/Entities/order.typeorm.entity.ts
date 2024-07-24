import IOrderOutput from 'Core/Application/Ports/Output/order.output';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductTypeOrmEntity } from './product.typeorm.entity';
import { CustomerTypeOrmEntity } from './customer.typeorm.entity';
import { OrderStatusTypeOrmEntity } from './orderStatus.typeorm.entity';
import { BaseTypeOrmEntity } from './baseEntity.typeorm.entity';

@Entity({ name: 'order' })
export class OrderTypeOrmEntity extends BaseTypeOrmEntity<OrderTypeOrmEntity> implements IOrderOutput {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderStatusTypeOrmEntity, (orderStatus) => orderStatus.id)
  @JoinTable()
  status: OrderStatusTypeOrmEntity;

  @Column({ type: 'float', default: 0 })
  totalValue: number;

  @ManyToMany(() => ProductTypeOrmEntity, (product) => product.id)
  @JoinTable()
  products: ProductTypeOrmEntity[];

  @ManyToOne(() => CustomerTypeOrmEntity, (customer) => customer.id, { nullable: true })
  customer: CustomerTypeOrmEntity | null;

  @Column({ type: 'int', unique: true, nullable: false, generated: 'increment' })
  orderNumber: number;
}
