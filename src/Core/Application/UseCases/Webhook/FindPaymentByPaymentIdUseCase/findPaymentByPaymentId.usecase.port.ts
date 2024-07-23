export interface IFindPaymentByPaymentIdUseCase {
  execute(paymentId: string): Promise<any>;
}
