
import OrderProductDto from "@api/dtos/product/output/order-product.dto";
import ProductDto from "@api/dtos/product/output/product.dto";
import ProductEntity from "@entities/product.entity";
import { IOrderProductOutput, IProductOutput } from "@type/output/product.output";


class ProductPresenter {
  static Products(products: ProductEntity[]): IProductOutput[] {
    return products.map((product) => this.Product(product));
  }

  static Product(product: ProductEntity): IProductOutput {
    return new ProductDto(
      product.id,
      product.name,
      product.category,
      product.price,
      product.description
    );
  }

  static OrderProduct(product: ProductEntity): IOrderProductOutput {
    return new OrderProductDto(
      product.id,
      product.name,
      product.price,
      product.description
    );
  }
}

export default ProductPresenter;