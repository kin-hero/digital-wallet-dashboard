// API Client - Centralized API calls to backend

import { config } from "./config";
import type { ExchangeRatesResponse } from "@/types/api";

export async function getExchangeRates(): Promise<ExchangeRatesResponse> {
  const response = await fetch(`${config.apiUrl}/api/exchange-rate`, {
    cache: "no-store", // Always fetch fresh data
  });
  return response.json();
}
