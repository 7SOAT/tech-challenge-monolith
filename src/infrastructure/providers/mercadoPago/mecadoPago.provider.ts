import { HttpService } from "@nestjs/axios";
import { Inject } from "@nestjs/common";
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';

export type CreatePaymentRequest = {
   cash_out: {
      amount: number
   },
   description: string,
   external_reference: string,
   items: {
      sku_number: string,
      category: string,
      title: string,
      description: string,
      unit_price: number,
      quantity: number,
      unit_measure: "unit" | "",
      total_amount: number,
   }[],
   notification_url?: string,
   sponsor: {
      id: number
   },
   title: string,
   total_amount: number
}

export class MercadoPagoProvider {

   private readonly baseUrl = process.env.MERCADO_PAGO_BASE_URL;
   private readonly notification_url: string = "https://api.mercadopago.com/instore/orders/qr/seller/collectors/1910982443/pos/CAIXAEID/qrs";
   private readonly accessToken = `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`

   constructor(
      @Inject(HttpService)
      private readonly _httpService: HttpService,

   ) { }

   async createOrder(request: CreatePaymentRequest) {
      const headers = { Authorization: this.accessToken };
      try {
         const requested = await this._httpService.axiosRef.put(this.notification_url, request, { headers: headers });
         return requested.data;
      } catch (err) {
         console.log(err)
      }

   }

   async findPaymentById(paymentId: string) {
      try {
         const responseData = (await this._httpService
            .axiosRef.get(`${this.baseUrl}/v1/payments/${paymentId}`, {
               headers: {
                  Authorization: this.accessToken,
               },
            }));
         return responseData.data;
      } catch (err) {
         throw Error(err);
      }
   }
}