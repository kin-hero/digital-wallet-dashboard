import { z } from "zod";

export const ethereumAddressSchema = z
  .string()
  .length(42)
  .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format");

export type EthereumAddress = z.infer<typeof ethereumAddressSchema>;

export const errorResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});

export const successResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});
