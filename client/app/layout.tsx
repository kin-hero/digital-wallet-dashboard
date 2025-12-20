import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Wallet Dashboard",
  description: "Ethereum wallet analytics and exchange rate tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
