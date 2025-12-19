import type { EthereumAddress } from "../schemas/common.schema";
import type { CheckWalletAgeResponse } from "../schemas/wallet.schema";
import { getTheMostRecentTransactionOfAddress } from "../infrastructure/wallet";

const verifyWalletAge = async (address: EthereumAddress): Promise<CheckWalletAgeResponse> => {
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

  // Determine if wallet is old (> 365 days)
  const isOld = differenceInDays > 365;

  // Format date as YYYY-MM-DD
  const lastTransactionDate = transactionDate.toISOString().substring(0, 10);

  return {
    statusCode: 200,
    message: "Success",
    result: {
      isOld,
      lastTransactionDate,
    },
  };
};

export default verifyWalletAge;
