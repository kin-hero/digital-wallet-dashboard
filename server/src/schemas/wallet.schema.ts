import { z } from "zod";
import { ethereumAddressSchema, errorResponseSchema, successResponseSchema, currencySchema } from "./common.schema";

export const ethereumAddressParams = z.object({
  address: ethereumAddressSchema,
});
export type EthereumAddressParams = z.infer<typeof ethereumAddressParams>;
export const currencyQueryString = z.object({
  currency: currencySchema,
});
export type CurrencyQueryString = z.infer<typeof currencyQueryString>;

export const lastTransactionDateSchema = z.union([z.iso.date(), z.literal("Never")]);
export const checkWalletAgeResponseSchema = successResponseSchema.extend({
  result: z.object({
    isOld: z.boolean(),
    lastTransactionDate: lastTransactionDateSchema,
  }),
});
export type CheckWalletAgeResponse = z.infer<typeof checkWalletAgeResponseSchema>;

export const checkWalletAgeSchema = {
  params: ethereumAddressParams,
  response: {
    200: checkWalletAgeResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
    502: errorResponseSchema,
    503: errorResponseSchema,
  },
} as const;

export const walletBalanceWithCurrencyResponseSchema = successResponseSchema.extend({
  result: z.object({
    address: ethereumAddressSchema,
    ethBalance: z.string(),
    convertedAmount: z.number(),
    currency: currencySchema,
  }),
});

export type WalletBalanceWithCurrencyResponse = z.infer<typeof walletBalanceWithCurrencyResponseSchema>;

export const walletBalanceWithCurrencySchema = {
  querystring: currencyQueryString,
  params: ethereumAddressParams,
  response: {
    200: walletBalanceWithCurrencyResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
    502: errorResponseSchema,
    503: errorResponseSchema,
  },
} as const;
