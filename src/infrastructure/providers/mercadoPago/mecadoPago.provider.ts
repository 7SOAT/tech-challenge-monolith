import { HttpService } from "@nestjs/axios";
import { Inject } from "@nestjs/common";
import MercadoPagoConfig from "domain/config/mercado-pago.config";
import MPCreateOrderRequest from "./types/mercadoPago.request.types";
import EnvironmentConfigService from "infrastructure/config/environment-config/environment-config.service";
import OrderModel from "domain/models/order.model";

export default class MercadoPagoProvider {
   private readonly baseUrl: string = this._mercadoPagoConfig.getMercadoPagoBaseUrl();
   private readonly vendedorId: number = this._mercadoPagoConfig.getMercadoPagoVendedorUserId();
   private readonly caixaID: string = this._mercadoPagoConfig.getMercadoPagoCaixaExternalId();
   private readonly apiVersion: string = this._mercadoPagoConfig.getMercadoPagoVersion();
   private readonly accessToken: string = `Bearer ${this._mercadoPagoConfig.getMercadoPagoAccessToken()}`

   constructor(
      @Inject(HttpService)
      private readonly _httpService: HttpService,

      @Inject(EnvironmentConfigService)
      private readonly _mercadoPagoConfig: MercadoPagoConfig
   ) { }

   async createOrder(order: OrderModel) {
      // TODO: Adapter
      const request: MPCreateOrderRequest = new MPCreateOrderRequest(
         `Pedido ${order.orderNumber}`,
         order.totalValue,
         order.id,
         order.products.map((product) => {
            return {
               sku_number: product.id.toString(),
               category: product.category,
               title: product.name,
               description: product.description,
               unit_price: product.price,
               unit_measure: "unit",
               quantity: 1,
               total_amount: product.price
            }
         }),
         {id: parseInt(this._mercadoPagoConfig.getMercadoPagoSponsorUserId().toString())},
         { amount: 0},
         "Description",
         this._mercadoPagoConfig.getMercadoPagoNotificationUrl()
      );

      const headers = { Authorization: this.accessToken };
      const url: string = `${this.baseUrl}/instore/orders/qr/seller/collectors/${this.vendedorId}/pos/${this.caixaID}/qrs`;
      try {
         const requested = await this._httpService.axiosRef.put(
            url,
            request,
            { headers }
         );
         return requested.data;
      } catch (err) {
         throw Error(err);
      }
   }

   async findPaymentById(paymentId: number) {
      try {
         const headers = { Authorization: this.accessToken }
         const responseData = (
            await this._httpService
               .axiosRef
               .get(`${this.baseUrl}/${this.apiVersion}/payments/${paymentId}`, { headers })
         );
         return responseData.data;
      } catch (err) {
         throw Error(err);
      }
   }
}