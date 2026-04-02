import React, { createContext, useState, useEffect, useContext } from 'react';
import { getInitialTransactions, getInitialRole } from '../data/mockData';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(getInitialTransactions());
  const [role, setRole] = useState(getInitialRole());
  
  // Filters
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'amount'

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_role', role);
  }, [role]);

  // Actions
  const addTransaction = (newTx) => {
    setTransactions(prev => [...prev, { ...newTx, id: Date.now().toString() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    role,
    setRole,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
