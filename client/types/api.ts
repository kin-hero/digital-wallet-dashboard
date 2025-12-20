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

export type WalletBalanceResponse = SuccessResponse<{
  address: string;
  ethBalance: string;
  convertedAmount: number;
  currency: Currency;
}>;

export type Currency = "EUR" | "USD";
