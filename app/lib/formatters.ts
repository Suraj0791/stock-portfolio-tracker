export const formatCurrency = (value: number | undefined | null): string => {
  if (value === null || typeof value === 'undefined') {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatPercent = (value: number | undefined | null): string => {
  if (value === null || typeof value === 'undefined' || isNaN(value)) {
    return '0.00%';
  }
  return `${value.toFixed(2)}%`;
};