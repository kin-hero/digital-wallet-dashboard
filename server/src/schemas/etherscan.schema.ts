import { z } from "zod";

export const EtherscanTxSchema = z.object({
  blockNumber: z.string(),
  timeStamp: z.string(),
  hash: z.string(),
  nonce: z.string(),
  blockHash: z.string(),
  transactionIndex: z.string(),
  from: z.string(),
  to: z.string(),
  value: z.string(),
  gas: z.string(),
  gasPrice: z.string(),
  isError: z.enum(["0", "1"]),
  txreceipt_status: z.enum(["0", "1"]),
  input: z.string(),
  contractAddress: z.string(),
  cumulativeGasUsed: z.string(),
  gasUsed: z.string(),
  confirmations: z.string(),
  methodId: z.string(),
  functionName: z.string(),
});

export const EtherscanTxResponseSchema = z.object({
  status: z.enum(["0", "1"]),
  message: z.string(),
  result: z.array(EtherscanTxSchema),
});

export type EtherscanTxResponse = z.infer<typeof EtherscanTxResponseSchema>;
