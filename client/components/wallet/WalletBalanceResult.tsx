import type { Currency } from "@/types/api";

interface WalletBalanceResultProps {
  address: string;
  ethBalance: string;
  convertedAmount: number;
  currency: Currency;
}

export function WalletBalanceResult({
  address,
  ethBalance,
  convertedAmount,
  currency,
}: WalletBalanceResultProps) {
  return (
    <div className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
      <div className="flex items-start space-x-3">
        <div className="text-3xl flex-shrink-0">💰</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-lg text-gray-900 mb-2">Wallet Balance</h4>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <p className="font-medium mb-1">Address:</p>
              <p className="font-mono text-xs break-all">{address}</p>
            </div>
            <div>
              <p className="font-medium mb-1">ETH Balance:</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 break-all">
                {ethBalance} ETH
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Converted Amount:</p>
              <p className="text-base sm:text-lg font-bold text-green-600">
                {currency === "USD" ? "$" : "€"}
                {convertedAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
