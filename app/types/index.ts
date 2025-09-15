export interface Trade {
  symbol: string;
  shares: number;
  price: number;
  date: string;
}

export interface Holding {
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  currentValue: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  sector: string;
}