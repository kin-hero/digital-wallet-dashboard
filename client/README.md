# Digital Wallet Dashboard - Frontend (Next.js)

This is the frontend application for the Digital Wallet Dashboard, built with Next.js 16, React 19, and TypeScript.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **HTTP Client:** Native fetch API
- **State Management:** React hooks (useState, useEffect)

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- Backend server running on `http://localhost:3001`

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

## Project Structure

```
client/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles
├── components/            # React components 
├── lib/                   # Utilities and API client 
├── types/                 # TypeScript type definitions 
├── public/                # Static assets
├── .env.production             # Environment variables (production)
├── .env.local             # Environment variables (local)
├── .env.example           # Environment variables template
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── next.config.ts         # Next.js configuration
```

## Architecture

The frontend follows a clean architecture pattern similar to the backend:

- **`app/`** - Next.js routing and page components
- **`components/`** - Reusable React UI components
- **`lib/`** - API client and utility functions (infrastructure layer)
- **`types/`** - Shared TypeScript interfaces

## Planned Features

### SSR (Server-Side Rendering)
- Get exchange rates on initial page load

### CSR (Client-Side Rendering)
- Update exchange rates
- Check wallet age
- Get wallet balance with currency conversion

## TypeScript Configuration

This project uses strict TypeScript settings matching the backend:
- Strict mode enabled
- No unused locals/parameters
- No implicit returns
- No unchecked indexed access
- All safety flags enabled

## API Integration

The frontend will communicate with the backend API at `http://localhost:3001`:

- `GET /api/exchange-rate` - Get current exchange rates
- `PATCH /api/exchange-rate` - Update exchange rate
- `GET /api/wallet/:address/is-old` - Check wallet age
- `GET /api/wallet/:address/balance?currency=USD|EUR` - Get wallet balance
