"use client";

import { useRouter } from "next/navigation";
import { ExchangeRateUpdateForm } from "./ExchangeRateUpdateForm";
import { WalletAgeChecker } from "./WalletAgeChecker";

interface DashboardContentProps {
  children: React.ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  const router = useRouter();

  const handleUpdate = () => {
    // Refresh the page to re-fetch the exchange rates
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <ExchangeRateUpdateForm onUpdate={handleUpdate} />
      {children}
      <WalletAgeChecker />
    </div>
  );
}
