export enum PaymentProvider {
  TRANSBANK = 'transbank',
  MERCADOPAGO = 'mercadopago',
  FLOW = 'flow',
}

export const CHILEAN_IVA = 0.19;

export const SUPPORTED_CURRENCIES = ['CLP', 'USD', 'EUR'] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];
