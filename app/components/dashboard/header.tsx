"use client";
import { BarChart3 } from "lucide-react";

export function Header() {
  return (
    <header className="mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-7 h-7 text-white" />
        </div>
        <div>
          {/* We've updated the h1 tag with the new font and tighter letter spacing */}
          <h1 className="text-3xl font-bold font-heading tracking-tight bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Portfolio Tracker Pro
          </h1>
          <p className="text-muted-foreground text-sm">
            Real-time portfolio analytics & insights
          </p>
        </div>
      </div>
    </header>
  );
}