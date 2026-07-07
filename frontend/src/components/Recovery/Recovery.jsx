import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, FileText, Users, DollarSign, Calendar, Clock, Eye, Building, Filter, X, Wallet, AlertTriangle, Edit, Save } from 'lucide-react';
import './Recovery.css';

const Recovery = () => {
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecovery, setSelectedRecovery] = useState(null);
  const [showInstallmentModal, setShowInstallmentModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [payAmount, setPayAmount] = useState('');
  const [payMonth, setPayMonth] = useState('');
  const [editMonth, setEditMonth] = useState('');
  const [editNewAmount, setEditNewAmount] = useState('');
  const [userBranch, setUserBranch] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const itemsPerPage = 10;

  // ===== GET CURRENT MONTH =====
  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const currentMonth = getCurrentMonth();

  // ===== GET USER DATA =====
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
      setUserBranch(user.branch);
      if (user.branch) {
        setBranchFilter(user.branch);
      }
    }
  }, []);

  // ===== ADJUST OVERPAID TO UNPAID =====
  const adjustOverpaidToUnpaid = (installments) => {
    let overpaidAmount = 0;
    const adjustedInstallments = installments.map(inst => {
      if (inst.paid > inst.due) {
        overpaidAmount += (inst.paid - inst.due);
        return { ...inst, paid: inst.due, status: 'paid' };
      }
      return { ...inst };
    });

    if (overpaidAmount > 0) {
      for (let i = 0; i < adjustedInstallments.length; i++) {
        if (overpaidAmount <= 0) break;
        const inst = adjustedInstallments[i];
        const dueRemaining = inst.due - inst.paid;
        if (dueRemaining > 0) {
          const adjust = Math.min(overpaidAmount, dueRemaining);
          inst.paid += adjust;
          overpaidAmount -= adjust;
          inst.status = inst.paid >= inst.due ? 'paid' : 'partial';
        }
      }
    }

    return adjustedInstallments;
  };

  // ===== RECALCULATE INSTALLMENTS =====
  const recalculateInstallments = (installments) => {
    let adjusted = adjustOverpaidToUnpaid(installments);
    const totalPaid = adjusted.reduce((sum, inst) => sum + inst.paid, 0);
    return { adjustedInstallments: adjusted, totalPaid };
  };

  // ===== CHECK OVERDUE =====
  const checkOverdue = (installments) => {
    let overdueCount = 0;
    let isOverdue = false;

    installments.forEach(inst => {
      const instMonth = inst.month;
      if (instMonth < currentMonth) {
        if (inst.paid < inst.due) {
          overdueCount++;
          isOverdue = true;
        }
      }
    });

    return { isOverdue, overdueCount };
  };

  const [recoveries, setRecoveries] = useState([
    { 
      id: 1, 
      customer: 'Ahmed Khan', 
      caseNo: 'SR-001', 
      amount: 60000, 
      paid: 25000, 
      due: 35000, 
      monthly: 5000, 
      branch: 1,
      product: 'Samsung LED 55"',
      paymentType: 'Installment',
      nextDue: '2026-04-01',
      installments: [
        { month: '2026-01', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-02', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-03', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-04', due: 5000, paid: 3000, status: 'partial' },
        { month: '2026-05', due: 5000, paid: 0, status: 'unpaid' },
        { month: '2026-06', due: 5000, paid: 0, status: 'unpaid' },
        { month: '2026-07', due: 5000, paid: 0, status: 'unpaid' },
        { month: '2026-08', due: 5000, paid: 0, status: 'unpaid' },
      ]
    },
    { 
      id: 2, 
      customer: 'Sara Ali', 
      caseNo: 'SR-002', 
      amount: 100000, 
      paid: 100000, 
      due: 0, 
      monthly: 0, 
      branch: 2,
      product: 'LG Refrigerator',
      paymentType: 'Cash',
      nextDue: 'Paid',
      installments: [
        { month: '2026-01', due: 10000, paid: 10000, status: 'paid' },
        { month: '2026-02', due: 10000, paid: 10000, status: 'paid' },
        { month: '2026-03', due: 10000, paid: 10000, status: 'paid' },
        { month: '2026-04', due: 10000, paid: 10000, status: 'paid' },
        { month: '2026-05', due: 10000, paid: 10000, status: 'paid' },
        { month: '2026-06', due: 10000, paid: 10000, status: 'paid' },
        { month: '2026-07', due: 10000, paid: 10000, status: 'paid' },
        { month: '2026-08', due: 10000, paid: 10000, status: 'paid' },
        { month: '2026-09', due: 10000, paid: 10000, status: 'paid' },
        { month: '2026-10', due: 10000, paid: 10000, status: 'paid' },
      ]
    },
    { 
      id: 3, 
      customer: 'Usman Malik', 
      caseNo: 'SR-003', 
      amount: 40000, 
      paid: 15000, 
      due: 25000, 
      monthly: 4000, 
      branch: 1,
      product: 'Dell Laptop',
      paymentType: 'Installment',
      nextDue: '2026-03-15',
      installments: [
        { month: '2026-01', due: 4000, paid: 4000, status: 'paid' },
        { month: '2026-02', due: 4000, paid: 4000, status: 'paid' },
        { month: '2026-03', due: 4000, paid: 4000, status: 'paid' },
        { month: '2026-04', due: 4000, paid: 2000, status: 'partial' },
        { month: '2026-05', due: 4000, paid: 0, status: 'unpaid' },
        { month: '2026-06', due: 4000, paid: 0, status: 'unpaid' },
        { month: '2026-07', due: 4000, paid: 0, status: 'unpaid' },
        { month: '2026-08', due: 4000, paid: 0, status: 'unpaid' },
        { month: '2026-09', due: 4000, paid: 0, status: 'unpaid' },
        { month: '2026-10', due: 4000, paid: 0, status: 'unpaid' },
      ]
    },
    { 
      id: 4, 
      customer: 'Fatima Noor', 
      caseNo: 'SR-004', 
      amount: 80000, 
      paid: 42000, 
      due: 38000, 
      monthly: 6000, 
      branch: 2,
      product: 'Sony LED 65"',
      paymentType: 'Installment',
      nextDue: '2026-03-20',
      installments: [
        { month: '2026-01', due: 6000, paid: 6000, status: 'paid' },
        { month: '2026-02', due: 6000, paid: 6000, status: 'paid' },
        { month: '2026-03', due: 6000, paid: 6000, status: 'paid' },
        { month: '2026-04', due: 6000, paid: 6000, status: 'paid' },
        { month: '2026-05', due: 6000, paid: 6000, status: 'paid' },
        { month: '2026-06', due: 6000, paid: 4000, status: 'partial' },
        { month: '2026-07', due: 6000, paid: 8000, status: 'paid' },
        { month: '2026-08', due: 6000, paid: 0, status: 'unpaid' },
        { month: '2026-09', due: 6000, paid: 0, status: 'unpaid' },
        { month: '2026-10', due: 6000, paid: 0, status: 'unpaid' },
        { month: '2026-11', due: 6000, paid: 0, status: 'unpaid' },
        { month: '2026-12', due: 6000, paid: 0, status: 'unpaid' },
        { month: '2027-01', due: 6000, paid: 0, status: 'unpaid' },
      ]
    },
    { 
      id: 5, 
      customer: 'Ali Raza', 
      caseNo: 'SR-005', 
      amount: 50000, 
      paid: 50000, 
      due: 0, 
      monthly: 0, 
      branch: 1,
      product: 'Apple iPhone 15',
      paymentType: 'Cash',
      nextDue: 'Paid',
      installments: [
        { month: '2026-01', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-02', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-03', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-04', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-05', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-06', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-07', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-08', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-09', due: 5000, paid: 5000, status: 'paid' },
        { month: '2026-10', due: 5000, paid: 5000, status: 'paid' },
      ]
    },
  ]);

  // ===== EDIT INSTALLMENT =====
  const handleEditInstallment = () => {
    if (!editMonth) {
      alert('Please select a month');
      return;
    }
    if (!editNewAmount || parseInt(editNewAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const newAmount = parseInt(editNewAmount);
    const monthIndex = selectedRecovery.installments.findIndex(i => i.month === editMonth);
    
    if (monthIndex === -1) {
      alert('Invalid month selected');
      return;
    }

    setRecoveries(recoveries.map(r => {
      if (r.id === selectedRecovery.id) {
        const updatedInstallments = r.installments.map((inst, idx) => {
          if (idx === monthIndex) {
            const newPaid = inst.paid > newAmount ? newAmount : inst.paid;
            const newStatus = newPaid >= newAmount ? 'paid' : (newPaid > 0 ? 'partial' : 'unpaid');
            return { ...inst, due: newAmount, paid: newPaid, status: newStatus };
          }
          return inst;
        });

        // Update monthly installment if editing current month
        let newMonthly = r.monthly;
        if (editMonth === getCurrentMonth()) {
          newMonthly = newAmount;
        }

        // Recalculate
        const { adjustedInstallments, totalPaid } = recalculateInstallments(updatedInstallments);
        const overdueCheck = checkOverdue(adjustedInstallments);

        return {
          ...r,
          monthly: newMonthly,
          installments: adjustedInstallments,
          paid: totalPaid,
          due: r.amount - totalPaid > 0 ? r.amount - totalPaid : 0,
          isOverdue: overdueCheck.isOverdue,
          overdueMonths: overdueCheck.overdueCount
        };
      }
      return r;
    }));

    setEditMonth('');
    setEditNewAmount('');
    setShowEditModal(false);
    alert('Installment updated successfully!');
  };

  // ===== FILTER =====
  const filtered = recoveries.map(r => {
    const { adjustedInstallments, totalPaid } = recalculateInstallments(r.installments);
    const overdueCheck = checkOverdue(adjustedInstallments);
    
    return {
      ...r,
      installments: adjustedInstallments,
      paid: totalPaid,
      due: r.amount - totalPaid > 0 ? r.amount - totalPaid : 0,
      isOverdue: overdueCheck.isOverdue,
      overdueMonths: overdueCheck.overdueCount
    };
  }).filter(r => {
    const searchMatch = r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.caseNo.toLowerCase().includes(search.toLowerCase());
    
    let branchMatch = true;
    if (userBranch) {
      branchMatch = r.branch === parseInt(userBranch);
    } else if (branchFilter !== 'all') {
      branchMatch = r.branch === parseInt(branchFilter);
    }
    
    return searchMatch && branchMatch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  // ===== TOTALS =====
  const totalAmount = filtered.reduce((sum, r) => sum + r.amount, 0);
  const totalPaid = filtered.reduce((sum, r) => sum + r.paid, 0);
  const totalDue = filtered.reduce((sum, r) => sum + r.due, 0);
  const totalRecords = filtered.length;
  const overdueRecords = filtered.filter(r => r.isOverdue).length;

  // ===== INSTALLMENT STATUS =====
  const getInstallmentStatus = (installment) => {
    if (installment.paid >= installment.due) return 'paid';
    if (installment.paid > 0 && installment.paid < installment.due) return 'partial';
    return 'unpaid';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return '#22c55e';
      case 'partial': return '#f59e0b';
      case 'unpaid': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'paid': return 'Paid';
      case 'partial': return 'Partial';
      case 'unpaid': return 'Unpaid';
      default: return 'Unknown';
    }
  };

  const getMonthName = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };

  // ===== PAY INSTALLMENT =====
  const handlePayInstallment = () => {
    if (!payAmount || parseInt(payAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (!payMonth) {
      alert('Please select a month');
      return;
    }

    const amount = parseInt(payAmount);
    const monthIndex = selectedRecovery.installments.findIndex(i => i.month === payMonth);
    
    if (monthIndex === -1) {
      alert('Invalid month selected');
      return;
    }

    setRecoveries(recoveries.map(r => {
      if (r.id === selectedRecovery.id) {
        const updatedInstallments = r.installments.map((inst, idx) => {
          if (idx === monthIndex) {
            const newPaid = inst.paid + amount;
            const newStatus = newPaid >= inst.due ? 'paid' : (newPaid > 0 ? 'partial' : 'unpaid');
            return { ...inst, paid: newPaid, status: newStatus };
          }
          return inst;
        });

        const { adjustedInstallments, totalPaid } = recalculateInstallments(updatedInstallments);
        const overdueCheck = checkOverdue(adjustedInstallments);

        return {
          ...r,
          installments: adjustedInstallments,
          paid: totalPaid,
          due: r.amount - totalPaid > 0 ? r.amount - totalPaid : 0,
          isOverdue: overdueCheck.isOverdue,
          overdueMonths: overdueCheck.overdueCount
        };
      }
      return r;
    }));

    setPayAmount('');
    setPayMonth('');
    setShowPayModal(false);
    alert('Payment recorded successfully!');
  };

  const openPayModal = (recovery) => {
    setSelectedRecovery(recovery);
    setPayAmount('');
    setPayMonth('');
    setShowPayModal(true);
  };

  const openEditModal = (recovery) => {
    setSelectedRecovery(recovery);
    setEditMonth('');
    setEditNewAmount('');
    setShowEditModal(true);
  };

  const openInstallmentModal = (recovery) => {
    setSelectedRecovery(recovery);
    setShowInstallmentModal(true);
  };

  const closeModal = () => {
    setShowInstallmentModal(false);
    setShowPayModal(false);
    setShowEditModal(false);
    setSelectedRecovery(null);
  };

  const branchLabel = userBranch ? `Branch ${userBranch}` : 'All Branches';

  return (
    <div className="recovery-container">
      <div className="recovery-header">
        <div className="header-left">
          <h2>Recovery Management</h2>
          {userBranch && (
            <div className="branch-label">
              <Building size={14} />
              <span>{branchLabel}</span>
            </div>
          )}
          <div className="header-stats">
            <span className="stat-chip">
              <FileText size={14} />
              {totalRecords} Records
            </span>
            <span className="stat-chip">
              <DollarSign size={14} />
              PKR {totalAmount.toLocaleString()}
            </span>
            <span className="stat-chip paid-stat">
              <span className="dot paid"></span>
              PKR {totalPaid.toLocaleString()} Paid
            </span>
            <span className="stat-chip due-stat">
              <span className="dot due"></span>
              PKR {totalDue.toLocaleString()} Due
            </span>
            {overdueRecords > 0 && (
              <span className="stat-chip overdue-stat">
                <AlertTriangle size={14} />
                {overdueRecords} Overdue
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="recovery-controls">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="table-search"
            placeholder="Search by case or customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        {!userBranch && (
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
        )}
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>Recovery Records</h3>
          {overdueRecords > 0 && (
            <span className="overdue-header-badge">
              <AlertTriangle size={16} />
              {overdueRecords} Overdue Accounts
            </span>
          )}
        </div>

        <div className="table-scroll">
          <table className="table-data">
            <thead>
              <tr>
                <th>Case #</th>
                <th>Customer</th>
                <th>Branch</th>
                <th>Product</th>
                <th>Total (PKR)</th>
                <th>Paid (PKR)</th>
                <th>Due (PKR)</th>
                <th>Monthly</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="11" className="no-data">No records found for {branchLabel}</td>
                </tr>
              ) : (
                currentItems.map((item) => {
                  const isOverdue = item.isOverdue;
                  return (
                    <tr key={item.id} className={isOverdue ? 'overdue-row' : ''}>
                      <td className="case-number">{item.caseNo}</td>
                      <td className="customer-name">
                        {item.customer}
                        {isOverdue && (
                          <span className="overdue-badge">
                            <AlertTriangle size={12} />
                            {item.overdueMonths} month{item.overdueMonths > 1 ? 's' : ''} overdue
                          </span>
                        )}
                      </td>
                      <td><span className="branch-badge">Branch {item.branch}</span></td>
                      <td>{item.product}</td>
                      <td>PKR {item.amount.toLocaleString()}</td>
                      <td className="paid-amount">PKR {item.paid.toLocaleString()}</td>
                      <td className={item.due > 0 ? 'due-amount' : 'paid-amount'}>
                        PKR {item.due.toLocaleString()}
                      </td>
                      <td className="monthly-amount">{item.monthly > 0 ? `PKR ${item.monthly.toLocaleString()}` : '---'}</td>
                      <td><span className="type-badge">{item.paymentType}</span></td>
                      <td>
                        <span className={item.due === 0 ? 'badge-active' : 'badge-pending'}>
                          {item.due === 0 ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <div className="action-group">
                          <button 
                            className="btn-view-installments" 
                            onClick={() => openInstallmentModal(item)}
                            title="View Installments"
                          >
                            <Eye size={15} />
                          </button>
                          {item.due > 0 && (
                            <>
                              <button 
                                className="btn-pay-installment" 
                                onClick={() => openPayModal(item)}
                                title="Pay Installment"
                              >
                                <Wallet size={15} />
                                Pay
                              </button>
                              <button 
                                className="btn-edit-installment" 
                                onClick={() => openEditModal(item)}
                                title="Edit Installment"
                              >
                                <Edit size={15} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <span className="page-info">
            {totalRecords > 0 ? (
              `Showing ${startIndex + 1} - ${Math.min(startIndex + itemsPerPage, totalRecords)} of ${totalRecords} records`
            ) : (
              'No records found'
            )}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ===== INSTALLMENT HISTORY MODAL ===== */}
      {showInstallmentModal && selectedRecovery && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content installment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <Clock size={20} className="modal-icon" />
                <h3>Installment History - {selectedRecovery.customer}</h3>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {selectedRecovery.isOverdue && (
                <div className="overdue-notice">
                  <AlertTriangle size={20} />
                  <span>
                    ⚠️ This account has {selectedRecovery.overdueMonths} month{selectedRecovery.overdueMonths > 1 ? 's' : ''} overdue payments!
                  </span>
                </div>
              )}

              <div className="installment-summary">
                <div className="summary-item">
                  <span>Case #</span>
                  <strong>{selectedRecovery.caseNo}</strong>
                </div>
                <div className="summary-item">
                  <span>Product</span>
                  <strong>{selectedRecovery.product}</strong>
                </div>
                <div className="summary-item">
                  <span>Branch</span>
                  <strong>Branch {selectedRecovery.branch}</strong>
                </div>
                <div className="summary-item">
                  <span>Total Amount</span>
                  <strong>PKR {selectedRecovery.amount.toLocaleString()}</strong>
                </div>
                <div className="summary-item">
                  <span>Paid</span>
                  <strong className="paid-amount">PKR {selectedRecovery.paid.toLocaleString()}</strong>
                </div>
                <div className="summary-item">
                  <span>Monthly Installment</span>
                  <strong className="monthly-highlight">PKR {selectedRecovery.monthly.toLocaleString()}</strong>
                </div>
                <div className="summary-item">
                  <span>Remaining</span>
                  <strong className={selectedRecovery.due > 0 ? 'due-amount' : 'paid-amount'}>
                    PKR {selectedRecovery.due.toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="installment-list">
                <h4>Monthly Installments</h4>
                <div className="installment-grid">
                  {selectedRecovery.installments.map((inst, index) => {
                    const status = getInstallmentStatus(inst);
                    const color = getStatusColor(status);
                    const isOverdueMonth = inst.month < currentMonth && inst.paid < inst.due;
                    return (
                      <div 
                        key={index} 
                        className={`installment-item ${isOverdueMonth ? 'overdue-item' : ''}`} 
                        style={{ borderLeftColor: isOverdueMonth ? '#dc2626' : color }}
                      >
                        <div className="installment-month">
                          {getMonthName(inst.month)}
                          {isOverdueMonth && <span className="overdue-month-badge">⚠️ Overdue</span>}
                        </div>
                        <div className="installment-details">
                          <span className="installment-due">Due: PKR {inst.due.toLocaleString()}</span>
                          <span className="installment-paid" style={{ color: color }}>
                            Paid: PKR {inst.paid.toLocaleString()}
                          </span>
                        </div>
                        <div className="installment-status">
                          <span className={`status-badge ${status}`}>
                            {getStatusLabel(status)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== PAY INSTALLMENT MODAL ===== */}
      {showPayModal && selectedRecovery && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content pay-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <Wallet size={20} className="modal-icon" />
                <h3>Pay Installment - {selectedRecovery.customer}</h3>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {selectedRecovery.isOverdue && (
                <div className="pay-overdue-warning">
                  <AlertTriangle size={16} />
                  <span>This account has overdue payments!</span>
                </div>
              )}

              <div className="pay-summary">
                <div className="pay-summary-item">
                  <span>Case #</span>
                  <strong>{selectedRecovery.caseNo}</strong>
                </div>
                <div className="pay-summary-item">
                  <span>Monthly Installment</span>
                  <strong>PKR {selectedRecovery.monthly.toLocaleString()}</strong>
                </div>
                <div className="pay-summary-item">
                  <span>Total Due</span>
                  <strong className="due-amount">PKR {selectedRecovery.due.toLocaleString()}</strong>
                </div>
              </div>

              <div className="form-group">
                <label>Select Month *</label>
                <select
                  className="form-input"
                  value={payMonth}
                  onChange={(e) => setPayMonth(e.target.value)}
                >
                  <option value="">Select Month...</option>
                  {selectedRecovery.installments.map((inst) => {
                    const status = getInstallmentStatus(inst);
                    if (status === 'unpaid' || status === 'partial') {
                      const isOverdueMonth = inst.month < currentMonth;
                      return (
                        <option key={inst.month} value={inst.month}>
                          {getMonthName(inst.month)} - Due: PKR {inst.due.toLocaleString()} 
                          {inst.paid > 0 ? ` (Paid: PKR ${inst.paid.toLocaleString()})` : ''}
                          {isOverdueMonth ? ' ⚠️ OVERDUE' : ''}
                        </option>
                      );
                    }
                    return null;
                  })}
                </select>
              </div>

              <div className="form-group">
                <label>Amount (PKR) *</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter amount"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  min="1"
                  max={selectedRecovery.due}
                />
                <small className="field-hint">Max: PKR {selectedRecovery.due.toLocaleString()}</small>
              </div>

              <div className="pay-note">
                <span>ⓘ</span>
                <p>This payment will be recorded and update the installment status</p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="btn-pay-save" onClick={handlePayInstallment}>
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT INSTALLMENT MODAL ===== */}
      {showEditModal && selectedRecovery && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <Edit size={20} className="modal-icon" />
                <h3>Edit Installment - {selectedRecovery.customer}</h3>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="edit-summary">
                <div className="edit-summary-item">
                  <span>Case #</span>
                  <strong>{selectedRecovery.caseNo}</strong>
                </div>
                <div className="edit-summary-item">
                  <span>Current Monthly</span>
                  <strong>PKR {selectedRecovery.monthly.toLocaleString()}</strong>
                </div>
                <div className="edit-summary-item">
                  <span>Total Due</span>
                  <strong className="due-amount">PKR {selectedRecovery.due.toLocaleString()}</strong>
                </div>
              </div>

              <div className="form-group">
                <label>Select Month to Edit *</label>
                <select
                  className="form-input"
                  value={editMonth}
                  onChange={(e) => {
                    setEditMonth(e.target.value);
                    const inst = selectedRecovery.installments.find(i => i.month === e.target.value);
                    if (inst) {
                      setEditNewAmount(inst.due.toString());
                    }
                  }}
                >
                  <option value="">Select Month...</option>
                  {selectedRecovery.installments.map((inst) => (
                    <option key={inst.month} value={inst.month}>
                      {getMonthName(inst.month)} - Current: PKR {inst.due.toLocaleString()}
                      {inst.paid > 0 ? ` (Paid: PKR ${inst.paid.toLocaleString()})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>New Installment Amount (PKR) *</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter new amount"
                  value={editNewAmount}
                  onChange={(e) => setEditNewAmount(e.target.value)}
                  min="1"
                />
                <small className="field-hint">This will update the selected month's installment amount</small>
              </div>

              <div className="edit-note">
                <span>ⓘ</span>
                <p>Changing installment amount will update the monthly installment shown in the table</p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="btn-edit-save" onClick={handleEditInstallment}>
                <Save size={16} />
                Update Installment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recovery;