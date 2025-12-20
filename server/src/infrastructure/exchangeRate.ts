// Currently the exchange rates are using in memory data. In the production environment, It is better to use a 3rd party API.
const exchangeRates = { USD: 3000, EUR: 2500 };
export const getEthereumExchangeRate = (): { USD: number; EUR: number } => {
  return { ...exchangeRates };
};
