import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, DollarSign, X, CheckCircle, Clock } from 'lucide-react';
import './FixedExpense.css';

const FixedExpense = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [expenses, setExpenses] = useState([
    { 
      id: 1, 
      name: 'Rent', 
      amount: 50000, 
      branch: 1, 
      dueDate: '1st of every month',
      paid: true,
      lastPaid: '2026-06-01',
      history: [
        { date: '2026-06-01 10:00 AM', amount: 50000, status: 'Paid' },
        { date: '2026-05-01 09:30 AM', amount: 50000, status: 'Paid' },
        { date: '2026-04-01 11:00 AM', amount: 50000, status: 'Paid' },
      ]
    },
    { 
      id: 2, 
      name: 'Electricity Bill', 
      amount: 15000, 
      branch: 2, 
      dueDate: '15th of every month',
      paid: false,
      lastPaid: '2026-05-15',
      history: [
        { date: '2026-05-15 02:30 PM', amount: 15000, status: 'Paid' },
        { date: '2026-04-15 10:15 AM', amount: 15000, status: 'Paid' },
      ]
    },
    { 
      id: 3, 
      name: 'Internet', 
      amount: 5000, 
      branch: 1, 
      dueDate: '20th of every month',
      paid: true,
      lastPaid: '2026-06-20',
      history: [
        { date: '2026-06-20 09:00 AM', amount: 5000, status: 'Paid' },
        { date: '2026-05-20 08:45 AM', amount: 5000, status: 'Paid' },
        { date: '2026-04-20 10:30 AM', amount: 5000, status: 'Paid' },
      ]
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    branch: 1,
    dueDate: '',
  });

  const [payAmount, setPayAmount] = useState('');

  const filtered = expenses.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  // ===== GET CURRENT DATE TIME =====
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  };

  // ===== ADD EXPENSE =====
  const handleAddExpense = () => {
    if (!newExpense.name || !newExpense.amount || !newExpense.dueDate) {
      alert('Please fill all fields');
      return;
    }

    const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
    setExpenses([...expenses, {
      id: newId,
      name: newExpense.name,
      amount: parseInt(newExpense.amount),
      branch: parseInt(newExpense.branch),
      dueDate: newExpense.dueDate,
      paid: false,
      lastPaid: 'Never',
      history: []
    }]);

    setNewExpense({ name: '', amount: '', branch: 1, dueDate: '' });
    setShowModal(false);
  };

  // ===== EDIT EXPENSE =====
  const handleEditExpense = () => {
    if (!newExpense.name || !newExpense.amount || !newExpense.dueDate) {
      alert('Please fill all fields');
      return;
    }

    setExpenses(expenses.map(e => {
      if (e.id === editingExpense.id) {
        return {
          ...e,
          name: newExpense.name,
          amount: parseInt(newExpense.amount),
          branch: parseInt(newExpense.branch),
          dueDate: newExpense.dueDate,
        };
      }
      return e;
    }));

    setNewExpense({ name: '', amount: '', branch: 1, dueDate: '' });
    setShowModal(false);
    setEditingExpense(null);
  };

  // ===== PAY EXPENSE =====
  const handlePayExpense = () => {
    if (!payAmount || parseInt(payAmount) <= 0) {
      alert('Please enter valid amount');
      return;
    }

    const dateTime = getCurrentDateTime();
    const amount = parseInt(payAmount);

    setExpenses(expenses.map(e => {
      if (e.id === selectedExpense.id) {
        const newHistory = [
          { date: dateTime, amount: amount, status: 'Paid' },
          ...e.history
        ];
        return {
          ...e,
          paid: true,
          lastPaid: dateTime,
          history: newHistory,
          amount: amount // Update amount if changed
        };
      }
      return e;
    }));

    setPayAmount('');
    setShowPayModal(false);
    setSelectedExpense(null);
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
    setNewExpense({ name: '', amount: '', branch: 1, dueDate: '' });
    setShowModal(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setNewExpense({
      name: expense.name,
      amount: expense.amount.toString(),
      branch: expense.branch,
      dueDate: expense.dueDate,
    });
    setShowModal(true);
  };

  const openPayModal = (expense) => {
    setSelectedExpense(expense);
    setPayAmount(expense.amount.toString());
    setShowPayModal(true);
  };

  const openHistoryModal = (expense) => {
    setSelectedExpense(expense);
    setShowHistoryModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingExpense(null);
    setNewExpense({ name: '', amount: '', branch: 1, dueDate: '' });
  };

  // ===== GET MONTH NAME =====
  const getMonthName = (dateStr) => {
    const date = new Date(dateStr.split(' ')[0]);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const getDateOnly = (dateStr) => {
    return dateStr.split(' ')[0];
  };

  const getTimeOnly = (dateStr) => {
    const parts = dateStr.split(' ');
    return parts.slice(1).join(' ');
  };

  return (
    <div className="fixed-expense-container">
      <div className="expense-header">
        <h3>Fixed Expenses</h3>
        <button className="btn-accent" onClick={openAddModal}>
          <Plus size={18} />
          Add Fixed Expense
        </button>
      </div>

      <div className="expense-search">
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

      <div className="expense-table-wrap">
        <table className="expense-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Expense Name</th>
              <th>Branch</th>
              <th>Amount (₹)</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Last Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">No expenses found</td>
              </tr>
            ) : (
              currentItems.map((exp, index) => (
                <tr key={exp.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="font-medium">{exp.name}</td>
                  <td><span className="branch-badge">Branch {exp.branch}</span></td>
                  <td>₹{exp.amount.toLocaleString()}</td>
                  <td>{exp.dueDate}</td>
                  <td>
                    <span className={exp.paid ? 'badge-active' : 'badge-pending'}>
                      {exp.paid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td>{exp.lastPaid || 'Never'}</td>
                  <td>
                    <div className="action-group">
                      <button 
                        className="btn-view" 
                        onClick={() => openHistoryModal(exp)}
                        title="View History"
                      >
                        <Eye size={15} />
                      </button>
                      <button 
                        className="btn-edit" 
                        onClick={() => openEditModal(exp)}
                        title="Edit"
                      >
                        <Edit size={15} />
                      </button>
                      {!exp.paid && (
                        <button 
                          className="btn-pay" 
                          onClick={() => openPayModal(exp)}
                          title="Pay Now"
                        >
                          <DollarSign size={15} />
                        </button>
                      )}
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
              <h3>{editingExpense ? 'Edit Fixed Expense' : 'Add Fixed Expense'}</h3>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Expense Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter expense name"
                  value={newExpense.name}
                  onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                />
              </div>

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

              <div className="form-row">
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

                <div className="form-group">
                  <label>Due Date *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., 1st of every month"
                    value={newExpense.dueDate}
                    onChange={(e) => setNewExpense({ ...newExpense, dueDate: e.target.value })}
                  />
                </div>
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

      {/* ===== PAY MODAL ===== */}
      {showPayModal && selectedExpense && (
        <div className="modal-overlay" onClick={() => setShowPayModal(false)}>
          <div className="modal-content pay-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>💰 Pay - {selectedExpense.name}</h3>
              <button className="modal-close" onClick={() => setShowPayModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="pay-info">
                <div className="pay-info-row">
                  <span>Expense:</span>
                  <strong>{selectedExpense.name}</strong>
                </div>
                <div className="pay-info-row">
                  <span>Original Amount:</span>
                  <strong>₹{selectedExpense.amount.toLocaleString()}</strong>
                </div>
                <div className="pay-info-row">
                  <span>Due Date:</span>
                  <strong>{selectedExpense.dueDate}</strong>
                </div>
              </div>

              <div className="form-group">
                <label>Pay Amount (₹) *</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter amount"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  min="1"
                />
              </div>

              <div className="pay-note">
                <span>✓</span>
                <p>This payment will be recorded with current date & time</p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowPayModal(false)}>Cancel</button>
              <button className="btn-pay-save" onClick={handlePayExpense}>
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== HISTORY MODAL ===== */}
      {showHistoryModal && selectedExpense && (
        <div className="modal-overlay" onClick={() => setShowHistoryModal(false)}>
          <div className="modal-content history-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📋 Payment History - {selectedExpense.name}</h3>
              <button className="modal-close" onClick={() => setShowHistoryModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="history-summary">
                <div className="summary-item">
                  <span>Total Paid</span>
                  <strong>₹{selectedExpense.history.reduce((sum, h) => sum + h.amount, 0).toLocaleString()}</strong>
                </div>
                <div className="summary-item">
                  <span>Total Payments</span>
                  <strong>{selectedExpense.history.length}</strong>
                </div>
                <div className="summary-item">
                  <span>Status</span>
                  <strong className={selectedExpense.paid ? 'text-green' : 'text-yellow'}>
                    {selectedExpense.paid ? 'Paid' : 'Pending'}
                  </strong>
                </div>
              </div>

              <div className="history-list">
                <h4>Payment History</h4>
                {selectedExpense.history.length === 0 ? (
                  <p className="no-history">No payment history found</p>
                ) : (
                  selectedExpense.history.map((item, index) => (
                    <div key={index} className="history-item">
                      <div className="history-left">
                        <span className="history-date">{getMonthName(item.date)}</span>
                        <span className="history-date-full">
                          {getDateOnly(item.date)} • {getTimeOnly(item.date)}
                        </span>
                      </div>
                      <div className="history-right">
                        <span className="history-amount">₹{item.amount.toLocaleString()}</span>
                        <span className="history-status paid">✓ Paid</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowHistoryModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixedExpense;