import React, { useState, useEffect } from 'react';
import { Search, Users, DollarSign, Calendar, Clock, TrendingUp, TrendingDown, Filter, Download, Eye, Building, Award, Fuel, Briefcase, User, BarChart, LineChart, PieChart, X, Activity } from 'lucide-react';
import './EmployeeReport.css';

const EmployeeReport = () => {
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [userBranch, setUserBranch] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [modalChartType, setModalChartType] = useState('bar');

  // ===== GET USER DATA =====
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
      setUserBranch(user.branch);
    }
  }, []);

  // ===== EMPLOYEE REPORT DATA =====
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Ahmed Khan',
      branch: 1,
      role: 'employee',
      joiningDate: '2025-01-15',
      monthlyData: {
        '2026-01': { accountsOpened: 12, recoveryAmount: 45000, leaves: 2, commission: 24000, fuelExpense: 1500, extraEarnings: 5000 },
        '2026-02': { accountsOpened: 15, recoveryAmount: 52000, leaves: 1, commission: 30000, fuelExpense: 1800, extraEarnings: 7000 },
        '2026-03': { accountsOpened: 10, recoveryAmount: 38000, leaves: 3, commission: 20000, fuelExpense: 1200, extraEarnings: 3000 },
        '2026-04': { accountsOpened: 18, recoveryAmount: 65000, leaves: 0, commission: 36000, fuelExpense: 2000, extraEarnings: 8000 },
        '2026-05': { accountsOpened: 14, recoveryAmount: 48000, leaves: 2, commission: 28000, fuelExpense: 1600, extraEarnings: 4500 },
        '2026-06': { accountsOpened: 20, recoveryAmount: 72000, leaves: 1, commission: 40000, fuelExpense: 2200, extraEarnings: 10000 },
      },
      totalAccounts: 89,
      totalRecovery: 320000,
      totalCommission: 178000,
      totalLeaves: 9,
      totalFuel: 10300,
      totalExtra: 37500,
    },
    {
      id: 2,
      name: 'Sara Ali',
      branch: 2,
      role: 'manager',
      joiningDate: '2025-03-01',
      monthlyData: {
        '2026-01': { accountsOpened: 8, recoveryAmount: 32000, leaves: 1, commission: 16000, fuelExpense: 1000, extraEarnings: 2000 },
        '2026-02': { accountsOpened: 10, recoveryAmount: 40000, leaves: 2, commission: 20000, fuelExpense: 1300, extraEarnings: 3500 },
        '2026-03': { accountsOpened: 12, recoveryAmount: 45000, leaves: 0, commission: 24000, fuelExpense: 1500, extraEarnings: 4000 },
        '2026-04': { accountsOpened: 9, recoveryAmount: 35000, leaves: 3, commission: 18000, fuelExpense: 1100, extraEarnings: 2500 },
        '2026-05': { accountsOpened: 11, recoveryAmount: 42000, leaves: 1, commission: 22000, fuelExpense: 1400, extraEarnings: 3000 },
        '2026-06': { accountsOpened: 15, recoveryAmount: 55000, leaves: 0, commission: 30000, fuelExpense: 1800, extraEarnings: 5000 },
      },
      totalAccounts: 65,
      totalRecovery: 249000,
      totalCommission: 130000,
      totalLeaves: 7,
      totalFuel: 8100,
      totalExtra: 20000,
    },
    {
      id: 3,
      name: 'Usman Malik',
      branch: 1,
      role: 'employee',
      joiningDate: '2025-06-01',
      monthlyData: {
        '2026-01': { accountsOpened: 5, recoveryAmount: 18000, leaves: 4, commission: 10000, fuelExpense: 800, extraEarnings: 1000 },
        '2026-02': { accountsOpened: 7, recoveryAmount: 25000, leaves: 2, commission: 14000, fuelExpense: 1000, extraEarnings: 2000 },
        '2026-03': { accountsOpened: 8, recoveryAmount: 28000, leaves: 3, commission: 16000, fuelExpense: 1100, extraEarnings: 2500 },
        '2026-04': { accountsOpened: 10, recoveryAmount: 35000, leaves: 1, commission: 20000, fuelExpense: 1300, extraEarnings: 3000 },
        '2026-05': { accountsOpened: 6, recoveryAmount: 20000, leaves: 5, commission: 12000, fuelExpense: 900, extraEarnings: 1500 },
        '2026-06': { accountsOpened: 9, recoveryAmount: 30000, leaves: 2, commission: 18000, fuelExpense: 1200, extraEarnings: 2500 },
      },
      totalAccounts: 45,
      totalRecovery: 156000,
      totalCommission: 90000,
      totalLeaves: 17,
      totalFuel: 6300,
      totalExtra: 12500,
    },
    {
      id: 4,
      name: 'Fatima Noor',
      branch: 2,
      role: 'employee',
      joiningDate: '2025-08-01',
      monthlyData: {
        '2026-01': { accountsOpened: 6, recoveryAmount: 22000, leaves: 2, commission: 12000, fuelExpense: 900, extraEarnings: 1500 },
        '2026-02': { accountsOpened: 8, recoveryAmount: 28000, leaves: 1, commission: 16000, fuelExpense: 1100, extraEarnings: 2000 },
        '2026-03': { accountsOpened: 11, recoveryAmount: 42000, leaves: 0, commission: 22000, fuelExpense: 1500, extraEarnings: 3500 },
        '2026-04': { accountsOpened: 7, recoveryAmount: 25000, leaves: 3, commission: 14000, fuelExpense: 1000, extraEarnings: 2000 },
        '2026-05': { accountsOpened: 9, recoveryAmount: 32000, leaves: 2, commission: 18000, fuelExpense: 1200, extraEarnings: 2500 },
        '2026-06': { accountsOpened: 12, recoveryAmount: 48000, leaves: 0, commission: 24000, fuelExpense: 1600, extraEarnings: 4000 },
      },
      totalAccounts: 53,
      totalRecovery: 197000,
      totalCommission: 106000,
      totalLeaves: 8,
      totalFuel: 7300,
      totalExtra: 15500,
    },
  ]);

  // ===== GET UNIQUE MONTHS =====
  const getUniqueMonths = () => {
    const months = new Set();
    employees.forEach(emp => {
      Object.keys(emp.monthlyData).forEach(month => {
        months.add(month);
      });
    });
    return Array.from(months).sort();
  };

  const uniqueMonths = getUniqueMonths();

  // ===== GET MONTH NAME =====
  const getMonthName = (monthStr) => {
    if (monthStr === 'all') return 'All Months';
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // ===== FILTER EMPLOYEES =====
  const filteredEmployees = employees.filter(emp => {
    const searchMatch = emp.name.toLowerCase().includes(search.toLowerCase());
    const branchMatch = branchFilter === 'all' || emp.branch === parseInt(branchFilter);
    let userBranchMatch = true;
    if (userBranch) {
      userBranchMatch = emp.branch === parseInt(userBranch);
    }
    return searchMatch && branchMatch && userBranchMatch;
  });

  // ===== EMPLOYEE SELF-COMPARISON CHART DATA =====
  const getEmployeeChartData = (emp) => {
    const months = Object.keys(emp.monthlyData).sort();
    const data = {
      labels: months.map(m => getMonthName(m)),
      accounts: months.map(m => emp.monthlyData[m].accountsOpened),
      recovery: months.map(m => emp.monthlyData[m].recoveryAmount),
      commission: months.map(m => emp.monthlyData[m].commission),
    };
    return data;
  };

  // ===== RENDER EMPLOYEE SELF-COMPARISON CHART IN MODAL =====
  const renderEmployeeChart = () => {
    if (!selectedEmployee) return null;
    
    const empData = getEmployeeChartData(selectedEmployee);
    const maxVal = Math.max(...empData.accounts, ...empData.recovery.map(v => v/1000), 1);

    if (modalChartType === 'bar') {
      return (
        <div className="modal-chart-container">
          <div className="chart-bar-container">
            {empData.labels.map((label, index) => (
              <div key={index} className="chart-bar-group">
                <div className="chart-bars">
                  <div className="chart-bar-wrapper">
                    <div 
                      className="chart-bar bar-gold" 
                      style={{ height: `${(empData.accounts[index] / maxVal) * 120}px` }}
                    >
                      <span className="bar-value">{empData.accounts[index]}</span>
                    </div>
                    <span className="bar-label">Acc</span>
                  </div>
                  <div className="chart-bar-wrapper">
                    <div 
                      className="chart-bar bar-dark" 
                      style={{ height: `${(empData.recovery[index] / 1000 / maxVal) * 120}px` }}
                    >
                      <span className="bar-value">{(empData.recovery[index]/1000).toFixed(1)}k</span>
                    </div>
                    <span className="bar-label">Rec</span>
                  </div>
                  <div className="chart-bar-wrapper">
                    <div 
                      className="chart-bar bar-gold-light" 
                      style={{ height: `${(empData.commission[index] / 1000 / maxVal) * 120}px` }}
                    >
                      <span className="bar-value">{(empData.commission[index]/1000).toFixed(1)}k</span>
                    </div>
                    <span className="bar-label">Com</span>
                  </div>
                </div>
                <div className="chart-bar-labels">
                  <span className="chart-label">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (modalChartType === 'line') {
      return (
        <div className="modal-chart-container">
          <div className="chart-line-container">
            <svg viewBox="0 0 500 180" className="chart-svg">
              {[0, 45, 90, 135, 180].map((y) => (
                <line key={y} x1="0" y1={180 - y} x2="500" y2={180 - y} stroke="#e5e7eb" strokeWidth="1" />
              ))}
              <polyline
                points={empData.accounts.map((val, i) => 
                  `${(i / (empData.accounts.length - 1)) * 500},${180 - (val / maxVal) * 150}`
                ).join(' ')}
                fill="none"
                stroke="#C9A84C"
                strokeWidth="3"
              />
              <polyline
                points={empData.recovery.map((val, i) => 
                  `${(i / (empData.recovery.length - 1)) * 500},${180 - ((val/1000) / maxVal) * 150}`
                ).join(' ')}
                fill="none"
                stroke="#1A2A4A"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              <polyline
                points={empData.commission.map((val, i) => 
                  `${(i / (empData.commission.length - 1)) * 500},${180 - ((val/1000) / maxVal) * 150}`
                ).join(' ')}
                fill="none"
                stroke="#E8D5A3"
                strokeWidth="3"
              />
              {empData.labels.map((label, i) => (
                <text key={i} x={(i / (empData.labels.length - 1)) * 500} y="175" fontSize="9" fill="#6b7280" textAnchor="middle">{label}</text>
              ))}
            </svg>
            <div className="chart-legend">
              <span><span className="legend-dot gold"></span> Accounts</span>
              <span><span className="legend-dot dark"></span> Recovery (PKR'000)</span>
              <span><span className="legend-dot light"></span> Commission (PKR'000)</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // ===== OPEN DETAIL MODAL =====
  const openDetailModal = (emp) => {
    setSelectedEmployee(emp);
    setModalChartType('bar');
    setShowDetailModal(true);
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedEmployee(null);
  };

  // ===== EXPORT REPORT =====
  const exportReport = () => {
    alert('Report exported successfully!');
  };

  const branchLabel = userBranch ? `Branch ${userBranch}` : 'All Branches';
  const modalChartTypes = [
    { id: 'bar', label: 'Bar', icon: BarChart },
    { id: 'line', label: 'Line', icon: LineChart },
  ];

  return (
    <div className="employee-report-container">
      <div className="report-header">
        <div className="header-left">
          <h2>Employee Report</h2>
          {userBranch && (
            <div className="branch-label">
              <Building size={14} />
              <span>{branchLabel}</span>
            </div>
          )}
        </div>
        <button className="btn-export" onClick={exportReport}>
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="report-controls">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {!userBranch && (
          <div className="branch-filters">
            <button className={`filter-btn ${branchFilter === 'all' ? 'active' : ''}`} onClick={() => setBranchFilter('all')}>All</button>
            <button className={`filter-btn branch-1 ${branchFilter === '1' ? 'active' : ''}`} onClick={() => setBranchFilter('1')}>Branch 1</button>
            <button className={`filter-btn branch-2 ${branchFilter === '2' ? 'active' : ''}`} onClick={() => setBranchFilter('2')}>Branch 2</button>
          </div>
        )}
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-icon"><Users size={20} /></div>
          <div className="summary-info">
            <span className="summary-label">Total Employees</span>
            <span className="summary-value">{filteredEmployees.length}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon"><DollarSign size={20} /></div>
          <div className="summary-info">
            <span className="summary-label">Total Recovery</span>
            <span className="summary-value">PKR {filteredEmployees.reduce((sum, e) => sum + e.totalRecovery, 0).toLocaleString()}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon"><Award size={20} /></div>
          <div className="summary-info">
            <span className="summary-label">Total Commission</span>
            <span className="summary-value">PKR {filteredEmployees.reduce((sum, e) => sum + e.totalCommission, 0).toLocaleString()}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon"><Briefcase size={20} /></div>
          <div className="summary-info">
            <span className="summary-label">Total Accounts</span>
            <span className="summary-value">{filteredEmployees.reduce((sum, e) => sum + e.totalAccounts, 0)}</span>
          </div>
        </div>
      </div>

      {/* ===== EMPLOYEE TABLE ===== */}
      <div className="employee-table-wrap">
        <table className="employee-report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Branch</th>
              <th>Role</th>
              <th>Accounts</th>
              <th>Recovery (PKR)</th>
              <th>Commission (PKR)</th>
              <th>Leaves</th>
              <th>Fuel (PKR)</th>
              <th>Extra (PKR)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr><td colSpan="11" className="no-data">No employees found</td></tr>
            ) : (
              filteredEmployees.map((emp, index) => (
                <tr key={emp.id}>
                  <td className="text-gray">{index + 1}</td>
                  <td className="emp-name">{emp.name}</td>
                  <td><span className="branch-badge">Branch {emp.branch}</span></td>
                  <td><span className="role-badge">{emp.role}</span></td>
                  <td className="highlight-number">{emp.totalAccounts}</td>
                  <td>PKR {emp.totalRecovery.toLocaleString()}</td>
                  <td>PKR {emp.totalCommission.toLocaleString()}</td>
                  <td>{emp.totalLeaves}</td>
                  <td>PKR {emp.totalFuel.toLocaleString()}</td>
                  <td>PKR {emp.totalExtra.toLocaleString()}</td>
                  <td>
                    <button className="btn-view-detail" onClick={() => openDetailModal(emp)}>
                      <Eye size={15} />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== DETAIL MODAL WITH SELF-COMPARISON CHART ===== */}
      {showDetailModal && selectedEmployee && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <User size={20} className="modal-icon" />
                <h3>Employee Report - {selectedEmployee.name}</h3>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {/* Employee Summary */}
              <div className="detail-summary">
                <div className="detail-summary-item">
                  <span>Branch</span>
                  <strong>Branch {selectedEmployee.branch}</strong>
                </div>
                <div className="detail-summary-item">
                  <span>Role</span>
                  <strong>{selectedEmployee.role}</strong>
                </div>
                <div className="detail-summary-item">
                  <span>Joining Date</span>
                  <strong>{selectedEmployee.joiningDate}</strong>
                </div>
                <div className="detail-summary-item">
                  <span>Total Accounts</span>
                  <strong>{selectedEmployee.totalAccounts}</strong>
                </div>
                <div className="detail-summary-item">
                  <span>Total Recovery</span>
                  <strong>PKR {selectedEmployee.totalRecovery.toLocaleString()}</strong>
                </div>
                <div className="detail-summary-item">
                  <span>Total Commission</span>
                  <strong>PKR {selectedEmployee.totalCommission.toLocaleString()}</strong>
                </div>
                <div className="detail-summary-item">
                  <span>Total Leaves</span>
                  <strong>{selectedEmployee.totalLeaves}</strong>
                </div>
                <div className="detail-summary-item">
                  <span>Fuel Expense</span>
                  <strong>PKR {selectedEmployee.totalFuel.toLocaleString()}</strong>
                </div>
                <div className="detail-summary-item">
                  <span>Extra Earnings</span>
                  <strong>PKR {selectedEmployee.totalExtra.toLocaleString()}</strong>
                </div>
              </div>

              {/* Employee Self-Comparison Chart */}
              <div className="modal-chart-section">
                <div className="modal-chart-header">
                  <h4>Performance Trend (Self-Comparison)</h4>
                  <div className="modal-chart-type-selector">
                    {modalChartTypes.map((type) => (
                      <button
                        key={type.id}
                        className={`modal-chart-type-btn ${modalChartType === type.id ? 'active' : ''}`}
                        onClick={() => setModalChartType(type.id)}
                      >
                        <type.icon size={14} />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
                {renderEmployeeChart()}
              </div>

              {/* Monthly Breakdown */}
              <div className="monthly-breakdown">
                <h4>Monthly Breakdown</h4>
                <table className="monthly-table">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Accounts</th>
                      <th>Recovery (PKR)</th>
                      <th>Commission (PKR)</th>
                      <th>Leaves</th>
                      <th>Fuel (PKR)</th>
                      <th>Extra (PKR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(selectedEmployee.monthlyData).map(([month, data]) => (
                      <tr key={month}>
                        <td>{getMonthName(month)}</td>
                        <td>{data.accountsOpened}</td>
                        <td>PKR {data.recoveryAmount.toLocaleString()}</td>
                        <td>PKR {data.commission.toLocaleString()}</td>
                        <td>{data.leaves}</td>
                        <td>PKR {data.fuelExpense.toLocaleString()}</td>
                        <td>PKR {data.extraEarnings.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default EmployeeReport;