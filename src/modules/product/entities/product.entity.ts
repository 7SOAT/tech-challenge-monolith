import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../enums/product-category.enum';
import { Order } from 'modules/order/entities/order.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
