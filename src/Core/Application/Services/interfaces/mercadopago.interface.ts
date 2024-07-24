import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';

export interface IMercadoPagoService {
  createOrder(): Promise<any>;
}
