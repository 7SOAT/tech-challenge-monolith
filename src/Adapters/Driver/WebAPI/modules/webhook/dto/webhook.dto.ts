
export class WebhookDto {
  type: 'payments';
  action: 'payment.updated'
  data: { id: string}
}
