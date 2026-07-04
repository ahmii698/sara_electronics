import React, { useState } from 'react';
import { Search, Eye, Edit, DollarSign, RefreshCw, X, Wallet } from 'lucide-react';
import './Salary.css';

const Salary = () => {
  const [search, setSearch] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [advanceReason, setAdvanceReason] = useState('');

  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: 'Ahmed Khan', 
      branch: 1, 
      salary: 45000, 
      paid: true,
      lastPaid: '2026-06-01',
      totalAdvances: 13000,
      history: [
        { date: '2026-06-01 10:30 AM', amount: 45000, status: 'Paid', type: 'salary' },
        { date: '2026-05-01 09:15 AM', amount: 45000, status: 'Paid', type: 'salary' },
        { date: '2026-04-01 11:00 AM', amount: 45000, status: 'Paid', type: 'salary' },
      ],
      advances: [
        { date: '2026-06-15 02:30 PM', amount: 5000, reason: 'Emergency' },
        { date: '2026-06-10 11:20 AM', amount: 3000, reason: 'Medical' },
        { date: '2026-05-25 03:45 PM', amount: 5000, reason: 'Home Repair' },
      ]
    },
    { 
      id: 2, 
      name: 'Sara Ali', 
      branch: 2, 
      salary: 38000, 
      paid: false,
      lastPaid: '2026-05-01',
      totalAdvances: 2000,
      history: [
        { date: '2026-05-01 09:30 AM', amount: 38000, status: 'Paid', type: 'salary' },
        { date: '2026-04-01 10:45 AM', amount: 38000, status: 'Paid', type: 'salary' },
      ],
      advances: [
        { date: '2026-06-10 03:45 PM', amount: 2000, reason: 'Personal' },
      ]
    },
    { 
      id: 3, 
      name: 'Usman Malik', 
      branch: 1, 
      salary: 52000, 
      paid: true,
      lastPaid: '2026-06-01',
      totalAdvances: 0,
      history: [
        { date: '2026-06-01 08:45 AM', amount: 52000, status: 'Paid', type: 'salary' },
        { date: '2026-05-01 09:20 AM', amount: 52000, status: 'Paid', type: 'salary' },
        { date: '2026-04-01 10:10 AM', amount: 52000, status: 'Paid', type: 'salary' },
        { date: '2026-03-01 11:30 AM', amount: 52000, status: 'Paid', type: 'salary' },
      ],
      advances: []
    },
    { 
      id: 4, 
      name: 'Fatima Noor', 
      branch: 2, 
      salary: 41000, 
      paid: false,
      lastPaid: '2026-04-01',
      totalAdvances: 500,
      history: [
        { date: '2026-04-01 09:00 AM', amount: 41000, status: 'Paid', type: 'salary' },
      ],
      advances: [
        { date: '2026-06-05 11:20 AM', amount: 500, reason: 'Transport' },
      ]
    },
  ]);

  const filtered = employees.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  // ===== GET CURRENT DATE TIME =====
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  };

  // ===== PAY NOW =====
  const handlePayNow = (id) => {
    const dateTime = getCurrentDateTime();
    setEmployees(employees.map(emp => {
      if (emp.id === id) {
        const finalSalary = emp.salary - emp.totalAdvances;
        const newHistory = [
          { date: dateTime, amount: finalSalary, status: 'Paid', type: 'salary', advanceDeducted: emp.totalAdvances },
          ...emp.history
        ];
        return { 
          ...emp, 
          paid: true, 
          lastPaid: dateTime,
          history: newHistory,
          totalAdvances: 0
        };
      }
      return emp;
    }));
  };

  // ===== ADD ADVANCE WITH REASON =====
  const handleAddAdvance = (id) => {
    if (!advanceAmount || parseInt(advanceAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const amount = parseInt(advanceAmount);
    const dateTime = getCurrentDateTime();
    const reason = advanceReason.trim() || 'No reason provided';

    setEmployees(employees.map(emp => {
      if (emp.id === id) {
        const newAdvances = [
          { date: dateTime, amount: amount, reason: reason },
          ...emp.advances
        ];
        return { 
          ...emp, 
          totalAdvances: emp.totalAdvances + amount,
          advances: newAdvances
        };
      }
      return emp;
    }));

    setAdvanceAmount('');
    setAdvanceReason('');
    setShowAdvanceModal(false);
  };

  // ===== RESET SALARY =====
  const handleReset = (id) => {
    if (window.confirm('Are you sure you want to reset this employee\'s salary for this month?')) {
      setEmployees(employees.map(emp => {
        if (emp.id === id) {
          return { ...emp, paid: false };
        }
        return emp;
      }));
    }
  };

  // ===== EDIT SALARY =====
  const handleEditSalary = (id, newSalary) => {
    setEmployees(employees.map(emp => {
      if (emp.id === id) {
        return { ...emp, salary: parseInt(newSalary) };
      }
      return emp;
    }));
    setShowEditModal(false);
    setEditingEmployee(null);
  };

  // ===== VIEW HISTORY =====
  const handleViewHistory = (emp) => {
    setSelectedEmployee(emp);
    setShowHistoryModal(true);
  };

  // ===== OPEN MODALS =====
  const openEditModal = (emp) => {
    setEditingEmployee(emp);
    setShowEditModal(true);
  };

  const openAdvanceModal = (emp) => {
    setSelectedEmployee(emp);
    setAdvanceAmount('');
    setAdvanceReason('');
    setShowAdvanceModal(true);
  };

  // ===== GET DATE ONLY =====
  const getDateOnly = (dateStr) => {
    return dateStr.split(' ')[0];
  };

  // ===== GET TIME ONLY =====
  const getTimeOnly = (dateStr) => {
    const parts = dateStr.split(' ');
    return parts.slice(1).join(' ');
  };

  // ===== GET MONTH NAME =====
  const getMonthName = (dateStr) => {
    const date = new Date(dateStr.split(' ')[0]);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="salary-container">
      <div className="salary-header">
        <h3>Employee Salary Management</h3>
      </div>

      <div className="salary-search">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="salary-table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Branch</th>
              <th>Salary (₹)</th>
              <th>Advances</th>
              <th>Status</th>
              <th>Last Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(emp => (
              <tr key={emp.id}>
                <td className="font-medium">{emp.name}</td>
                <td>Branch {emp.branch}</td>
                <td>₹{emp.salary.toLocaleString()}</td>
                <td>
                  {emp.totalAdvances > 0 ? (
                    <span className="advance-badge">₹{emp.totalAdvances.toLocaleString()}</span>
                  ) : (
                    <span className="no-advance">None</span>
                  )}
                </td>
                <td>
                  <span className={emp.paid ? 'badge-active' : 'badge-pending'}>
                    {emp.paid ? 'Paid' : 'Pending'}
                  </span>
                </td>
                <td>{emp.lastPaid || 'Never'}</td>
                <td>
                  <div className="action-group">
                    <button 
                      className="btn-view" 
                      onClick={() => handleViewHistory(emp)}
                      title="View History"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="btn-edit" 
                      onClick={() => openEditModal(emp)}
                      title="Edit Salary"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="btn-advance" 
                      onClick={() => openAdvanceModal(emp)}
                      title="Give Advance"
                    >
                      <Wallet size={16} />
                    </button>
                    {emp.paid ? (
                      <button 
                        className="btn-reset" 
                        onClick={() => handleReset(emp.id)}
                        title="Reset for this month"
                      >
                        <RefreshCw size={16} />
                      </button>
                    ) : (
                      <button 
                        className="btn-pay" 
                        onClick={() => handlePayNow(emp.id)}
                        title="Pay Now"
                      >
                        <DollarSign size={16} />
                        Pay
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== HISTORY MODAL ===== */}
      {showHistoryModal && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setShowHistoryModal(false)}>
          <div className="modal-content history-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Salary History - {selectedEmployee.name}</h3>
              <button className="modal-close" onClick={() => setShowHistoryModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="history-summary">
                <div className="summary-item">
                  <span>Current Salary</span>
                  <strong>₹{selectedEmployee.salary.toLocaleString()}</strong>
                </div>
                <div className="summary-item">
                  <span>Total Paid</span>
                  <strong>₹{selectedEmployee.history.reduce((sum, h) => sum + h.amount, 0).toLocaleString()}</strong>
                </div>
                <div className="summary-item">
                  <span>Total Payments</span>
                  <strong>{selectedEmployee.history.length}</strong>
                </div>
              </div>

              {/* Advances Section with Date + Time */}
              {selectedEmployee.advances.length > 0 && (
                <div className="advances-section">
                  <h4>💰 Salary Advances</h4>
                  <div className="advances-table-wrap">
                    <table className="advances-table">
                      <thead>
                        <tr>
                          <th>Date & Time</th>
                          <th>Amount</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedEmployee.advances.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div className="advance-date-time">
                                <span className="adv-date">{getDateOnly(item.date)}</span>
                                <span className="adv-time">{getTimeOnly(item.date)}</span>
                              </div>
                            </td>
                            <td className="advance-amount-cell">-₹{item.amount.toLocaleString()}</td>
                            <td className="advance-reason-cell">{item.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td><strong>Total Advances</strong></td>
                          <td><strong>₹{selectedEmployee.totalAdvances.toLocaleString()}</strong></td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="remaining-salary">
                    <span>💰 Remaining Salary: </span>
                    <strong>₹{(selectedEmployee.salary - selectedEmployee.totalAdvances).toLocaleString()}</strong>
                  </div>
                </div>
              )}

              <div className="history-list">
                <h4>📋 Payment History</h4>
                {selectedEmployee.history.length === 0 ? (
                  <p className="no-history">No payment history found</p>
                ) : (
                  selectedEmployee.history.map((item, index) => (
                    <div key={index} className="history-item">
                      <div className="history-left">
                        <span className="history-date">{getMonthName(item.date)}</span>
                        <span className="history-date-full">
                          {getDateOnly(item.date)} • {getTimeOnly(item.date)}
                        </span>
                      </div>
                      <div className="history-right">
                        <span className="history-amount">₹{item.amount.toLocaleString()}</span>
                        {item.advanceDeducted && item.advanceDeducted > 0 && (
                          <span className="deducted-badge">-₹{item.advanceDeducted} advance</span>
                        )}
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

      {/* ===== ADVANCE MODAL WITH REASON ===== */}
      {showAdvanceModal && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setShowAdvanceModal(false)}>
          <div className="modal-content advance-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>💰 Give Advance - {selectedEmployee.name}</h3>
              <button className="modal-close" onClick={() => setShowAdvanceModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="advance-info-box">
                <div className="advance-info-row">
                  <span>Current Salary:</span>
                  <strong>₹{selectedEmployee.salary.toLocaleString()}</strong>
                </div>
                <div className="advance-info-row">
                  <span>Total Advances Taken:</span>
                  <strong className="advance-taken">₹{selectedEmployee.totalAdvances.toLocaleString()}</strong>
                </div>
                <div className="advance-info-row highlight">
                  <span>Remaining Salary:</span>
                  <strong className="remaining-amount">₹{(selectedEmployee.salary - selectedEmployee.totalAdvances).toLocaleString()}</strong>
                </div>
              </div>

              <div className="form-group">
                <label>Advance Amount (₹) *</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter amount"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(e.target.value)}
                  min="1"
                  max={selectedEmployee.salary - selectedEmployee.totalAdvances}
                />
                <small className="field-hint">Max: ₹{(selectedEmployee.salary - selectedEmployee.totalAdvances).toLocaleString()}</small>
              </div>

              <div className="form-group">
                <label>Reason (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter reason for advance..."
                  value={advanceReason}
                  onChange={(e) => setAdvanceReason(e.target.value)}
                />
                <small className="field-hint">e.g., Emergency, Medical, Home Repair, etc.</small>
              </div>

              <div className="advance-note-box">
                <span className="advance-icon">⚠️</span>
                <p>This amount will be deducted from next salary payment.</p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowAdvanceModal(false)}>Cancel</button>
              <button className="btn-advance-save" onClick={() => handleAddAdvance(selectedEmployee.id)}>
                Give Advance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {showEditModal && editingEmployee && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Salary - {editingEmployee.name}</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>New Salary (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  defaultValue={editingEmployee.salary}
                  id="editSalaryInput"
                />
              </div>
              <p className="edit-note">Branch: Branch {editingEmployee.branch}</p>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button 
                className="btn-save" 
                onClick={() => {
                  const input = document.getElementById('editSalaryInput');
                  const newSalary = input.value;
                  if (newSalary && parseInt(newSalary) > 0) {
                    handleEditSalary(editingEmployee.id, newSalary);
                  } else {
                    alert('Please enter a valid salary amount');
                  }
                }}
              >
                Update Salary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Salary;