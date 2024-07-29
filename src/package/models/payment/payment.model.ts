import { UUID } from 'crypto';
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import BaseModel from '@models/base.model';
import PaymentStatusModel from './payment-status.model';
import OrderStatusModel from '@models/order/order-status.model';

@Entity({ name: 'payment' })
export default class PaymentModel extends BaseModel<PaymentModel> {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column('int64')
    externalId: number;

    @ManyToOne(() => PaymentStatusModel, (paymentStatus) => paymentStatus.id)
    @JoinTable()
    status: PaymentStatusModel
}
