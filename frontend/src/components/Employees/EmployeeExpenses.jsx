import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit, Trash2, RefreshCw, DollarSign, User, Calendar, Clock, X, Building } from 'lucide-react';
import './EmployeeExpenses.css';

const EmployeeExpenses = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userBranch, setUserBranch] = useState(null);
  const itemsPerPage = 10;

  // ===== EMPLOYEES DATA =====
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Ahmed Khan',
      branch: 1,
      role: 'employee',
      salary: 45000,
      monthlyExpenses: 0,
      totalExpenses: 200,
      expenses: [
        { id: 1, date: '2026-07-01', amount: 500, description: 'Petrol', category: 'Transport' },
        { id: 2, date: '2026-07-03', amount: 300, description: 'Tea', category: 'Food' },
      ]
    },
    {
      id: 2,
      name: 'Sara Ali',
      branch: 2,
      role: 'manager',
      salary: 38000,
      monthlyExpenses: 0,
      totalExpenses: 0,
      expenses: [
        { id: 3, date: '2026-07-02', amount: 1000, description: 'Office Supplies', category: 'Stationary' },
      ]
    },
    {
      id: 3,
      name: 'Usman Malik',
      branch: 1,
      role: 'employee',
      salary: 52000,
      monthlyExpenses: 0,
      totalExpenses: 0,
      expenses: []
    },
    {
      id: 4,
      name: 'Fatima Noor',
      branch: 2,
      role: 'employee',
      salary: 41000,
      monthlyExpenses: 0,
      totalExpenses: 0,
      expenses: [
        { id: 4, date: '2026-07-04', amount: 200, description: 'Transport', category: 'Transport' },
        { id: 5, date: '2026-07-05', amount: 350, description: 'Lunch', category: 'Food' },
      ]
    },
    {
      id: 5,
      name: 'Bilal Ahmed',
      branch: 1,
      role: 'employee',
      salary: 35000,
      monthlyExpenses: 0,
      totalExpenses: 0,
      expenses: []
    },
    {
      id: 6,
      name: 'Hina Riaz',
      branch: 2,
      role: 'employee',
      salary: 40000,
      monthlyExpenses: 0,
      totalExpenses: 0,
      expenses: []
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    amount: '',
    description: '',
    category: 'Other',
    date: '',
  });

  // ===== GET USER ROLE AND BRANCH =====
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
      setUserBranch(user.branch);
    }
  }, []);

  // ===== FILTER - STRICT BRANCH WISE =====
  const filtered = employees.filter(e => {
    const searchMatch = e.name.toLowerCase().includes(search.toLowerCase());
    
    // STRICT: Sirf user ki branch ke employees
    let branchMatch = true;
    if (userBranch) {
      branchMatch = e.branch === parseInt(userBranch);
    }
    
    return searchMatch && branchMatch;
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
    if (!newExpense.amount || !newExpense.description) {
      alert('Please fill all required fields');
      return;
    }

    const date = newExpense.date || getCurrentDate();
    const amount = parseInt(newExpense.amount);

    setEmployees(employees.map(emp => {
      if (emp.id === selectedEmployee.id) {
        const newExpenseItem = {
          id: emp.expenses.length > 0 ? Math.max(...emp.expenses.map(e => e.id)) + 1 : 1,
          date: date,
          amount: amount,
          description: newExpense.description,
          category: newExpense.category,
        };
        return {
          ...emp,
          expenses: [...emp.expenses, newExpenseItem],
          monthlyExpenses: emp.monthlyExpenses + amount,
          totalExpenses: emp.totalExpenses + amount,
        };
      }
      return emp;
    }));

    setNewExpense({ amount: '', description: '', category: 'Other', date: '' });
    setShowExpenseModal(false);
    setSelectedEmployee(null);
  };

  // ===== DELETE EXPENSE =====
  const handleDeleteExpense = (employeeId, expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const emp = employees.find(e => e.id === employeeId);
      const expense = emp.expenses.find(e => e.id === expenseId);
      
      setEmployees(employees.map(e => {
        if (e.id === employeeId) {
          return {
            ...e,
            expenses: e.expenses.filter(ex => ex.id !== expenseId),
            monthlyExpenses: e.monthlyExpenses - expense.amount,
            totalExpenses: e.totalExpenses - expense.amount,
          };
        }
        return e;
      }));
    }
  };

  // ===== RESET MONTHLY EXPENSES =====
  const handleResetMonthly = (id) => {
    if (window.confirm('Are you sure you want to reset monthly expenses for this employee?')) {
      setEmployees(employees.map(emp => {
        if (emp.id === id) {
          return { ...emp, monthlyExpenses: 0 };
        }
        return emp;
      }));
    }
  };

  // ===== RESET ALL MONTHLY EXPENSES =====
  const handleResetAllMonthly = () => {
    if (window.confirm('Are you sure you want to reset ALL monthly expenses? This cannot be undone.')) {
      setEmployees(employees.map(emp => {
        return { ...emp, monthlyExpenses: 0 };
      }));
    }
  };

  // ===== OPEN MODALS =====
  const openExpenseModal = (employee) => {
    setSelectedEmployee(employee);
    setNewExpense({ amount: '', description: '', category: 'Other', date: getCurrentDate() });
    setShowExpenseModal(true);
  };

  const openHistoryModal = (employee) => {
    setSelectedEmployee(employee);
    setShowHistoryModal(true);
  };

  const closeModal = () => {
    setShowExpenseModal(false);
    setShowHistoryModal(false);
    setSelectedEmployee(null);
  };

  // ===== CATEGORIES =====
  const categories = ['Transport', 'Food', 'Stationary', 'Utilities', 'Other'];

  // ===== FORMAT DATE =====
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // ===== TOTALS (Filtered) =====
  const totalMonthlyExpenses = filtered.reduce((sum, e) => sum + e.monthlyExpenses, 0);
  const totalAllExpenses = filtered.reduce((sum, e) => sum + e.totalExpenses, 0);

  // ===== BRANCH TOTALS (All data for reference) =====
  const branch1Total = employees.filter(e => e.branch === 1).reduce((sum, e) => sum + e.totalExpenses, 0);
  const branch2Total = employees.filter(e => e.branch === 2).reduce((sum, e) => sum + e.totalExpenses, 0);
  const branch1Count = employees.filter(e => e.branch === 1).length;
  const branch2Count = employees.filter(e => e.branch === 2).length;

  const isAdmin = userRole === 'admin';
  const isManager = userRole === 'manager';
  const branchLabel = userBranch ? `Branch ${userBranch}` : 'All Branches';

  return (
    <div className="employee-expenses-container">
      <div className="expenses-header">
        <div className="header-left">
          <h2>Employee Expenses</h2>
          <div className="branch-label">
            <Building size={14} />
            <span>{branchLabel}</span>
          </div>
          <div className="header-stats">
            <span className="stat-chip">
              <User size={14} />
              {filtered.length} Employees
            </span>
            <span className="stat-chip monthly-stat">
              <Calendar size={14} />
              Monthly: PKR {totalMonthlyExpenses.toLocaleString()}
            </span>
            <span className="stat-chip total-stat">
              <DollarSign size={14} />
              Total: PKR {totalAllExpenses.toLocaleString()}
            </span>
          </div>
        </div>
        {isAdmin && (
          <button className="btn-reset-all" onClick={handleResetAllMonthly}>
            <RefreshCw size={18} />
            Reset All Monthly
          </button>
        )}
      </div>

      {/* ===== BRANCH TOTALS CARDS - SIRF ADMIN (All Branches) ===== */}
      {isAdmin && !userBranch && (
        <div className="branch-totals">
          <div className="branch-total-card branch-1-card">
            <h4>Branch 1</h4>
            <div className="branch-total-row">
              <span>Employees: {branch1Count}</span>
              <span>Total Expenses: PKR {branch1Total.toLocaleString()}</span>
            </div>
          </div>
          <div className="branch-total-card branch-2-card">
            <h4>Branch 2</h4>
            <div className="branch-total-row">
              <span>Employees: {branch2Count}</span>
              <span>Total Expenses: PKR {branch2Total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* ===== MANAGER/ADMIN BRANCH INFO ===== */}
      {userBranch && (
        <div className="manager-branch-info">
          <span className="manager-branch-badge">
            📍 {branchLabel} - View
          </span>
        </div>
      )}

      {/* ===== CONTROLS ===== */}
      <div className="expenses-controls">
        <div className="expenses-search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="expenses-table-wrap">
        <table className="expenses-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Branch</th>
              <th>Role</th>
              <th>Monthly Expenses</th>
              <th>Total Expenses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No employees found for {branchLabel}</td>
              </tr>
            ) : (
              currentItems.map((emp, index) => (
                <tr key={emp.id}>
                  <td className="text-gray">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="employee-name">{emp.name}</td>
                  <td><span className={`branch-badge branch-${emp.branch}`}>Branch {emp.branch}</span></td>
                  <td><span className="role-badge">{emp.role}</span></td>
                  <td>
                    <span className={emp.monthlyExpenses > 0 ? 'expense-amount' : 'zero-amount'}>
                      PKR {emp.monthlyExpenses.toLocaleString()}
                    </span>
                  </td>
                  <td>PKR {emp.totalExpenses.toLocaleString()}</td>
                  <td>
                    <div className="action-group">
                      <button 
                        className="btn-view" 
                        onClick={() => openHistoryModal(emp)}
                        title="View History"
                      >
                        <Eye size={15} />
                      </button>
                      <button 
                        className="btn-add" 
                        onClick={() => openExpenseModal(emp)}
                        title="Add Expense"
                      >
                        <Plus size={15} />
                      </button>
                      {emp.monthlyExpenses > 0 && isAdmin && (
                        <button 
                          className="btn-reset" 
                          onClick={() => handleResetMonthly(emp.id)}
                          title="Reset Monthly"
                        >
                          <RefreshCw size={15} />
                        </button>
                      )}
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

      {/* ===== ADD EXPENSE MODAL ===== */}
      {showExpenseModal && selectedEmployee && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <Plus size={20} className="modal-icon" />
                <h3>Add Expense - {selectedEmployee.name}</h3>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="expense-info">
                <div className="info-row">
                  <span>Employee:</span>
                  <strong>{selectedEmployee.name}</strong>
                </div>
                <div className="info-row">
                  <span>Current Monthly:</span>
                  <strong>PKR {selectedEmployee.monthlyExpenses.toLocaleString()}</strong>
                </div>
              </div>

              <div className="form-group">
                <label>Amount (PKR) *</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Petrol, Tea, Office Supplies"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-input"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="btn-save" onClick={handleAddExpense}>
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== HISTORY MODAL ===== */}
      {showHistoryModal && selectedEmployee && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content history-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <Clock size={20} className="modal-icon" />
                <h3>Expense History - {selectedEmployee.name}</h3>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="history-summary">
                <div className="summary-item">
                  <span>Monthly Expenses</span>
                  <strong>PKR {selectedEmployee.monthlyExpenses.toLocaleString()}</strong>
                </div>
                <div className="summary-item">
                  <span>Total Expenses</span>
                  <strong>PKR {selectedEmployee.totalExpenses.toLocaleString()}</strong>
                </div>
                <div className="summary-item">
                  <span>Total Entries</span>
                  <strong>{selectedEmployee.expenses.length}</strong>
                </div>
              </div>

              <div className="history-list">
                <h4>Expense Entries</h4>
                {selectedEmployee.expenses.length === 0 ? (
                  <p className="no-history">No expenses found</p>
                ) : (
                  selectedEmployee.expenses.map((item) => (
                    <div key={item.id} className="history-item">
                      <div className="history-left">
                        <span className="history-date">{formatDate(item.date)}</span>
                        <span className="history-category">{item.category}</span>
                      </div>
                      <div className="history-center">
                        <span className="history-desc">{item.description}</span>
                      </div>
                      <div className="history-right">
                        <span className="history-amount">PKR {item.amount.toLocaleString()}</span>
                        <button 
                          className="btn-delete-small" 
                          onClick={() => handleDeleteExpense(selectedEmployee.id, item.id)}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeExpenses;