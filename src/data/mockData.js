export const categories = [
  'Food & Dining',
  'Housing',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Salary',
  'Investments',
  'Other',
];

const defaultTransactions = [
  { id: '1', date: '2023-10-01', amount: 5000, category: 'Salary', type: 'income' },
  { id: '2', date: '2023-10-02', amount: 1200, category: 'Housing', type: 'expense' },
  { id: '3', date: '2023-10-05', amount: 150, category: 'Utilities', type: 'expense' },
  { id: '4', date: '2023-10-10', amount: 300, category: 'Food & Dining', type: 'expense' },
  { id: '5', date: '2023-10-15', amount: 200, category: 'Transportation', type: 'expense' },
  { id: '6', date: '2023-10-20', amount: 100, category: 'Entertainment', type: 'expense' },
  { id: '7', date: '2023-11-01', amount: 5000, category: 'Salary', type: 'income' },
  { id: '8', date: '2023-11-02', amount: 1200, category: 'Housing', type: 'expense' },
  { id: '9', date: '2023-11-08', amount: 400, category: 'Shopping', type: 'expense' },
  { id: '10', date: '2023-11-12', amount: 180, category: 'Utilities', type: 'expense' },
];

export const getInitialTransactions = () => {
  const saved = localStorage.getItem('finance_transactions');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse transactions from local storage', e);
    }
  }
  return defaultTransactions;
};

export const getInitialRole = () => {
  const saved = localStorage.getItem('finance_role');
  return saved || 'Viewer';
};
