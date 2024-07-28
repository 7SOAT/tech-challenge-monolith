import OrderDto from "@api/dtos/order/output/order.dto";
import OrderEntity from "@entities/order.entity";
import IOrderOutput from "@type/output/order.output";

class OrderPresenter {
  static Orders(orders: OrderEntity[]): IOrderOutput[] {
    return orders.map((order) => this.Order(order));
  }

  static Order(order: OrderEntity): IOrderOutput {
    return new OrderDto(
      order.id,
      order.totalValue
    );
  }
}

export default OrderPresenter;