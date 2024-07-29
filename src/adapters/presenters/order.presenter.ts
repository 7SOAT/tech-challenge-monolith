import OrderCustomerDto from "@api/dtos/customer/output/order-customer.dto";
import OrderStatusDto from "@api/dtos/order-status/output/order-status.dto";
import OrderDto from "@api/dtos/order/output/order.dto";
import OrderProductDto from "@api/dtos/product/output/order-product.dto";
import OrderEntity from "@entities/order/order.entity";
import IOrderOutput from "@type/output/order.output";

class OrderPresenter {
  static Orders(orders: OrderEntity[]): IOrderOutput[] {
    return orders.map((order) => this.Order(order));
  }

  static Order(order: OrderEntity): IOrderOutput {    
    return new OrderDto(
      order.id,
      order.totalValue,
      order.products.map(product => new OrderProductDto(
        product.id,
        product.name,
        product.price,
        product.description
      )),
      order.customer?.id ? new OrderCustomerDto(
        order.customer.id,
        order.customer.name
      ) : null,
      new OrderStatusDto(
        order.status.id,
        order.status.name,
        order.status.description
      ),
      order.orderNumber
    ); 
  }
}

export default OrderPresenter;