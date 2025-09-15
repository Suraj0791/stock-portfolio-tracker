"use client";
import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import { MOCK_CURRENT_PRICES, MOCK_SECTORS } from './data/mock-data';
import { Trade, Holding } from './types';
import { Header } from './components/dashboard/header';
import { FileUpload } from './components/dashboard/file-upload';
import { SummaryCards } from './components/dashboard/summary-cards';
import { HoldingsTable } from './components/dashboard/holdings-table';
import { PortfolioCharts } from './components/dashboard/portfolio-charts';
import { Card, CardContent } from './components/ui/card';

export default function DashboardPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [holdings, setHoldings] = useState<Record<string, Holding>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    const savedTrades = localStorage.getItem('portfolio_trades');
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  useEffect(() => {
    if (trades.length > 0) {
      processHoldings(trades);
      localStorage.setItem('portfolio_trades', JSON.stringify(trades));
    } else {
      setHoldings({});
    }
  }, [trades]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setUploadError('');

    Papa.parse<Omit<Trade, 'symbol'>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const validTrades = results.data.map(row => ({
          ...row,
          symbol: (row as any).symbol?.toUpperCase(),
          shares: parseFloat(String(row.shares)),
          price: parseFloat(String(row.price)),
        })).filter(t => t.symbol && !isNaN(t.shares) && !isNaN(t.price) && t.date);

        if (validTrades.length > 0) {
          setTrades(validTrades);
        } else {
          setUploadError('No valid trades found. Check columns: symbol, shares, price, date.');
        }
        setIsLoading(false);
      },
    });
  };

  const processHoldings = (tradesList: Trade[]) => {
    const holdingsMap = tradesList.reduce((acc, trade) => {
        const { symbol, shares, price } = trade;
        if (!acc[symbol]) {
            acc[symbol] = { shares: 0, totalCost: 0 };
        }
        acc[symbol].shares += shares;
        if (shares > 0) { // Only add to cost for buy trades
            acc[symbol].totalCost += shares * price;
        }
        return acc;
    }, {} as Record<string, { shares: number, totalCost: number }>);

    const newHoldings: Record<string, Holding> = {};
    Object.keys(holdingsMap).forEach(symbol => {
      const h = holdingsMap[symbol];
      if (h.shares > 0.001) { // Use a small threshold to handle float precision
        const avgCost = h.totalCost / h.shares;
        const currentPrice = MOCK_CURRENT_PRICES[symbol] || 0;
        const currentValue = h.shares * currentPrice;
        const costBasis = h.shares * avgCost;
        const unrealizedGain = currentValue - costBasis;
        const unrealizedGainPercent = costBasis > 0 ? (unrealizedGain / costBasis) * 100 : 0;
        
        newHoldings[symbol] = {
          symbol,
          shares: h.shares,
          avgCost,
          currentPrice,
          currentValue,
          unrealizedGain,
          unrealizedGainPercent,
          sector: MOCK_SECTORS[symbol] || 'Other',
        };
      }
    });
    setHoldings(newHoldings);
  };

  const onClearData = () => {
    setTrades([]);
    localStorage.removeItem('portfolio_trades');
  };

  const holdingsArray = useMemo(() => Object.values(holdings), [holdings]);

  const portfolioMetrics = useMemo(() => {
    const totalValue = holdingsArray.reduce((sum, h) => sum + h.currentValue, 0);
    const totalCost = holdingsArray.reduce((sum, h) => sum + h.avgCost * h.shares, 0);
    const totalGain = totalValue - totalCost;
    const totalGainPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;
    
    const sortedByGain = [...holdingsArray].sort((a,b) => b.unrealizedGainPercent - a.unrealizedGainPercent);

    return {
      totalValue,
      totalGainPercent,
      topPerformer: sortedByGain[0],
      worstPerformer: sortedByGain[sortedByGain.length - 1],
      uniqueSymbols: holdingsArray.length,
    };
  }, [holdingsArray]);

  const chartData = useMemo(() => {
    const pieData = holdingsArray.map(h => ({
      name: h.symbol,
      value: h.currentValue,
    })).sort((a,b) => b.value - a.value).slice(0, 5); // Top 5 for cleaner chart
    return { pieData };
  }, [holdingsArray]);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <Header />
      <FileUpload
        isLoading={isLoading}
        hasData={trades.length > 0}
        uploadError={uploadError}
        handleFileUpload={handleFileUpload}
        onClearData={onClearData}
      />
      {trades.length > 0 ? (
        <>
          <SummaryCards metrics={portfolioMetrics} />
          <PortfolioCharts pieData={chartData.pieData} />
          <Card className="bg-card/60 backdrop-blur-xl">
            <CardContent className="pt-6">
              <HoldingsTable holdings={holdingsArray} />
            </CardContent>
          </Card>
        </>
      ) : (
        !isLoading && (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">No Portfolio Data</h2>
            <p className="text-muted-foreground">Upload a CSV file to get started.</p>
          </div>
        )
      )}
    </main>
  );
}