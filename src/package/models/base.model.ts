import IBaseOutput from "core/types/output/base.output";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export default class BaseModel<T> implements IBaseOutput {
    constructor(partial: Partial<T>) {
        Object.assign(this, partial);
    }

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
}