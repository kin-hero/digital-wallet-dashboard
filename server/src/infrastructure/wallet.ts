import type { EthereumAddress } from "../schemas/common.schema";
import type { EtherscanTxResponse } from "../schemas/etherscan.schema";
import { EtherscanTxResponseSchema } from "../schemas/etherscan.schema";

export const getTheMostRecentTransactionOfAddress = async (address: EthereumAddress): Promise<EtherscanTxResponse> => {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const url = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${address}&page=1&offset=1&sort=desc&apikey=${apiKey}
`;
  const response = await fetch(url);
  const rawData = await response.json();
  const data: EtherscanTxResponse = EtherscanTxResponseSchema.parse(rawData);
  return data;
};
