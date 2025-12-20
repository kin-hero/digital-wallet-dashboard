// API Client - Centralized API calls to backend

import { config } from "./config";
import type { ExchangeRatesResponse, Currency, WalletAgeResponse } from "@/types/api";

export async function getExchangeRates(): Promise<ExchangeRatesResponse> {
  const response = await fetch(`${config.apiUrl}/api/exchange-rate`, {
    cache: "no-store", // Always fetch fresh data
  });
  return response.json();
}

export async function updateExchangeRate(
  currency: Currency,
  rate: number
): Promise<ExchangeRatesResponse> {
  const response = await fetch(`${config.apiUrl}/api/exchange-rate`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currency, rate }),
    cache: "no-store",
  });
  return response.json();
}

export async function checkWalletAge(address: string): Promise<WalletAgeResponse> {
  const response = await fetch(`${config.apiUrl}/api/wallet/${address}/is-old`, {
    cache: "no-store",
  });
  return response.json();
}
