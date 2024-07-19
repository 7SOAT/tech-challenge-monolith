export interface ResponseWebhook {
  accounts_info: any
  acquirer_reconciliation: any[]
  additional_info: AdditionalInfo
  authorization_code: any
  binary_mode: boolean
  brand_id: any
  build_version: string
  call_for_authorize_id: any
  captured: boolean
  card: Card
  charges_details: ChargesDetail[]
  collector_id: number
  corporation_id: any
  counter_currency: any
  coupon_amount: number
  currency_id: string
  date_approved: string
  date_created: string
  date_last_updated: string
  date_of_expiration: any
  deduction_schema: any
  description: string
  differential_pricing_id: any
  external_reference: any
  fee_details: FeeDetail[]
  financing_group: any
  id: number
  installments: number
  integrator_id: any
  issuer_id: string
  live_mode: boolean
  marketplace_owner: any
  merchant_account_id: any
  merchant_number: any
  metadata: Metadata2
  money_release_date: string
  money_release_schema: any
  money_release_status: string
  notification_url: any
  operation_type: string
  order: Order
  payer: Payer
  payment_method: PaymentMethod
  payment_method_id: string
  payment_type_id: string
  platform_id: any
  point_of_interaction: PointOfInteraction
  pos_id: any
  processing_mode: string
  refunds: any[]
  release_info: any
  shipping_amount: number
  sponsor_id: any
  statement_descriptor: any
  status: string
  status_detail: string
  store_id: any
  tags: any
  taxes_amount: number
  transaction_amount: number
  transaction_amount_refunded: number
  transaction_details: TransactionDetails
}

export interface AdditionalInfo {
  authentication_code: any
  available_balance: any
  ip_address: string
  items: Item[]
  nsu_processadora: any
}

export interface Item {
  category_id: any
  description: any
  id: any
  picture_url: any
  quantity: string
  title: string
  unit_price: string
}

export interface Card {}

export interface ChargesDetail {
  accounts: Accounts
  amounts: Amounts
  client_id: number
  date_created: string
  id: string
  last_updated: string
  metadata: Metadata
  name: string
  refund_charges: any[]
  reserve_id: any
  type: string
}

export interface Accounts {
  from: string
  to: string
}

export interface Amounts {
  original: number
  refunded: number
}

export interface Metadata {}

export interface FeeDetail {
  amount: number
  fee_payer: string
  type: string
}

export interface Metadata2 {}

export interface Order {
  id: string
  type: string
}

export interface Payer {
  email: string
  entity_type: any
  first_name: any
  id: string
  identification: Identification
  last_name: any
  operator_id: any
  phone: Phone
  type: any
}

export interface Identification {
  number: string
  type: string
}

export interface Phone {
  number: any
  extension: any
  area_code: any
}

export interface PaymentMethod {
  id: string
  issuer_id: string
  type: string
}

export interface PointOfInteraction {
  business_info: BusinessInfo
  transaction_data: TransactionData
  type: string
}

export interface BusinessInfo {
  branch: string
  sub_unit: string
  unit: string
}

export interface TransactionData {
  e2e_id: any
}

export interface TransactionDetails {
  acquirer_reference: any
  external_resource_url: any
  financial_institution: any
  installment_amount: number
  net_received_amount: number
  overpaid_amount: number
  payable_deferral_period: any
  payment_method_reference_id: any
  total_paid_amount: number
}
