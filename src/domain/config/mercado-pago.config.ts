export interface MercadoPagoConfig{
    getMercadoPagoVendedorUserId(): number;
    getMercadoPagoSponsorUserId(): number;
    getMercadoPagoAccessToken(): string;
    getMercadoPagoBaseUrl(): string;
    getMercadoPagoVersion(): string;
    getMercadoPagoCaixaExternalId(): string;
    getMercadoPagoNotificationUrl(): string;
}