import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Calendar } from 'lucide-react';
import './ExtraExpense.css';

const ExtraExpense = () => {
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Tea for staff', amount: 500, branch: 1, date: '2026-03-01' },
    { id: 2, description: 'Pens and stationary', amount: 300, branch: 2, date: '2026-03-02' },
    { id: 3, description: 'Cleaning supplies', amount: 700, branch: 1, date: '2026-03-03' },
    { id: 4, description: 'Printer ink', amount: 1200, branch: 1, date: '2026-04-04' },
    { id: 5, description: 'Office snacks', amount: 450, branch: 2, date: '2026-04-05' },
    { id: 6, description: 'Water bottles', amount: 300, branch: 1, date: '2026-05-06' },
    { id: 7, description: 'Broom and dustpan', amount: 250, branch: 2, date: '2026-05-07' },
    { id: 8, description: 'Notebooks', amount: 600, branch: 1, date: '2026-06-08' },
    { id: 9, description: 'Printer paper', amount: 800, branch: 2, date: '2026-06-10' },
    { id: 10, description: 'Coffee supplies', amount: 350, branch: 1, date: '2026-06-12' },
    { id: 11, description: 'Desk lamp', amount: 450, branch: 2, date: '2026-07-01' },
    { id: 12, description: 'Extension board', amount: 200, branch: 1, date: '2026-07-03' },
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    branch: 1,
    date: '',
  });

  // ===== GET UNIQUE MONTHS =====
  const getUniqueMonths = () => {
    const months = new Set();
    expenses.forEach(exp => {
      const month = exp.date.substring(0, 7); // YYYY-MM
      months.add(month);
    });
    return Array.from(months).sort();
  };

  // ===== GET MONTH NAME =====
  const getMonthName = (monthStr) => {
    if (monthStr === 'all') return 'All Months';
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // ===== FILTER LOGIC =====
  const filtered = expenses.filter(e => {
    // Search filter
    const searchMatch = e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.amount.toString().includes(search);
    
    // Branch filter
    let branchMatch = true;
    if (branchFilter === '1') branchMatch = e.branch === 1;
    else if (branchFilter === '2') branchMatch = e.branch === 2;
    
    // Month filter
    let monthMatch = true;
    if (monthFilter !== 'all') {
      const expMonth = e.date.substring(0, 7);
      monthMatch = expMonth === monthFilter;
    }
    
    return searchMatch && branchMatch && monthMatch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  // ===== GET CURRENT DATE =====
  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };

  // ===== ADD EXPENSE =====
  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount) {
      alert('Please fill all required fields');
      return;
    }

    const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
    const date = newExpense.date || getCurrentDate();

    setExpenses([...expenses, {
      id: newId,
      description: newExpense.description,
      amount: parseInt(newExpense.amount),
      branch: parseInt(newExpense.branch),
      date: date,
    }]);

    setNewExpense({ description: '', amount: '', branch: 1, date: '' });
    setShowModal(false);
  };

  // ===== EDIT EXPENSE =====
  const handleEditExpense = () => {
    if (!newExpense.description || !newExpense.amount) {
      alert('Please fill all required fields');
      return;
    }

    setExpenses(expenses.map(e => {
      if (e.id === editingExpense.id) {
        return {
          ...e,
          description: newExpense.description,
          amount: parseInt(newExpense.amount),
          branch: parseInt(newExpense.branch),
          date: newExpense.date || e.date,
        };
      }
      return e;
    }));

    setNewExpense({ description: '', amount: '', branch: 1, date: '' });
    setShowModal(false);
    setEditingExpense(null);
  };

  // ===== DELETE EXPENSE =====
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  // ===== OPEN MODALS =====
  const openAddModal = () => {
    setEditingExpense(null);
    setNewExpense({ description: '', amount: '', branch: 1, date: getCurrentDate() });
    setShowModal(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setNewExpense({
      description: expense.description,
      amount: expense.amount.toString(),
      branch: expense.branch,
      date: expense.date,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingExpense(null);
    setNewExpense({ description: '', amount: '', branch: 1, date: '' });
  };

  // ===== FORMAT DATE =====
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // ===== GET BRANCH TOTAL =====
  const getBranchTotal = (branch) => {
    return expenses
      .filter(e => e.branch === branch)
      .reduce((sum, e) => sum + e.amount, 0);
  };

  // ===== GET MONTH TOTAL =====
  const getMonthTotal = (month) => {
    return expenses
      .filter(e => {
        const expMonth = e.date.substring(0, 7);
        return expMonth === month;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  };

  const uniqueMonths = getUniqueMonths();

  return (
    <div className="extra-expense-container">
      <div className="extra-header">
        <h3>Extra Expenses</h3>
        <button className="btn-accent" onClick={openAddModal}>
          <Plus size={18} />
          Add Expense
        </button>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="extra-controls">
        <div className="extra-search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="filter-group">
          <span className="filter-label">Branch:</span>
          <div className="branch-filters">
            <button 
              className={`filter-btn ${branchFilter === 'all' ? 'active' : ''}`}
              onClick={() => { setBranchFilter('all'); setCurrentPage(1); }}
            >
              All
            </button>
            <button 
              className={`filter-btn branch-1 ${branchFilter === '1' ? 'active' : ''}`}
              onClick={() => { setBranchFilter('1'); setCurrentPage(1); }}
            >
              Branch 1
            </button>
            <button 
              className={`filter-btn branch-2 ${branchFilter === '2' ? 'active' : ''}`}
              onClick={() => { setBranchFilter('2'); setCurrentPage(1); }}
            >
              Branch 2
            </button>
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Month:</span>
          <div className="month-filters">
            <button 
              className={`filter-btn month-btn ${monthFilter === 'all' ? 'active' : ''}`}
              onClick={() => { setMonthFilter('all'); setCurrentPage(1); }}
            >
              All
            </button>
            {uniqueMonths.map(month => (
              <button 
                key={month}
                className={`filter-btn month-btn ${monthFilter === month ? 'active' : ''}`}
                onClick={() => { setMonthFilter(month); setCurrentPage(1); }}
              >
                {getMonthName(month)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== TOTALS ===== */}
      <div className="totals-container">
        <div className="total-box total-all">
          <span>Total All Branches</span>
          <strong>₹{expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</strong>
        </div>
        <div className="total-box total-branch-1">
          <span>🏪 Branch 1</span>
          <strong>₹{getBranchTotal(1).toLocaleString()}</strong>
        </div>
        <div className="total-box total-branch-2">
          <span>🏪 Branch 2</span>
          <strong>₹{getBranchTotal(2).toLocaleString()}</strong>
        </div>
      </div>

      {/* ===== MONTHLY TOTALS ===== */}
      <div className="monthly-totals">
        {uniqueMonths.map(month => (
          <div key={month} className="month-total-box">
            <span>{getMonthName(month)}</span>
            <strong>₹{getMonthTotal(month).toLocaleString()}</strong>
          </div>
        ))}
      </div>

      <div className="extra-table-wrap">
        <table className="extra-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Branch</th>
              <th>Amount (₹)</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No expenses found</td>
              </tr>
            ) : (
              currentItems.map((exp, index) => (
                <tr key={exp.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="font-medium">{exp.description}</td>
                  <td><span className={`branch-badge branch-${exp.branch}`}>Branch {exp.branch}</span></td>
                  <td>₹{exp.amount.toLocaleString()}</td>
                  <td>{formatDate(exp.date)}</td>
                  <td>
                    <div className="action-group">
                      <button 
                        className="btn-edit" 
                        onClick={() => openEditModal(exp)}
                        title="Edit"
                      >
                        <Edit size={15} />
                      </button>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDelete(exp.id)}
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages || 1}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      {/* ===== ADD/EDIT MODAL ===== */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingExpense ? 'Edit Extra Expense' : 'Add Extra Expense'}</h3>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Description *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter expense description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Amount (₹) *</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Enter amount"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Branch *</label>
                  <select
                    className="form-input"
                    value={newExpense.branch}
                    onChange={(e) => setNewExpense({ ...newExpense, branch: parseInt(e.target.value) })}
                  >
                    <option value={1}>Branch 1</option>
                    <option value={2}>Branch 2</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                />
                <small className="field-hint">Leave empty to use today's date</small>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="btn-save" onClick={editingExpense ? handleEditExpense : handleAddExpense}>
                {editingExpense ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtraExpense;