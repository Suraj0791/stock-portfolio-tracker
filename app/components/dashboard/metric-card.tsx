import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  changeType?: "profit" | "loss";
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  change,
  changeType,
}: MetricCardProps) {
  const displayValue =
    typeof value === "number" ? formatCurrency(value) : value;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-heading">{displayValue}</div>
        {change !== undefined && changeType && (
          <p
            className={`text-xs ${
              changeType === "profit" ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {formatPercent(change)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}