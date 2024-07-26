import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'orderStatus' })
export class OrderStatusEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'int2', unique: true })
  priorityOrder: number;

  constructor(partial: Partial<OrderStatusEntity>) {
    Object.assign(this, partial);
  }
}
