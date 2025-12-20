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

export type Currency = "EUR" | "USD";
