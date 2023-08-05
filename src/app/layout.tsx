import "./globals.css";
import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";

const courierPrime = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "sachat.cloud",
  description: "Hacking, programming, and other stuff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={courierPrime.className}>{children}</body>
    </html>
  );
}
