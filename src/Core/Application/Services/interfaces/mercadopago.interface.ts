import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';


export interface IMercadoPagoService {
  createPayment(body: PaymentCreateRequest): Promise<any>;
}
