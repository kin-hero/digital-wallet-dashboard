interface WalletAgeResultProps {
  isOld: boolean;
  lastTransactionDate: string;
}

export function WalletAgeResult({ isOld, lastTransactionDate }: WalletAgeResultProps) {
  return (
    <div className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
      <div className="flex items-start space-x-3">
        <div className="text-3xl">{isOld ? "🕰️" : "🆕"}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-gray-900 mb-2">
            {isOld ? "Old Wallet" : "Recent Wallet"}
          </h4>
          <div className="space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-medium">Status:</span>{" "}
              {isOld
                ? "Last transaction was more than 1 year ago"
                : "Active within the last year"}
            </p>
            <p>
              <span className="font-medium">Last Transaction:</span>{" "}
              {new Date(lastTransactionDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
