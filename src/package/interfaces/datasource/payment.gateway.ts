import PaymentEntity from '@entities/payment/payment.entity';
import { UUID } from 'crypto';

export default interface IPaymentGateway {
  insert(payment: PaymentEntity): Promise<PaymentEntity>;
  findAll(): Promise<Array<PaymentEntity>>;
}
