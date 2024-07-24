import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTypeOrmEntity } from './baseEntity.typeorm.entity';

@Entity({ name: 'customer' })
export class CustomerTypeOrmEntity extends BaseTypeOrmEntity<CustomerTypeOrmEntity> {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  cpf: string;
}
