import { UUID } from 'crypto';

export default interface IOrderInput {
  customerId: UUID;
  productIds: Array<UUID>;
}
