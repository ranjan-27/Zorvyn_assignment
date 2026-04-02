import React from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import './styles/Dashboard.css';
import './styles/Table.css';
import './styles/Form.css';

const Layout = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useFinance();
  return (
    <div className="dashboard-container">
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <Sidebar />
      <DashboardPage />
    </div>
  );
};

function App() {
  return (
    <FinanceProvider>
      <Layout />
    </FinanceProvider>
  );
}

export default App;
