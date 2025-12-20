# Digital Wallet Dashboard

A full-stack TypeScript application that provides analytics on Ethereum wallets using the Etherscan API.

## Overview

This monorepo contains a complete Ethereum wallet analytics platform with:
- **Backend API** (Fastify + TypeScript) for wallet data and exchange rates
- **Frontend Dashboard** (Next.js 16 + React 19) for displaying analytics

## Project Structure

```
digital-wallet-dashboard/
├── server/          # Backend API (Fastify)
│   └── README.md   # Server documentation
├── client/          # Frontend (Next.js)
│   └── README.md   # Client documentation
└── package.json     # Workspace configuration
```

## Quick Start

### Prerequisites
- Node.js v18+
- Etherscan API key

### Installation

```bash
# Install all dependencies
npm install

# Configure server environment
cd server
cp .env.example .env
# Edit .env with your Etherscan API key

# Configure client environment
cd ../client
cp .env.example .env.local
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev  # Runs on http://localhost:3001
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev  # Runs on http://localhost:3000
```

## Documentation

📖 **[Server Documentation](./server/README.md)** - API endpoints, architecture, testing

📖 **[Client Documentation](./client/README.md)** - Frontend setup, structure, features

## Tech Stack

**Backend:** Fastify, TypeScript, Zod, Vitest, Etherscan API

**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS

## Features

- ✅ Check if wallet is old (>1 year inactive)
- ✅ Get/update ETH exchange rates (EUR, USD)
- ✅ Get wallet balance in different currencies
- ✅ Dashboard UI

## Architecture

Both server and client follow **clean architecture** principles with strict TypeScript configuration and clear separation of concerns.

See individual READMEs for detailed architecture documentation.
