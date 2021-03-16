import React, { useMemo } from 'react';

import styles from './styles.module.scss'

import data from '../data.json';
import { AccountMetrics } from '../model/classes/AccountMetrics';
/**
 * Account Function to calculate account metrics
 * Reads data from a json file and calculates the metrics and display the result
 */

export const Account = () => {
  const accountData = data.data;
  
  const accountMetrics = useMemo(() => {
    const ac: AccountMetrics = new AccountMetrics();
    let profit = 0;
    let assets = 0;
    let liabilities = 0;
    accountData.forEach(data => {

      // Calculating Revenue
      if( data.account_category === 'revenue' ) {
        ac.metric.revenue += data.total_value;
      }

      // Calculating Expenses
      if( data.account_category === 'expense' ) {
        ac.metric.expenses += data.total_value;
      }

      // Calculating the total profit which will be used to calculate gross profit
      if( data.account_type === 'sales' || data.value_type === 'debit' ) {
        profit = profit + data.total_value;
      }

      // Calculating the total assets which will be used to calculate capital ratio
      if( data.account_category === 'assets' && ['current', 'bank', 'current_accounts_receivable'].includes(data.account_type)) {
        if (data.value_type === 'debit') {
          assets += data.total_value;
        } else if(data.value_type === 'credit') {
          assets -= data.total_value;
        }
      }

      // Calculating the total liabilities which will be used to calculate capital ratio
      if( data.account_category === 'liability' && ['current', 'current_accounts_payable'].includes(data.account_type)) {
        if (data.value_type === 'debit') {
          liabilities -= data.total_value;
        } else if(data.value_type === 'credit') {
          liabilities += data.total_value;
        }
      }
    });

    // Gross Profit Margin 
    ac.metric.grossProfit = profit / ac.metric.revenue * 100;

    // Net Profit Margin
    ac.metric.netProfit = (ac.metric.revenue - ac.metric.expenses) / ac.metric.revenue * 100;

    // Working Capital Ratio
    ac.metric.capitalRatio = assets / liabilities * 100;
    
    return ac;
  }, [accountData])

  return (
    <div className={styles.accountContainer}>
      {accountMetrics && 
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.columnName}>Revenue</div>
            <div className={styles.columnValue}>{accountMetrics.formatCurrency(accountMetrics.metric.revenue)}</div>
          </div> 
          <div className={styles.row}>
            <div className={styles.columnName}>Expenses</div>
            <div className={styles.columnValue}>{accountMetrics.formatCurrency(accountMetrics.metric.expenses)}</div>
          </div> 
          <div className={styles.row}>
            <div className={styles.columnName}>Gross Profit Margin</div>
            <div className={styles.columnValue}>{accountMetrics.formatPercentage(accountMetrics.metric.grossProfit)}</div>
          </div> 
          <div className={styles.row}>
            <div className={styles.columnName}>Net Profit Margin</div>
            <div className={styles.columnValue}>{accountMetrics.formatPercentage(accountMetrics.metric.netProfit)}</div>
          </div> 
          <div className={styles.row}>
            <div className={styles.columnName}>Working Capital Ratio</div>
            <div className={styles.columnValue}>{accountMetrics.formatPercentage(accountMetrics.metric.capitalRatio)}</div>
          </div> 
        </div>
      }
    </div>
  );
};
