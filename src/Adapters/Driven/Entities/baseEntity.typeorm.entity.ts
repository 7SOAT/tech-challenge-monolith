import IBaseOutput from "Core/Application/Ports/Output/base.output";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseTypeOrmEntity<T> implements IBaseOutput {
    constructor(partial: Partial<T>) {
        Object.assign(this, partial);
    }

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
}