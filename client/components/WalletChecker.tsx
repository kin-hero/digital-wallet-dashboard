"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { checkWalletAge, checkWalletBalance } from "@/lib/api";
import type { Currency } from "@/types/api";
import { WalletAgeResult } from "./WalletAgeResult";
import { WalletBalanceResult } from "./WalletBalanceResult";

interface WalletCheckerProps {
  refreshKey?: number;
}

export function WalletChecker({ refreshKey }: WalletCheckerProps) {
  const [address, setAddress] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [isLoading, setIsLoading] = useState(false);
  const [ageResult, setAgeResult] = useState<{
    isOld: boolean;
    lastTransactionDate: string;
  } | null>(null);
  const [balanceResult, setBalanceResult] = useState<{
    address: string;
    ethBalance: string;
    convertedAmount: number;
    currency: Currency;
  } | null>(null);

  const validateEthereumAddress = (addr: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(addr);
  };

  const fetchWalletData = useCallback(
    async (isAutoRefresh = false) => {
      if (!address.trim() || !validateEthereumAddress(address)) {
        return;
      }

      setIsLoading(true);
      setAgeResult(null);
      setBalanceResult(null);

      try {
        const ageResponse = await checkWalletAge(address);
        const balanceResponse = await checkWalletBalance(address, currency);

        if (ageResponse.statusCode === 200 && balanceResponse.statusCode === 200) {
          setAgeResult(ageResponse.result);
          setBalanceResult(balanceResponse.result);
          toast.success(isAutoRefresh ? "Wallet balance updated with new exchange rates!" : "Wallet information fetched successfully!");
        } else {
          if (ageResponse.statusCode !== 200) {
            toast.error(ageResponse.message || "Failed to check wallet age");
          }
          if (balanceResponse.statusCode !== 200) {
            toast.error(balanceResponse.message || "Failed to fetch wallet balance");
          }
        }
      } catch {
        toast.error("An error occurred while fetching wallet information");
      } finally {
        setIsLoading(false);
      }
    },
    [address, currency]
  );

  // Auto re-fetch when exchange rates update
  useEffect(() => {
    if (refreshKey !== undefined && refreshKey > 0 && balanceResult) {
      fetchWalletData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

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

    await fetchWalletData();
  };

  const handleClear = () => {
    setAddress("");
    setAgeResult(null);
    setBalanceResult(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Check Wallet Information</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Currency Selection */}
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
            Currency for Balance Conversion
          </label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="currency" value="USD" checked={currency === "USD"} onChange={(e) => setCurrency(e.target.value as Currency)} className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">🇺🇸 USD</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="currency" value="EUR" checked={currency === "EUR"} onChange={(e) => setCurrency(e.target.value as Currency)} className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">🇪🇺 EUR</span>
            </label>
          </div>
        </div>

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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm text-gray-900"
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
            {isLoading ? "Checking..." : "Check Wallet"}
          </button>
          {(address || ageResult || balanceResult) && (
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

      {/* Results Display */}
      {(ageResult || balanceResult) && (
        <div className="mt-6 space-y-4">
          {ageResult && <WalletAgeResult isOld={ageResult.isOld} lastTransactionDate={ageResult.lastTransactionDate} />}
          {balanceResult && (
            <WalletBalanceResult address={balanceResult.address} ethBalance={balanceResult.ethBalance} convertedAmount={balanceResult.convertedAmount} currency={balanceResult.currency} />
          )}
        </div>
      )}
    </div>
  );
}
