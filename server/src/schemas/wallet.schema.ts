import { z } from "zod";
import { ethereumAddressSchema, errorResponseSchema, successResponseSchema } from "./common.schema";

export const checkWalletAgeParamsSchema = z.object({
  address: ethereumAddressSchema,
});

export const checkWalletAgeResponseSchema = successResponseSchema.extend({
  result: z.object({
    isOld: z.boolean(),
    lastTransactionDate: z.iso.date(),
  }),
});

export const checkWalletAgeSchema = {
  params: checkWalletAgeParamsSchema,
  response: {
    200: checkWalletAgeResponseSchema,
    400: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
} as const;

export type CheckWalletAgeParams = z.infer<typeof checkWalletAgeParamsSchema>;
export type CheckWalletAgeResponse = z.infer<typeof checkWalletAgeResponseSchema>;
