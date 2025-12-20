export function ExchangeRateLoading() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Current Exchange Rates</h2>
        <p className="text-gray-600">Real-time ETH to fiat currency rates</p>
      </div>

      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading exchange rates...</p>
        </div>
      </div>
    </div>
  );
}
