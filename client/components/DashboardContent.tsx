"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExchangeRateUpdateForm } from "./ExchangeRateUpdateForm";
import { WalletChecker } from "./WalletChecker";

interface DashboardContentProps {
  children: React.ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUpdate = () => {
    // Refresh the page to re-fetch the exchange rates
    router.refresh();
    // Increment key to trigger WalletChecker re-fetch
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <ExchangeRateUpdateForm onUpdate={handleUpdate} />
      {children}
      <WalletChecker refreshKey={refreshKey} />
    </div>
  );
}
