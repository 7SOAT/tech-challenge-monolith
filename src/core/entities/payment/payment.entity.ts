import { UUID } from 'crypto';
import PaymentStatusEntity from './payment-staus.entity';

export default class CustomerEntity {

  constructor(
    public readonly externalId: number,
    public readonly status?: PaymentStatusEntity,
    public readonly id?: UUID
  ) {}
}
