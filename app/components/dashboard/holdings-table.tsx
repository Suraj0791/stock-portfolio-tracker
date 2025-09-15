"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Holding } from "@/types";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function HoldingsTable({ holdings }: { holdings: Holding[] }) {
  if (holdings.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No holdings found. Try adjusting your filters.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead className="text-right">Shares</TableHead>
          <TableHead className="text-right">Avg Cost</TableHead>
          <TableHead className="text-right">Current Price</TableHead>
          <TableHead className="text-right">Market Value</TableHead>
          <TableHead className="text-right">Gain/Loss</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holdings.map((h) => (
          <TableRow key={h.symbol}>
            <TableCell className="font-medium">{h.symbol}</TableCell>
            <TableCell className="text-right">{h.shares.toFixed(2)}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(h.avgCost)}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(h.currentPrice)}
            </TableCell>
            <TableCell className="text-right font-semibold">
              {formatCurrency(h.currentValue)}
            </TableCell>
            <TableCell
              className={cn(
                "text-right font-medium",
                h.unrealizedGain >= 0 ? "text-green-500" : "text-destructive"
              )}
            >
              {formatCurrency(h.unrealizedGain)}
              <div className="text-xs text-muted-foreground">
                {formatPercent(h.unrealizedGainPercent)}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
