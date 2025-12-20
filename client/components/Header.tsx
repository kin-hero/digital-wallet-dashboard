export function Header() {
  return (
    <header className="bg-linear-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">💼</div>
            <div>
              <h1 className="text-2xl font-bold">Digital Wallet Dashboard</h1>
              <p className="text-sm text-blue-100">Ethereum Analytics Platform</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
