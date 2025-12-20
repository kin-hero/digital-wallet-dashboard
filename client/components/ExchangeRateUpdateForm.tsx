"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateExchangeRate } from "@/lib/api";
import type { Currency } from "@/types/api";

interface ExchangeRateUpdateFormProps {
  onUpdate: () => void;
}

export function ExchangeRateUpdateForm({ onUpdate }: ExchangeRateUpdateFormProps) {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [rate, setRate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rateNumber = parseFloat(rate);
    if (isNaN(rateNumber) || rateNumber <= 0) {
      toast.error("Please enter a valid positive number");
      return;
    }

    setIsLoading(true);

    try {
      const response = await updateExchangeRate(currency, rateNumber);

      if (response.statusCode === 200) {
        toast.success(`${currency} exchange rate updated successfully!`);
        setRate("");
        // Trigger refresh of exchange rates
        onUpdate();
      } else {
        toast.error(response.message || "Failed to update exchange rate");
      }
    } catch {
      toast.error("An error occurred while updating the exchange rate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Update Exchange Rate</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Currency Selection */}
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="currency" value="EUR" checked={currency === "EUR"} onChange={(e) => setCurrency(e.target.value as Currency)} className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">🇪🇺 EUR</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="currency" value="USD" checked={currency === "USD"} onChange={(e) => setCurrency(e.target.value as Currency)} className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">🇺🇸 USD</span>
            </label>
          </div>
        </div>

        {/* Rate Input */}
        <div>
          <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-2">
            Exchange Rate (1 ETH = ? {currency})
          </label>
          <input
            type="number"
            id="rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter exchange rate"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !rate}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {isLoading ? "Updating..." : "Update Exchange Rate"}
        </button>
      </form>
    </div>
  );
}
