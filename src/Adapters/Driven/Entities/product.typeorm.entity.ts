import IProductOutput from "Core/Application/Ports/Output/product.output";
import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UUID } from 'crypto';
import { BaseTypeOrmEntity } from "./baseEntity.typeorm.entity";

@Entity({ name: "product" })
export class ProductTypeOrmEntity extends BaseTypeOrmEntity<ProductTypeOrmEntity> implements IProductOutput {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "enum", enum: ProductCategory })
  category: ProductCategory;

  @Column({ type: "varchar", length: 200 })
  name: string;

  @Column({ type: "numeric", scale: 2})
  price: number;

  @Column({ type: "varchar", length: 1000 })
  description: string;

}
