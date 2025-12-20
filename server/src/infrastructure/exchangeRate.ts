import type { Currency, ExchangeRates } from "../schemas/common.schema";

// Currently the exchange rates are using in memory data. In the production environment, It is better to use a 3rd party API.
const exchangeRates = { USD: 3000, EUR: 2500 };
export const getEthereumExchangeRate = (): ExchangeRates => {
  return { ...exchangeRates };
};

export const updateEthereumExchangeRate = (currency: Currency, rate: number): ExchangeRates => {
  exchangeRates[currency] = rate;
  return { ...exchangeRates };
};
