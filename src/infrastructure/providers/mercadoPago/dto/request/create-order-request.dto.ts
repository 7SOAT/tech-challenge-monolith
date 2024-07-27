export type MercadoPagoCreateOrderRequestDto = {
  total_amount: string;
  external_reference: string;
  sponsor: { id: number };
  cash_out: { amount?: number };
  description?: string;
  notification_url?: string
}