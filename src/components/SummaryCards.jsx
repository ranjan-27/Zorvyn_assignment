import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

const SummaryCards = () => {
  const { transactions } = useFinance();

  const { income, expense, balance } = useMemo(() => {
    let inc = 0;
    let exp = 0;

    transactions.forEach(t => {
      if (t.type === 'income') {
        inc += Number(t.amount);
      } else if (t.type === 'expense') {
        exp += Number(t.amount);
      }
    });

    return {
      income: inc,
      expense: exp,
      balance: inc - exp
    };
  }, [transactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <div className="card-icon balance">
          <Wallet size={24} />
        </div>
        <div className="card-info">
          <h3>Total Balance</h3>
          <p>{formatCurrency(balance)}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon income">
          <ArrowUpRight size={24} />
        </div>
        <div className="card-info">
          <h3>Total Income</h3>
          <p>{formatCurrency(income)}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon expense">
          <ArrowDownRight size={24} />
        </div>
        <div className="card-info">
          <h3>Total Expenses</h3>
          <p>{formatCurrency(expense)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
