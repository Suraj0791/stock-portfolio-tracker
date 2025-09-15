// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Tracker Pro",
  description: "Real-time portfolio analytics & insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add the "dark" class here
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", inter.className)}
      >
        {/* The animated blobs are removed */}
        {children}
      </body>
    </html>
  );
}