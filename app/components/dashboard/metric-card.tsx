import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { formatCurrency, formatPercent } from "@/app/lib/formatters";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'profit' | 'loss';
}

export function MetricCard({ title, value, change, changeType }: MetricCardProps) {
  const displayValue = typeof value === 'number' ? formatCurrency(value) : value;

  return (
    <Card className="bg-card/60 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{displayValue}</div>
        {change !== undefined && changeType && (
          <p className={`text-xs ${changeType === 'profit' ? 'text-green-500' : 'text-red-500'}`}>
            {formatPercent(change)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}