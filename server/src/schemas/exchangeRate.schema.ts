import { z } from "zod";
import { errorResponseSchema, successResponseSchema } from "./common.schema";

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
};

export type ExchangeRateResponse = z.infer<typeof exchangeRateResponseSchema>;
