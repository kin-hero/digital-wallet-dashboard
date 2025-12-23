import { getExchangeRates } from "@/lib/api";

export async function ExchangeRateDisplay() {
  const data = await getExchangeRates();

  // Check if API returned an error status
  if (data.statusCode !== 200) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Current Exchange Rates</h1>
          <p className="text-gray-600">Real-time ETH to fiat currency rates</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="text-3xl">⚠️</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Exchange Rates</h3>
              <p className="text-red-700 mb-3">We are having trouble connecting to our exchange rate service right now.</p>
              <p className="text-sm text-red-600">Please try refreshing the page in a few moments. If the problem persists, contact support.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  const { EUR, USD } = data.result;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Current Exchange Rates</h1>
        <p className="text-gray-600">Real-time ETH to fiat currency rates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EUR Card */}
        <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div className="text-4xl">🇪🇺</div>
            <span className="text-sm font-medium text-purple-700 bg-purple-200 px-3 py-1 rounded-full">EUR</span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">1 ETH =</p>
            <p className="text-3xl font-bold text-purple-900">
              €
              {EUR.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        {/* USD Card */}
        <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between mb-3">
            <div className="text-4xl">🇺🇸</div>
            <span className="text-sm font-medium text-green-700 bg-green-200 px-3 py-1 rounded-full">USD</span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">1 ETH =</p>
            <p className="text-3xl font-bold text-green-900">
              $
              {USD.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
