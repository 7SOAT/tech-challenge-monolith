import IOrderOutput from '@type/output/order.output';
import { UUID } from 'crypto';

export default class OrderDto implements IOrderOutput {
  constructor(
    public id: UUID,
    public totalValue: number,
  ) {}
}
