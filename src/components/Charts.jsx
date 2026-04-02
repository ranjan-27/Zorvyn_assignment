import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#4287f5', '#db2777', '#ca8a04'];

const Charts = () => {
  const { transactions } = useFinance();

  const lineChartData = useMemo(() => {
    // Sort transactions by date
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let runningBalance = 0;
    const dailyBalance = {};

    sorted.forEach(t => {
      const amt = Number(t.amount);
      if (t.type === 'income') {
        runningBalance += amt;
      } else {
        runningBalance -= amt;
      }
      dailyBalance[t.date] = runningBalance;
    });

    return Object.keys(dailyBalance).map(date => ({
      date,
      balance: dailyBalance[date]
    }));
  }, [transactions]);

  const pieChartData = useMemo(() => {
    const expensesByCategory = {};
    
    transactions.forEach(t => {
      if (t.type === 'expense') {
        expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + Number(t.amount);
      }
    });

    return Object.keys(expensesByCategory).map(category => ({
      name: category,
      value: expensesByCategory[category]
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  // Handle empty state
  if (transactions.length === 0) {
    return (
      <div className="dashboard-grid">
        <div className="chart-card"><p>No data available for charts.</p></div>
        <div className="chart-card"><p>No data available for charts.</p></div>
      </div>
    );
  }

  return (
    <div className="dashboard-grid">
      <div className="chart-card">
        <h3>Balance Over Time</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={lineChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
              />
              <Line type="monotone" dataKey="balance" stroke="var(--primary-color)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <h3>Expenses by Category</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
                formatter={(value) => `$${value}`}
              />
              <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--text-color)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
