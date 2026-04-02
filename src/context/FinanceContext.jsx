import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { getInitialTransactions, getInitialRole } from '../data/mockData';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {

  // ✅ Load from localStorage first
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem('finance_transactions');
      return stored ? JSON.parse(stored) : getInitialTransactions();
    } catch (err) {
      console.error('Error loading transactions:', err);
      return getInitialTransactions();
    }
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('finance_role') || getInitialRole();
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filters
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // ✅ Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_role', role);
  }, [role]);

  // ✅ Actions
  const addTransaction = (newTx) => {
    setTransactions(prev => [
      ...prev,
      { ...newTx, id: crypto.randomUUID() } // ✅ better ID
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  // ✅ Memoize value (performance optimization)
  const value = useMemo(() => ({
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
    setSortBy,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  }), [
    transactions,
    role,
    filterType,
    searchQuery,
    sortBy,
    isMobileMenuOpen
  ]);

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};