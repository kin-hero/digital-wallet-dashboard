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
        <div className="text-3xl">💰</div>
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-gray-900 mb-2">Wallet Balance</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Address:</span>{" "}
              <span className="font-mono text-xs">{address}</span>
            </p>
            <p>
              <span className="font-medium">ETH Balance:</span>{" "}
              <span className="text-lg font-bold text-gray-900">
                {ethBalance} ETH
              </span>
            </p>
            <p>
              <span className="font-medium">Converted Amount:</span>{" "}
              <span className="text-lg font-bold text-green-600">
                {currency === "USD" ? "$" : "€"}
                {convertedAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
