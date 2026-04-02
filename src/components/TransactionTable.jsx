import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Search, Trash2, ArrowUpDown, Download } from 'lucide-react';

const TransactionTable = () => {
  const { 
    transactions, deleteTransaction, role, 
    filterType, setFilterType, 
    searchQuery, setSearchQuery,
    sortBy, setSortBy
  } = useFinance();

  const filteredAndSorted = useMemo(() => {
    let result = [...transactions];

    // Filter by type
    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }

    // Filter by search query (category or date)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.category.toLowerCase().includes(q) || 
        t.date.includes(q) ||
        t.amount.toString().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      }
      return 0;
    });

    return result;
  }, [transactions, filterType, searchQuery, sortBy]);

  const handleSortToggle = (column) => {
    if (sortBy === column) {
      // Simple toggle logic reversed not implemented fully for brevity, just set column
      setSortBy(column);
    } else {
      setSortBy(column);
    }
  };

  const exportCSV = () => {
    const headers = ['Date,Category,Type,Amount'];
    const rows = filteredAndSorted.map(tx => 
      `${tx.date},"${tx.category}",${tx.type},${tx.amount}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h3 className="table-title">Recent Transactions</h3>
        <div className="table-actions">
          <button 
            onClick={exportCSV}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '6px', 
              padding: '8px 16px', borderRadius: '6px', cursor: 'pointer',
              border: '1px solid var(--primary-color)', background: 'var(--primary-color-light)', 
              color: 'var(--primary-color)', fontWeight: '600'
            }}
          >
            <Download size={16} /> Export
          </button>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 10, top: 10, color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search..."
              className="search-input"
              style={{ paddingLeft: 34 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSortToggle('date')}>
                Date {sortBy === 'date' && <ArrowUpDown size={12} style={{ display: 'inline', marginLeft: 4 }}/>}
              </th>
              <th>Category</th>
              <th>Type</th>
              <th onClick={() => handleSortToggle('amount')}>
                Amount {sortBy === 'amount' && <ArrowUpDown size={12} style={{ display: 'inline', marginLeft: 4 }}/>}
              </th>
              {role === 'Admin' && <th className="action-cell">Admin</th>}
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td>{tx.category}</td>
                  <td>
                    <span className={`badge ${tx.type}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`amount ${tx.type}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount}
                  </td>
                  {role === 'Admin' && (
                    <td className="action-cell">
                      <button 
                        className="delete-btn"
                        onClick={() => deleteTransaction(tx.id)}
                        title="Delete Transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'Admin' ? 5 : 4}>
                  <div className="empty-state">No transactions found.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
