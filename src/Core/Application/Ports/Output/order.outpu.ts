import { OrderStatus } from 'Core/Domain/Enums/orderStatus.enum';

export default interface IOrderOutput {
  id: string;
  isActive: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  orderStatus: OrderStatus;
  totalValue: number;
}
