import type { EthereumAddress } from "../schemas/common.schema";
import type { EtherscanTxResponse } from "../schemas/etherscan.schema";
import { EtherscanTxResponseSchema } from "../schemas/etherscan.schema";
import { config } from "../config";

export const getTheMostRecentTransactionOfAddress = async (address: EthereumAddress): Promise<EtherscanTxResponse> => {
  const url = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${address}&page=1&offset=1&sort=desc&apikey=${config.etherscanApiKey}`;
  const response = await fetch(url);
  const rawData = await response.json();
  const data: EtherscanTxResponse = EtherscanTxResponseSchema.parse(rawData);
  return data;
};
