import ProductDto from "@api/dtos/product/output/product.dto";
import ProductEntity from "@entities/product.entity";
import IProductOutput from "@type/output/product.output";

class ProductPresenter {
  static Products(products: ProductEntity[]): IProductOutput[] {
    return products.map((product) => this.Product(product));
  }

  static Product(product: ProductEntity): IProductOutput {
    return new ProductDto(
      product.id,
    );
  }
}

export default ProductPresenter;