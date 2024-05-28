import IOrderInput from "Core/Application/Ports/Input/order.input";

export interface ICreateOrderUseCase {
  execute(orderInput: IOrderInput): Promise<void>;
}
