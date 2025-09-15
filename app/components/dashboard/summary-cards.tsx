import { Holding } from "@/types";
import { MetricCard } from "./metric-card";
import { formatCurrency } from "@/lib/formatters";
import { DollarSign, TrendingUp, TrendingDown, Package } from "lucide-react";

interface PortfolioMetrics {
  totalValue: number;
  totalGainPercent: number;
  topPerformer?: Holding;
  worstPerformer?: Holding;
  uniqueSymbols: number;
}

export function SummaryCards({ metrics }: { metrics: PortfolioMetrics }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <MetricCard
        title="Total Value"
        value={formatCurrency(metrics.totalValue)}
        icon={DollarSign}
        change={metrics.totalGainPercent}
        changeType={metrics.totalGainPercent >= 0 ? "profit" : "loss"}
      />
      <MetricCard
        title="Top Performer"
        value={metrics.topPerformer?.symbol || "N/A"}
        icon={TrendingUp}
        change={metrics.topPerformer?.unrealizedGainPercent}
        changeType="profit"
      />
      <MetricCard
        title="Worst Performer"
        value={metrics.worstPerformer?.symbol || "N/A"}
        icon={TrendingDown}
        change={metrics.worstPerformer?.unrealizedGainPercent}
        changeType="loss"
      />
      <MetricCard 
        title="Unique Holdings" 
        icon={Package}
        value={metrics.uniqueSymbols} 
      />
    </div>
  );
}