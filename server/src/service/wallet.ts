import type { EthereumAddress } from "../schemas/common.schema";
import type { CheckWalletAgeResponse } from "../schemas/wallet.schema";
import { getTheMostRecentTransactionOfAddress } from "../infrastructure/wallet";
import { EtherscanApiError, ServiceUnavailableError } from "../errors";
import { ZodError } from "zod";
import { config } from "../config";

const verifyWalletAge = async (address: EthereumAddress): Promise<CheckWalletAgeResponse> => {
  try {
    const { result } = await getTheMostRecentTransactionOfAddress(address);
    const mostRecentTransaction = result[0];
    if (!mostRecentTransaction) {
      return {
        statusCode: 200,
        message: "Success",
        result: {
          isOld: false,
          lastTransactionDate: "Never",
        },
      };
    }
    // Convert timestamp to Date object
    const timeStamp = Number(mostRecentTransaction.timeStamp);
    const transactionDate = new Date(timeStamp * 1000);

    // Calculate difference in days
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - transactionDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    // Determine if wallet is old (older than threshold)
    const thresholdInDays = config.validWalletYears * 365;
    const isOld = differenceInDays >= thresholdInDays;

    const lastTransactionDate = transactionDate.toISOString().substring(0, 10);

    return {
      statusCode: 200,
      message: "Success",
      result: {
        isOld,
        lastTransactionDate,
      },
    };
  } catch (error) {
    // Handle Zod validation errors (invalid response format from Etherscan)
    if (error instanceof ZodError) {
      throw new EtherscanApiError("Etherscan API returned invalid response format");
    }

    // Handle network errors (fetch failures, timeouts, DNS issues)
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ServiceUnavailableError("Unable to connect to Etherscan API");
    }

    throw error;
  }
};

export default verifyWalletAge;
