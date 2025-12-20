// API Response Types matching backend

export interface SuccessResponse<T> {
  statusCode: number;
  message: string;
  result: T;
}

export type ExchangeRatesResponse = SuccessResponse<{
  EUR: number;
  USD: number;
}>;

export type WalletAgeResponse = SuccessResponse<{
  isOld: boolean;
  lastTransactionDate: string;
}>;

export type Currency = "EUR" | "USD";
