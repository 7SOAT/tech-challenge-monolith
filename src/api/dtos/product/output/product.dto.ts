import IProductOutput from '@type/output/product.output';
import { UUID } from 'crypto';

export default class ProductDto implements IProductOutput {
  constructor(
    public id: UUID,
    public totalValue: number,
  ) {}
}
