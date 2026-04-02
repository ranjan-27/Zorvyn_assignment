import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import './styles/Dashboard.css';
import './styles/Table.css';
import './styles/Form.css';

function App() {
  return (
    <FinanceProvider>
      <div className="dashboard-container">
        <Sidebar />
        <DashboardPage />
      </div>
    </FinanceProvider>
  );
}

export default App;
