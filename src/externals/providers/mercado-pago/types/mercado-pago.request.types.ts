import { UUID } from "crypto";

type OrderItem = {
   sku_number: string,
   category: string,
   title: string,
   description: string,
   unit_price: number,
   quantity?: number,
   unit_measure?: "unit",
   total_amount: number,
}

export default class MPCreateOrderRequest {
   constructor(
      public title: string,
      public total_amount: number,
      public external_reference: UUID,
      public items: OrderItem[],
      public sponsor: { id: number },
      public cash_out: { amount: number },
      public description?: string,
      public notification_url?: string,
   ) { }
}