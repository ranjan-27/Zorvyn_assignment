import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, Plus } from 'lucide-react';
import { categories } from '../data/mockData';

const TransactionForm = () => {
  const { addTransaction, role } = useFinance();
  const [isOpen, setIsOpen] = useState(false);
  
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [type, setType] = useState('expense');

  if (role !== 'Admin') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) return;
    
    addTransaction({
      date,
      amount: Number(amount),
      category,
      type
    });

    setIsOpen(false);
    setAmount('');
  };

  return (
    <>
      <button className="fab" onClick={() => setIsOpen(true)} title="Add Transaction">
        <Plus size={24} />
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="form-container" onClick={e => e.stopPropagation()}>
            <div className="form-header">
              <h2>Add New Transaction</h2>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Amount ($)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                  required 
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select 
                  className="form-control"
                  value={type}
                  onChange={e => setType(e.target.value)}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select 
                  className="form-control"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionForm;
