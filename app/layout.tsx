import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; // Import Poppins
import "./globals.css";
import { cn } from "@/lib/utils";

// Configure the Inter font for the body text
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', // Assign a CSS variable
});

// Configure the Poppins font for headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ['600', '700'], // Load semi-bold and bold weights
  variable: '--font-poppins', // Assign a CSS variable
});

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          inter.variable, // Apply the Inter font variable
          poppins.variable // Apply the Poppins font variable
        )}
      >
        {children}
      </body>
    </html>
  );
}