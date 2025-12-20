# Digital Wallet Dashboard - Server

A TypeScript-based REST API built with Fastify that provides Ethereum wallet analytics and currency conversion services using the Etherscan API.

## API Documentation

Complete API documentation with interactive examples available at:
**[Postman Documentation](https://documenter.getpostman.com/view/28076499/2sB3dWqmSC)**

## API Endpoints

### 1. Check Wallet Age

`GET /api/wallet/:address/is-old`

Determines if an Ethereum wallet's last transaction occurred more than 1 year ago, helping identify inactive or dormant wallets.

### 2. Get Exchange Rates

`GET /api/exchange-rate`

Retrieves the current Ethereum-to-fiat currency exchange rates (USD and EUR) maintained by the system.

### 3. Update Exchange Rate

`PATCH /api/exchange-rate`

Updates the exchange rate for a specific currency (USD or EUR). Changes take effect immediately for all subsequent requests.

### 4. Get Wallet Balance with Currency Conversion

`GET /api/wallet/:address/balance?currency=USD|EUR`

Fetches the current ETH balance of a wallet from the Ethereum blockchain and converts it to the specified fiat currency.

## Architecture

This server follows **Clean Architecture** principles with clear separation of concerns:

```
server/
├── src/
│   ├── routes/              # Route definitions (Fastify plugins)
│   │   ├── wallet.ts        # Wallet-related endpoints
│   │   ├── exchangeRate.ts  # Exchange rate endpoints
│   │   └── index.ts         # Route aggregation
│   │
│   ├── controllers/         # HTTP request/response handlers
│   │   ├── wallet.ts        # Wallet controllers
│   │   └── exchangeRate.ts  # Exchange rate controllers
│   │
│   ├── service/            # Business logic layer
│   │   ├── wallet.ts       # Wallet business logic
│   │   └── exchangeRate.ts # Exchange rate management
│   │
│   ├── infrastructure/     # External API integrations
│   │   ├── wallet.ts       # Etherscan API client
│   │   └── exchangeRate.ts # In-memory exchange rate storage
│   │
│   ├── schemas/            # Zod validation schemas
│   │   ├── wallet.schema.ts
│   │   ├── exchangeRate.schema.ts
│   │   ├── etherscan.schema.ts
│   │   └── common.schema.ts
│   │
│   ├── errors/             # Custom error classes
│   │   └── index.ts
│   │
│   ├── plugins/            # Fastify plugins (CORS, error handling)
│   │
│   ├── config/             # Configuration management
│   │   └── index.ts
│   │
│   └── server.ts           # Server entry point
```

### Layer Responsibilities

- **Routes Layer**: Define HTTP endpoints and attach validation schemas
- **Controllers Layer**: Handle HTTP request/response logic
- **Service Layer**: Implement business logic and orchestration
- **Infrastructure Layer**: External API clients (Etherscan) and data storage
- **Schemas Layer**: Request/response validation using Zod
- **Errors Layer**: Custom error classes with proper HTTP status codes

## Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Fastify v4
- **Language**: TypeScript (strict mode)
- **Validation**: Zod + @fastify/type-provider-zod
- **Blockchain Library**: ethers.js (Wei to ETH conversion)
- **External API**: Etherscan API v2
- **Dev Tools**: tsx, ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Etherscan API key (get one at [etherscan.io](https://etherscan.io/apis))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kin-hero/digital-wallet-dashboard.git
   cd digital-wallet-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cd server
   cp .env.example .env
   ```

   Edit `.env` and add your Etherscan API key:

   ```env
   PORT=3001
   ETHERSCAN_API_KEY=your_actual_api_key_here
   NODE_ENV=development
   VALID_WALLET_YEARS=1
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:3001`

### Available Scripts

```bash
npm run dev            # Start development server with hot reload
npm run build          # Compile TypeScript to JavaScript
npm start              # Run production server
npm run lint           # Run ESLint
npm run typecheck      # Run TypeScript type checking
npm test               # Run tests once
npm run test:watch     # Run tests in watch mode
npm run test:ui        # Run tests with UI
npm run test:coverage  # Run tests with coverage report
```

## Example Usage

### Check if wallet is old

```bash
curl "http://localhost:3001/api/wallet/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae/is-old"
```

### Get current exchange rates

```bash
curl "http://localhost:3001/api/exchange-rate"
```

### Update exchange rate

```bash
curl -X PATCH http://localhost:3001/api/exchange-rate \
  -H "Content-Type: application/json" \
  -d '{"currency":"USD","rate":3500}'
```

### Get wallet balance in USD

```bash
curl "http://localhost:3001/api/wallet/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae/balance?currency=USD"
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error
- `502` - Bad Gateway (Etherscan API error)
- `503` - Service Unavailable (connection error)

All error responses follow this format:

```json
{
  "statusCode": 400,
  "message": "Error description"
}
```

## Testing

The project includes comprehensive unit tests using **Vitest** covering:

### Test Coverage

**Service Layer Tests** (`wallet.service.test.ts`):
- Wallet age calculation with mocked Etherscan responses
- Edge cases: no transactions, boundary conditions (364/365 days)
- Time-based logic using deterministic fake timers
- Response structure validation

**Schema Validation Tests** (`wallet.schema.test.ts`):
- Ethereum address format validation (0x prefix, 40 hex chars)
- Currency enum validation (USD, EUR only)
- Invalid input rejection (wrong format, missing fields, null/undefined)
- Both individual schemas and object schemas

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (re-run on file changes)
npm run test:watch

# Interactive UI
npm run test:ui

# With coverage report
npm run test:coverage
```

### Test Results
- **30 tests passing**
- **2 test files**
- Fast execution (~7ms test time)
- Full TypeScript support
- Mocked external dependencies (Etherscan API)

## Production Considerations

- Exchange rates are currently stored in-memory and reset on server restart
- Consider implementing a database for persistent exchange rate storage
- Add rate limiting to prevent API abuse
- Implement caching for Etherscan API responses
- Implement circuit breaker so that if Etherscan fails, it will fail fast
- Set up monitoring and logging (e.g., AWS CloudWatch, Datadog, Sentry)
- Use environment-specific configurations
