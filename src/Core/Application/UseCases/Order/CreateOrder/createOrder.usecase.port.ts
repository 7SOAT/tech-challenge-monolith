import IOrderInput from 'Core/Application/Ports/Input/order.input';

export interface ICreateOrderUseCase {
  execute(orderInput: IOrderInput): Promise<{in_store_order_id: string, qr_data: string}>;
}
