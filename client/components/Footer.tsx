export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm">
              © {new Date().getFullYear()} Digital Wallet Dashboard
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Powered by Etherscan API
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://etherscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-white transition-colors"
            >
              Etherscan
            </a>
            <a
              href="https://github.com/kin-hero/digital-wallet-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
