import { z } from "zod";
import { errorResponseSchema, successResponseSchema, currencySchema } from "./common.schema";

export const exchangeRateResponseSchema = successResponseSchema.extend({
  result: z.object({
    EUR: z.number().positive(),
    USD: z.number().positive(),
  }),
});

export const exchangeRateSchema = {
  response: {
    200: exchangeRateResponseSchema,
    500: errorResponseSchema,
  },
} as const;

export type ExchangeRateResponse = z.infer<typeof exchangeRateResponseSchema>;

export const exchangeRateBodySchema = z.object({
  currency: currencySchema,
  rate: z.number().positive(),
});

export type ExchangeRateBody = z.infer<typeof exchangeRateBodySchema>;

export const updateExchangeRateSchema = {
  body: exchangeRateBodySchema,
  response: {
    200: exchangeRateResponseSchema,
    500: errorResponseSchema,
  },
} as const;
