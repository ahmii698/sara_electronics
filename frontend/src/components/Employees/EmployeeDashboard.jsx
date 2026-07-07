import React, { useState, useEffect } from 'react';
import { DollarSign, Award, Calendar, Clock, TrendingUp, User, Eye, FileText, Wallet, Briefcase, LogOut, Home, Package, Receipt, BarChart3 } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';
import './EmployeeDashboard.css';
import logo from '../../assets/logo.jpeg';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'employee') {
      setEmployeeData(user);
    } else {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  // ===== DUMMY EMPLOYEE DATA =====
  const employeeDetails = {
    1: {
      name: 'Employee B1',
      branch: 1,
      salary: 45000,
      commission: 24000,
      totalAccounts: 45,
      leaves: 4,
      joiningDate: '2025-06-01',
      monthlyData: {
        'Jan': { accounts: 12, recovery: 45000, commission: 24000, leaves: 2 },
        'Feb': { accounts: 15, recovery: 52000, commission: 30000, leaves: 1 },
        'Mar': { accounts: 10, recovery: 38000, commission: 20000, leaves: 3 },
        'Apr': { accounts: 8, recovery: 32000, commission: 16000, leaves: 1 },
        'May': { accounts: 11, recovery: 42000, commission: 22000, leaves: 2 },
        'Jun': { accounts: 14, recovery: 50000, commission: 28000, leaves: 0 },
      }
    },
    2: {
      name: 'Employee B2',
      branch: 2,
      salary: 41000,
      commission: 22000,
      totalAccounts: 38,
      leaves: 5,
      joiningDate: '2025-08-01',
      monthlyData: {
        'Jan': { accounts: 8, recovery: 32000, commission: 16000, leaves: 2 },
        'Feb': { accounts: 10, recovery: 40000, commission: 20000, leaves: 1 },
        'Mar': { accounts: 12, recovery: 45000, commission: 24000, leaves: 0 },
        'Apr': { accounts: 8, recovery: 30000, commission: 15000, leaves: 2 },
        'May': { accounts: 9, recovery: 35000, commission: 18000, leaves: 1 },
        'Jun': { accounts: 11, recovery: 42000, commission: 22000, leaves: 0 },
      }
    }
  };

  const empId = employeeData?.employeeId || 1;
  const empDetails = employeeDetails[empId] || employeeDetails[1];

  // ===== NAV ITEMS =====
  const navItems = [
    { path: '/employee-dashboard', icon: Home, label: 'Dashboard' },
    { path: '/employee-recovery', icon: Wallet, label: 'Recovery' },
  ];

  return (
    <div className="employee-app-layout">
      {/* ===== SIDEBAR ===== */}
      <div className="employee-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="SARA Electronics" className="logo-image" />
          <h1 className="brand-title">SARA <span>Electronics</span></h1>
          <p className="brand-subtitle">EMPLOYEE PANEL</p>
          <p className="brand-branch">Branch {empDetails.branch}</p>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="employee-main-content">
        {/* ===== HEADER ===== */}
        <header className="employee-header">
          <div className="header-left">
            <h2>Employee Dashboard</h2>
            <p className="welcome-text">Welcome back, {empDetails.name}!</p>
          </div>
          <div className="header-right">
            <span className="header-branch">Branch {empDetails.branch}</span>
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <div className="employee-page-content">
          {/* ===== STATS CARDS ===== */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon salary-icon"><DollarSign size={20} /></div>
              <div className="stat-info">
                <span className="stat-label">Monthly Salary</span>
                <span className="stat-value">PKR {empDetails.salary.toLocaleString()}</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon commission-icon"><Award size={20} /></div>
              <div className="stat-info">
                <span className="stat-label">Commission</span>
                <span className="stat-value">PKR {empDetails.commission.toLocaleString()}</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon accounts-icon"><Briefcase size={20} /></div>
              <div className="stat-info">
                <span className="stat-label">Total Accounts</span>
                <span className="stat-value">{empDetails.totalAccounts}</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon leaves-icon"><Calendar size={20} /></div>
              <div className="stat-info">
                <span className="stat-label">Leaves Taken</span>
                <span className="stat-value">{empDetails.leaves}</span>
              </div>
            </div>
          </div>

          {/* ===== TAB NAVIGATION ===== */}
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Eye size={16} /> Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
              onClick={() => setActiveTab('report')}
            >
              <FileText size={16} /> Full Report
            </button>
          </div>

          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <div className="overview-grid">
                <div className="overview-card">
                  <h4>Monthly Performance</h4>
                  <div className="monthly-chart">
                    {Object.entries(empDetails.monthlyData).map(([month, data]) => (
                      <div key={month} className="month-bar">
                        <div className="bar-label">{month}</div>
                        <div className="bar-wrapper">
                          <div 
                            className="bar-fill accounts-bar" 
                            style={{ height: `${(data.accounts / 20) * 100}%` }}
                          />
                          <div 
                            className="bar-fill recovery-bar" 
                            style={{ height: `${(data.recovery / 60000) * 100}%` }}
                          />
                        </div>
                        <div className="bar-values">
                          <span>{data.accounts} acc</span>
                          <span>PKR {(data.recovery/1000).toFixed(1)}k</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="overview-card">
                  <h4>Quick Stats</h4>
                  <div className="quick-stats">
                    <div className="quick-stat">
                      <span>Joining Date</span>
                      <strong>{empDetails.joiningDate}</strong>
                    </div>
                    <div className="quick-stat">
                      <span>Current Branch</span>
                      <strong>Branch {empDetails.branch}</strong>
                    </div>
                    <div className="quick-stat">
                      <span>Total Recovery</span>
                      <strong>PKR {(empDetails.totalAccounts * 25000).toLocaleString()}</strong>
                    </div>
                    <div className="quick-stat">
                      <span>Average Accounts/Month</span>
                      <strong>{Math.round(empDetails.totalAccounts / 6)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== FULL REPORT TAB ===== */}
          {activeTab === 'report' && (
            <div className="tab-content">
              <div className="report-card">
                <h4>Complete Employee Report</h4>
                <div className="report-grid">
                  <div className="report-item">
                    <span>Employee Name</span>
                    <strong>{empDetails.name}</strong>
                  </div>
                  <div className="report-item">
                    <span>Branch</span>
                    <strong>Branch {empDetails.branch}</strong>
                  </div>
                  <div className="report-item">
                    <span>Joining Date</span>
                    <strong>{empDetails.joiningDate}</strong>
                  </div>
                  <div className="report-item">
                    <span>Total Accounts</span>
                    <strong>{empDetails.totalAccounts}</strong>
                  </div>
                  <div className="report-item">
                    <span>Total Recovery</span>
                    <strong>PKR {(empDetails.totalAccounts * 25000).toLocaleString()}</strong>
                  </div>
                  <div className="report-item">
                    <span>Total Commission</span>
                    <strong>PKR {empDetails.commission.toLocaleString()}</strong>
                  </div>
                  <div className="report-item">
                    <span>Leaves Taken</span>
                    <strong>{empDetails.leaves}</strong>
                  </div>
                  <div className="report-item">
                    <span>Current Salary</span>
                    <strong>PKR {empDetails.salary.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="monthly-breakdown">
                  <h5>Monthly Breakdown</h5>
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Accounts</th>
                        <th>Recovery (PKR)</th>
                        <th>Commission (PKR)</th>
                        <th>Leaves</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(empDetails.monthlyData).map(([month, data]) => (
                        <tr key={month}>
                          <td>{month}</td>
                          <td>{data.accounts}</td>
                          <td>PKR {data.recovery.toLocaleString()}</td>
                          <td>PKR {data.commission.toLocaleString()}</td>
                          <td>{data.leaves}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;