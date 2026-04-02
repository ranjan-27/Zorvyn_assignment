import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { TrendingUp, AlertCircle, Award } from 'lucide-react';

const Insights = () => {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    if (transactions.length === 0) return [];

    const result = [];
    
    // 1. Highest spending category
    const expensesByCategory = {};
    transactions.forEach(t => {
      if (t.type === 'expense') {
        expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + Number(t.amount);
      }
    });

    const highestCategory = Object.keys(expensesByCategory).reduce((a, b) => 
      expensesByCategory[a] > expensesByCategory[b] ? a : b, 
      Object.keys(expensesByCategory)[0]
    );

    if (highestCategory) {
      result.push({
        id: 1,
        title: 'Highest Spending Category',
        text: `You spent most on ${highestCategory} ($${expensesByCategory[highestCategory]}). Consider reviewing your budget here.`,
        icon: <TrendingUp size={20} />
      });
    }

    // 2. Simple observation on Income vs Expense for the current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    let monthIncome = 0;
    let monthExpense = 0;

    transactions.forEach(t => {
      const tDate = new Date(t.date);
      if (tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear) {
        if (t.type === 'income') monthIncome += Number(t.amount);
        if (t.type === 'expense') monthExpense += Number(t.amount);
      }
    });

    if (monthIncome > 0 || monthExpense > 0) {
      const isPositive = monthIncome >= monthExpense;
      const pctSaved = monthIncome > 0 ? (((monthIncome - monthExpense) / monthIncome) * 100).toFixed(0) : 0;
      
      result.push({
        id: 2,
        title: 'Monthly Summary',
        text: isPositive 
          ? `You saved ${pctSaved}% of your income this month. Great job!` 
          : `Your expenses exceeded your income by $${monthExpense - monthIncome} this month.`,
        icon: isPositive ? <Award size={20} /> : <AlertCircle size={20} />
      });
    }

    return result;
  }, [transactions]);

  if (insights.length === 0) return null;

  return (
    <div className="insights-card">
      <h3>Quick Insights</h3>
      {insights.map(item => (
        <div key={item.id} className="insight-item">
          <div className="insight-icon">
            {item.icon}
          </div>
          <div className="insight-content">
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Insights;
