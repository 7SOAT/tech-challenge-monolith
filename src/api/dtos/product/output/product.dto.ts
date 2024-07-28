import ProductCategory from '@enums/product-category.enum';
import { IProductOutput } from '@type/output/product.output';
import { UUID } from 'crypto';

export default class ProductDto implements IProductOutput {
  constructor(
    public id: UUID,    
    public name: string,
    public category: ProductCategory,
    public price: number,
    public description: string    
  ) {}    
}
