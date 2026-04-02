import React, { useEffect, useState } from 'react';
import { Moon, Sun, Bell, Search } from 'lucide-react';

const Header = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('finance_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('finance_theme', newTheme);
  };

  return (
    <header className="header">
      <div>
        <h1>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '14px' }}>
          Welcome back! Here's your financial summary.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <div style={{ position: 'relative' }}>
          <button className="theme-toggle">
            <Bell size={20} />
          </button>
          <span style={{ 
            position: 'absolute', top: '-4px', right: '-4px', 
            background: '#ef4444', width: '10px', height: '10px', borderRadius: '50%' 
          }}></span>
        </div>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          AD
        </div>
      </div>
    </header>
  );
};

export default Header;
