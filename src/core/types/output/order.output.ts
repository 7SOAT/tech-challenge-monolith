import { IOrderCustomerOutput } from "./customer.output";
import { IOrderProductOutput } from "./product.output";

export default interface IOrderOutput {
  id: string;
  totalValue: number;
  products: Array<IOrderProductOutput>;
  customer: IOrderCustomerOutput | null;
}