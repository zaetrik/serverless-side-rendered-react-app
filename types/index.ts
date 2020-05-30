export enum CurrencyEnum {
  'EUR',
  'USD',
  'CAD',
  'HKD',
  'ISK',
  'PHP',
  'DKK',
  'HUF',
  'CZK',
  'GBP',
  'RON',
  'SEK',
  'IDR',
  'INR',
  'BRL',
  'RUB',
  'HRK',
  'JPY',
  'THB',
  'CHF',
  'MYR',
  'BGN',
  'TRY',
  'CNY',
  'NOK',
  'NZD',
  'ZAR',
  'MXN',
  'SGD',
  'AUD',
  'ILS',
  'KRW',
  'PLN',
}
export type Currency = keyof typeof CurrencyEnum

export interface ExchangeRates {
  base: Currency
  date: string // yyyy-MM-dd
  rates: { [key in Currency]?: ExchangeRate }
}

export type Timestamp = number

export type UUID = string

export type ExchangeRate = number

export interface HistoricExchangeRate {
  currency: Currency
  createdAt: Timestamp
  id: UUID
  rate: ExchangeRate
  base: Currency
}
