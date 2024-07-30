import OrderCustomerDto from '@api/dtos/customer/output/order-customer.dto';
import OrderStatusDto from '@api/dtos/order-status/output/order-status.dto';
import OrderQRCodeDto from '@api/dtos/order/output/order-qr-code.dto';
import OrderDto from '@api/dtos/order/output/order.dto';
import OrderProductDto from '@api/dtos/product/output/order-product.dto';
import OrderEntity from '@entities/order/order.entity';

class OrderPresenter {
  static PresentOne(order: OrderEntity): OrderDto {
    return new OrderDto(
      order.id,
      order.totalValue,
      order.products.map(
        (product) =>
          new OrderProductDto(
            product.id,
            product.name,
            product.price,
            product.description,
            product.category
          )
      ),
      order.customer?.id
        ? new OrderCustomerDto(order.customer.id, order.customer.name)
        : null,
      new OrderStatusDto(
        order.status.id,
        order.status.name,
        order.status.description
      ),
      order.orderNumber
    );
  }

  static PresentMany(orders: OrderEntity[]): OrderDto[] {
    return orders.map((order) => this.PresentOne(order));
  }

  static PresentOneOrderQRData(qr_data: string): OrderQRCodeDto {
    return new OrderQRCodeDto(qr_data);
  }
}

export default OrderPresenter;
