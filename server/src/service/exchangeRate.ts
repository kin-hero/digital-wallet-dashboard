import type { ExchangeRateResponse } from "../schemas/exchangeRate.schema";
import { getEthereumExchangeRate as getEthereumExchangeRateFromInfra } from "../infrastructure/exchangeRate";

// In production, this should be async when fetching from a real API or database
export const getEthereumExchangeRate = (): ExchangeRateResponse => {
  const exchangeRate = getEthereumExchangeRateFromInfra();
  return {
    statusCode: 200,
    message: "Success",
    result: exchangeRate,
  };
};
