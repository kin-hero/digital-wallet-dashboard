import type { ExchangeRateResponse } from "../schemas/exchangeRate.schema";
import type { Currency } from "../schemas/common.schema";
import { getEthereumExchangeRate as getEthereumExchangeRateFromInfra, updateEthereumExchangeRate as updateEthereumExchangeRateFromInfra } from "../infrastructure/exchangeRate";

// In production, this should be async when fetching from a real API or database
export const getEthereumExchangeRate = (): ExchangeRateResponse => {
  const exchangeRate = getEthereumExchangeRateFromInfra();
  return {
    statusCode: 200,
    message: "Success",
    result: exchangeRate,
  };
};

export const updateEthereumExchangeRate = (currency: Currency, rate: number): ExchangeRateResponse => {
  const newExchangeRates = updateEthereumExchangeRateFromInfra(currency, rate);
  return {
    statusCode: 200,
    message: `Successfully updated ${currency} to ${rate}`,
    result: newExchangeRates,
  };
};
