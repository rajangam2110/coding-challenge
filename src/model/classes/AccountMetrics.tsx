/**
 * Modal for Account Metric
 */
type AccountMetric = {
  revenue: number;
  expenses: number;
  grossProfit: number;
  netProfit: number;
  capitalRatio: number;
};

/**
 * Class for calculate account metrics
 */

export class AccountMetrics{
  /**
   * Initialize with default value for metrics
   * @type {AccountMetric}
   * @memberof AccountMetrics
   */
  metric: AccountMetric = {
    revenue: 0,
    expenses: 0,
    grossProfit: 0,
    netProfit: 0,
    capitalRatio: 0,
  };

  /**
   * format currency
   * @param value 
   * @returns formatted string
   */
  formatCurrency = (value: number) => {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    const formattedStr = formatter.format(value);
    return formattedStr;
  }

  /**
   * format percentage
   * @param value 
   * @returns percentage value with single decimal value
   */
  formatPercentage = (value: number) => {
    const formattedStr = Number(value.toFixed(1)) + '%';
    return formattedStr;
  }
};