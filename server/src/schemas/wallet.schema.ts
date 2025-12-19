import { z } from "zod";
import { ethereumAddressSchema, errorResponseSchema, successResponseSchema } from "./common.schema";

export const checkWalletAgeParamsSchema = z.object({
  address: ethereumAddressSchema,
});

export const lastTransactionDateSchema = z.union([z.iso.date(), z.literal("Never")]);

export const checkWalletAgeResponseSchema = successResponseSchema.extend({
  result: z.object({
    isOld: z.boolean(),
    lastTransactionDate: lastTransactionDateSchema,
  }),
});

export const checkWalletAgeSchema = {
  params: checkWalletAgeParamsSchema,
  response: {
    200: checkWalletAgeResponseSchema,
    400: errorResponseSchema,
    500: errorResponseSchema,
    502: errorResponseSchema,
    503: errorResponseSchema,
  },
} as const;

export type CheckWalletAgeParams = z.infer<typeof checkWalletAgeParamsSchema>;
export type CheckWalletAgeResponse = z.infer<typeof checkWalletAgeResponseSchema>;
