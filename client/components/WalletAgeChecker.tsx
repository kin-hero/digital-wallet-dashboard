"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { checkWalletAge } from "@/lib/api";

export function WalletAgeChecker() {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    isOld: boolean;
    lastTransactionDate: string;
  } | null>(null);

  const validateEthereumAddress = (addr: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(addr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.trim()) {
      toast.error("Please enter a wallet address");
      return;
    }

    if (!validateEthereumAddress(address)) {
      toast.error("Invalid Ethereum address format");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await checkWalletAge(address);

      if (response.statusCode === 200) {
        setResult(response.result);
        toast.success("Wallet age checked successfully!");
      } else {
        toast.error(response.message || "Failed to check wallet age");
      }
    } catch {
      toast.error("An error occurred while checking wallet age");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setAddress("");
    setResult(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Check Wallet Age</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Address Input */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Ethereum Wallet Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500">Enter a valid Ethereum address (0x followed by 40 hex characters)</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading || !address}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {isLoading ? "Checking..." : "Check Wallet Age"}
          </button>
          {(address || result) && (
            <button
              type="button"
              onClick={handleClear}
              disabled={isLoading}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Result Display */}
      {result && (
        <div className="mt-6 p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
          <div className="flex items-start space-x-3">
            <div className="text-3xl">{result.isOld ? "🕰️" : "🆕"}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">{result.isOld ? "Old Wallet" : "Recent Wallet"}</h4>
              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Status:</span> {result.isOld ? "Last transaction was more than 1 year ago" : "Active within the last year"}
                </p>
                <p>
                  <span className="font-medium">Last Transaction:</span> {result.lastTransactionDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
