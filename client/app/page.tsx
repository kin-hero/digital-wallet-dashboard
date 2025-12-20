import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardContent } from "@/components/DashboardContent";
import { ExchangeRateDisplay } from "@/components/ExchangeRateDisplay";
import { ExchangeRateLoading } from "@/components/ExchangeRateLoading";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto flex-1 px-6 py-8">
        <DashboardContent>
          <Suspense fallback={<ExchangeRateLoading />}>
            <ExchangeRateDisplay />
          </Suspense>
        </DashboardContent>
      </main>
      <Footer />
    </div>
  );
}
