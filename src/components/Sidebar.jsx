import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  BarChart3, 
  Settings, 
  CreditCard, 
  Wallet,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

const Sidebar = () => {
  const { role, setRole } = useFinance();

  return (
    <aside className="sidebar">
      <div className="logo">
        <Wallet size={28} />
        FinanceDash
      </div>

      <div className="role-switcher">
        <label>Current Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <ul className="nav-menu">
        <li className="nav-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </li>
        <li className="nav-item">
          <CreditCard size={20} />
          <span>Transactions</span>
        </li>
        <li className="nav-item">
          <BarChart3 size={20} />
          <span>Analytics</span>
        </li>
      </ul>

      <div style={{ marginTop: 'auto' }}>
        <ul className="nav-menu">
          <li className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </li>
          <li className="nav-item">
            <LogOut size={20} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
