import { HttpService } from "@nestjs/axios";

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
   private readonly notification_url: string = "https://api.mercadopago.com/instore/orders/qr/seller/collectors/1910982443/pos/CAIXAEID/qrs";
   private readonly accessToken = `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`

   constructor(private readonly httpService: HttpService){} 

    async createOrder(request: CreatePaymentRequest){
      const headers = { Authorization: this.accessToken};
      return (await this.httpService.axiosRef.put(this.notification_url, request, {headers: headers})).data;
   }
}