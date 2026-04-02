import React from 'react';
import Header from '../components/Header';
import SummaryCards from '../components/SummaryCards';
import Charts from '../components/Charts';
import Insights from '../components/Insights';
import TransactionTable from '../components/TransactionTable';
import TransactionForm from '../components/TransactionForm';

const DashboardPage = () => {
  return (
    <div className="main-content">
      <Header />
      
      <SummaryCards />
      
      <Charts />
      
      <Insights />
      
      <div style={{ marginTop: '32px' }}>
        <TransactionTable />
      </div>

      <TransactionForm />
    </div>
  );
};

export default DashboardPage;
